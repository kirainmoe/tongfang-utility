import { makeAutoObservable } from 'mobx';
import yaml from 'js-yaml';
import md5 from 'md5';

import { EFIBuildYaml } from 'types/efi-build-yaml';
import { EFIReleasePayload } from 'types/efi-release';

import RootStore from './root-store';
import { getMacOSVersion } from 'services/get-os-version';
import { checkSolidStateDriveCompatibility, checkWirelessNicCompatibility } from 'services/check-compatibility';
import { getKextsList } from 'utils/get-kext-list';
import readNVRAM from 'utils/read-nvram';
import { CheckResult } from 'common/constants';

export enum OSVersion {
  Mojave = 'mojave',
  Catalina = 'catalina',
  BigSur = 'bigsur',
  Monterey = 'monterey',
  Ventura = 'ventura',
}

export enum WirelessAdapterType {
  Apple = 'apple',
  Broadcom = 'broadcom',
  Intel = 'intel',
}

export enum InternalMonitorType {
  FHD = '1080p',
  FHDHighRefresh = '1080p144',
  FHDHighRefreshSolution2 = '1080p144sol2',
  UHD = '4k',
}

export default class ConfigStore {
  rootStore: RootStore;

  /** 当前步骤 */
  step: number = 1;

  /** 是否从本地生成 */
  isLocal: boolean = false;

  /** 选择的 EFI Release */
  selectedEFI: EFIReleasePayload | null = null;

  rawYaml: string | null = null;

  yamlInfo: EFIBuildYaml | null = null;

  yamlMD5: string | null = null;

