import { makeAutoObservable } from 'mobx';
import t from 'resources/i18n';
import { getMacOSVersion } from 'services/get-os-version';
import { getSMBIOSInfo } from 'services/get-smbios-info';
import { execute } from 'utils/execute';
import readNVRAM from 'utils/read-nvram';
import RootStore from './root-store';

export default class DashboardStore {
  root: RootStore;

  constructor(rootStore: RootStore) {
    this.root = rootStore;
    makeAutoObservable(this);
  }

  /** 设备名称 */
  deviceNameVar: string | null = null;
  get deviceName(): string | null {
    if (!this.deviceNameVar) {
      execute('scutil', ['--get', 'ComputerName']).then(
        (name) => (this.deviceName = name as string)
      );
    }
    return this.deviceNameVar;
  }
  set deviceName(name: string | null) {
    this.deviceNameVar = name;
  }

  /** SMBIOS 型号 */
  smbiosModelVar: string | null = null;
  get smbiosModel() {
    if (!this.smbiosModelVar) {
      getSMBIOSInfo().then((res) => {
        this.smbiosModel = res!.system_model;
      });
    }
    return this.smbiosModelVar;
  }
  set smbiosModel(model: string | null) {
    this.smbiosModelVar = model;
  }

  /** 真实设备型号 */
  realVendor: string | null | undefined = undefined;
  realProduct: string | null | undefined = undefined;
  get realModel() {
    if (this.realVendor === undefined || this.realProduct === undefined) {
      readNVRAM('laptop-vendor').then((vendor) => this.setVendor(vendor));
      readNVRAM('laptop-product').then((product) => this.setProduct(product));
    } else if (this.realVendor === null || this.realProduct === null) {
      return t('UNKNOWN');
    }
    return `${t(this.realVendor as string)} ${t(this.realProduct as string)}`;
  }
  setVendor(vendor: string | null) {
    this.realVendor = vendor;
  }
  setProduct(product: string | null) {
    this.realProduct = product;
  }

  /** 系统版本 */
  osVersionVar: string | null = null;
  get osVersion() {
    getMacOSVersion().then(
      (res) => (this.osVersion = `${res.version} (${res.build})`)
    );
    return this.osVersionVar;
  }
  set osVersion(version: string | null) {
    this.osVersionVar = version;
  }

  /** 处理器型号 */
  processorModelVar: string | null = null;
  get processorModel() {
    if (!this.processorModelVar) {
      execute('sh', ['-c', 'sysctl -n machdep.cpu.brand_string']).then(
        (stdout) => (this.processorModel = stdout as string)
      );
    }
    return this.processorModelVar;
  }
  set processorModel(model: string | null) {
    this.processorModelVar = model;
  }

  /** 核显型号 */
  graphicsModelVar: string | null = null;
  get graphicsModel() {
    if (!this.graphicsModelVar) {
      execute('sh', [
        '-c',
        'ioreg -l | grep "model.*Intel.*Graphics" | cut -d \'"\' -f 4',
      ]).then((stdout) => (this.graphicsModel = stdout as string));
    }
    return this.graphicsModelVar;
  }
  set graphicsModel(model: string | null) {
    this.graphicsModelVar = model;
  }

  /** 主硬盘型号 */
  mainDiskModelVar: string | null = null;
  get mainDiskModel() {
    if (!this.mainDiskModelVar) {
      execute('sh', [
        '-c',
        `diskutil info $(df -H / 2> /dev/null | tail -1 | awk '{print $1}' | grep "disk[0-9]*" -o) | grep "Device / Media Name:" | awk '{ print $5 }'`,
      ]).then((stdout) => (this.mainDiskModel = stdout as string));
    }
    return this.mainDiskModelVar;
  }
  set mainDiskModel(model: string | null) {
    this.mainDiskModelVar = model;
  }
}