  downloadSourceUrl: string | null = null;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this);
  }

  setStep(step: number) {
    this.step = step;
  }

  prevStep() {
    this.step = this.step <= 1 ? 1 : this.step - 1;
  }

  nextStep() {
    this.step = this.step < 6 ? this.step + 1 : this.step;
  }

  setSelected(selectedEFI: EFIReleasePayload) {
    this.selectedEFI = selectedEFI;
    if (this.selectedEFI.build_yaml_hash === null) {
      this.isLocal = true;
      this.downloadSourceUrl = '';
    } else {
      this.isLocal = false;
      this.downloadSourceUrl = selectedEFI.download_sources[0].url;
    }
  }

  setYAML(rawYaml: string) {
    this.rawYaml = rawYaml;
    this.yamlInfo = yaml.load(rawYaml) as EFIBuildYaml;
    this.yamlMD5 = md5(rawYaml);
  }

  get buildYAMLhash() {
    return this.yamlMD5;
  }

  setFromLocal() {
    this.isLocal = true;
  }

  get downloadSource() {
    if (!this.selectedEFI) {
      return [];
    }
    const sources: { [key: string]: string } = {};
    this.selectedEFI.download_sources.forEach((source) => {
      sources[source.source_name] = source.url;
    });
    return sources;
  }

  setDownloadSourceUrl(url: string) {
    this.downloadSourceUrl = url;
  }

  /** 选择机型 / 模具 */
  modelIndex: number | null = null;
  vendor: string | null = null;
  product: string | null = null;
  barebone: string | null = null;
  generation: number = 8;
  usbmap: string | null = null;

  setModelIndex(index: number) {
    this.modelIndex = index;
    this.vendor = this.yamlInfo?.['support-models'][index].vendor!;
    this.product = this.yamlInfo?.['support-models'][index].product!;
    this.barebone = [
      this.yamlInfo?.['support-models'][index].barebones!,
    ].flat()[0];
    this.generation = this.yamlInfo?.['support-models'][index].generation!;
    this.usbmap = this.yamlInfo?.['support-models'][index].usbmap || null;
  }

  getModel() {
    if (this.modelIndex === null) return null;
    return this.yamlInfo?.['support-models'][this.modelIndex];
  }

  // customize options
  /** macOS 版本 */
  osVersion: OSVersion = OSVersion.BigSur;
  setOSVersion(version: OSVersion) {
    this.osVersion = version;
  }
  async getOSVersion() {
    try {
      if (this.rootStore.app.platform !== 'macos') {
        return;
      }

      const { version } = await getMacOSVersion();
      const [bigVersion, minorVersion] = version.split('.');
      switch (bigVersion) {
        case '13':
          this.osVersion = OSVersion.Ventura;
          break;
        case '12':
          this.osVersion = OSVersion.Monterey;
          break;
        case '11':
          this.osVersion = OSVersion.BigSur;
          break;
        case '10':
          this.osVersion =
            minorVersion === '14' ? OSVersion.Mojave : OSVersion.Catalina;
          break;
      }
    } catch (err) {
      console.error('Failed to get macOS version: ', err);
    }
  }

  /** 无线网卡类型 */
  wirelessAdapterType: WirelessAdapterType = WirelessAdapterType.Apple;
  setWirelessAdapterType(type: WirelessAdapterType) {
    this.wirelessAdapterType = type;
  }
  async getWirelessAdapterType() {
    try {
      if (this.rootStore.app.platform === 'windows') {
        const adapter = await checkWirelessNicCompatibility();
        if (adapter.payload)
          this.wirelessAdapterType = adapter.payload;
      } else if (this.rootStore.app.platform === 'macos') {
        const kextlist = await getKextsList();
        if (kextlist.filter(kext => kext.name.includes('BrcmBluetoothFixup')).length > 0) {
          this.wirelessAdapterType = WirelessAdapterType.Broadcom;
        } else if (kextlist.filter(kext => kext.name.includes('IntelBluetooth')).length > 0) {
          this.wirelessAdapterType = WirelessAdapterType.Intel;
        }
      }
    } catch(err) {
      console.error('Failed to suppose wireless adapter type: ', err);
    }
  }

  /** 启用 Android 共享网络 */
  usbTetheringSupport: boolean = false;
  toggleUSBTetheringSupport() {
    this.usbTetheringSupport = !this.usbTetheringSupport;
  }

  /** 内置屏幕分辨率/刷新率类型 */
  internalMonitorType: InternalMonitorType = InternalMonitorType.FHD;
  setInternalMonitorType(type: InternalMonitorType) {
    this.internalMonitorType = type;
  }

  /** 是否屏蔽不兼容 NVMe 硬盘： 0 不屏蔽, 1, 2 代表盘位 */
  disableIncompatibleNVMe: number = 0;
  setDisableIncompatibleNVMe(value: number) {
    this.disableIncompatibleNVMe = value;
  }
  async shouldDisableIncompatibleNVMe() {
    try {
      if (this.rootStore.app.platform === 'macos') {
        const isDisabled = await readNVRAM('nvme-disabled');
        if (isDisabled !== null) {
          this.disableIncompatibleNVMe = 1;         // currently we only support disable first NVMe
        }
      } else if (this.rootStore.app.platform === 'windows') {
        const checkResult = await checkSolidStateDriveCompatibility();
        if (checkResult.state === CheckResult.FAILED) {
          this.disableIncompatibleNVMe = 1;
        }
      }
    } catch(err) {
      console.error('Failed to suppose disableIncomtableNVMe: ', err);
    }
  }

  /** SSD 电源管理 (NVMeFix) */
  enableNVMeFix: boolean = false;
  toggleNVMeFix() {
    this.enableNVMeFix = !this.enableNVMeFix;
  }
  async shouldEnableNVMeFix() {
    try {
      if (this.rootStore.app.platform === 'macos') {
        const kextlist = await getKextsList();
        if (kextlist.filter(kext => kext.name.includes('NVMeFix')).length)
          this.enableNVMeFix = true;
      }
    } catch(err) {
      console.error('Failed to suppose enableNVMeFix: ', err);
    }
  }

  /** 启用 Apple GuC 固件 */
  enableAppleGuC: boolean = true;
  toggleAppleGuC() {
    this.enableAppleGuC = !this.enableAppleGuC;
  }

  /** CPU 性能模式 */
  cpuPerformanceMode: boolean = false;
  toggleCPUPerformaceMode() {
    this.cpuPerformanceMode = !this.cpuPerformanceMode;
  }

  /** 启用开机声音 */
  enableBootChime: boolean = false;
  toggleEnableBootChime() {
    this.enableBootChime = !this.enableBootChime;
  }

  /** 是否使用 AirportItlwm */
  useAirportItlwm: boolean = true;
  toggleUseAirportItlwm() {
    this.useAirportItlwm = !this.useAirportItlwm;
  }
  async shouldUseAirportItlwm() {
    try {
      if (this.rootStore.app.platform === 'macos') {
        const kextlist = await getKextsList();
        if (kextlist.filter(kext => kext.name.includes('AirportItlwm')).length)
          this.useAirportItlwm = true;
        else
          this.useAirportItlwm = false;
      }
    } catch(err) {
      console.error('Failed to suppose useAirportItlwm: ', err);
    }
  }

  /** 最小化 config */
  simplifyConfig: boolean = false;
  toggleSimplifyConfig() {
    this.simplifyConfig = !this.simplifyConfig;
  }

  /** SMBIOS 信息 */
  SMBIOSInfo = {
    sn: '',
    mlb: '',
    model: '',
    smuuid: '',
  };
  setSMBIOSInfo(smbios: any) {
    this.SMBIOSInfo = smbios;
  }

  /** 引导背景 */
  useCustomBackground: boolean = false;
  customBackgroundPath: string = '';
  setCustomBackground(shouldUse: boolean, path: string = '') {
    this.useCustomBackground = shouldUse;
    if (shouldUse) this.customBackgroundPath = path;
  }

  /** 引导参数 */
  bootArgs: string = '';
  setBootArgs(args: string) {
    this.bootArgs = args;
  }

  async determineBestChoice() {
    await this.getOSVersion();
    await this.getWirelessAdapterType();
    await this.shouldDisableIncompatibleNVMe();
    await this.shouldEnableNVMeFix();
    await this.shouldUseAirportItlwm();
  }

  freezeConfig() {
    const config = {
      modelIndex: this.modelIndex,
      vendor: this.vendor,
      product: this.product,
      osVersion: this.osVersion,
      wirelessAdapterType: this.wirelessAdapterType,
      usbTetheringSupport: this.usbTetheringSupport,
      internalMonitorType: this.internalMonitorType,
      disableIncompatibleNVMe: this.disableIncompatibleNVMe,
      enableNVMeFix: this.enableNVMeFix,
      enableAppleGuC: this.enableAppleGuC,
      cpuPerformanceMode: this.cpuPerformanceMode,
      enableBootChime: this.enableBootChime,
      useAirportItlwm: this.useAirportItlwm,
      simplifyConfig: this.simplifyConfig,
      bootArgs: this.bootArgs,
    };

    return config;
  }

  saveConfigIntoLocalStorage() {
    localStorage.setItem('tfu-config-options', JSON.stringify(this.freezeConfig()));
  }

  restoreConfigFromLocalStorage(): boolean {
    const rawString = localStorage.getItem('tfu-config-options');
    if (!rawString)
      return false;
    try {
      const json: any = JSON.parse(rawString)
      for (const key in json)
        if (json.hasOwnProperty(key))
          (this as any)[key] = json[key];
      if (this.modelIndex)
        this.setModelIndex(this.modelIndex);
    } catch(err) {
      console.error('Cannot recover configData: ', err);
    }
    return true;
  }
}
