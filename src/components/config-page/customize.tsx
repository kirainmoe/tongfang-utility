import ActionButtons from "components/common/action-buttons";
import BlockTitle from "components/common/block-title";
import CustomizeOption from "components/common/customize-option";
import { MainContentContainer } from "components/common/style";
import { observer } from "mobx-react-lite";
import t from "resources/i18n";
import { CustomizeGroup } from "./style";

import { useContext } from "react";
import { RootStoreContext } from "stores";
import { InternalMonitorType, OSVersion, WirelessAdapterType } from "stores/config-store";

import mojaveIcon from 'resources/images/Mojave.jpg';
import catalinaIcon from 'resources/images/Catalina.jpg';
import bigsurIcon from 'resources/images/BigSur.jpg';
import montereyIcon from 'resources/images/Monterey.jpg';
import {
  AppleBlackIcon,
  AppleIcon,
  BroadcomIcon,
  CPUIcon,
  DisableSSDIcon,
  FHDHighRefreshIcon,
  FHDIcon,
  GPUIcon,
  IntelIcon,
  IntelWhiteIcon,
  ScissorIcon,
  SoundIcon,
  SSDIcon,
  UHDIcon,
  USBBlackIcon,
  USBIcon,
} from 'resources/icons';
import { AirdropIcon, AirdropWhiteIcon } from "resources/icons/airdrop";
import getOSName from "utils/get-os-name";


function Customize() {
  const { config } = useContext(RootStoreContext);
  return (
    <MainContentContainer>
      <BlockTitle title={t('CUSTOMIZE_SELECT_OS_VERSION')} />
      <CustomizeGroup>
        <CustomizeOption
          label={getOSName(OSVersion.Mojave)}
          icon={<img src={mojaveIcon} alt="Mojave" />}
          active={config.osVersion === OSVersion.Mojave}
          onChange={() => config.setOSVersion(OSVersion.Mojave)}
        />
        <CustomizeOption
          label={getOSName(OSVersion.Catalina)}
          icon={<img src={catalinaIcon} alt="Catalina" />}
          active={config.osVersion === OSVersion.Catalina}
          onChange={() => config.setOSVersion(OSVersion.Catalina)}
        />
        <CustomizeOption
          label={getOSName(OSVersion.BigSur)}
          icon={<img src={bigsurIcon} alt="Big Sur" />}
          active={config.osVersion === OSVersion.BigSur}
          onChange={() => config.setOSVersion(OSVersion.BigSur)}
        />
        <CustomizeOption
          label={getOSName(OSVersion.Monterey)}
          icon={<img src={montereyIcon} alt="Monterey" />}
          active={config.osVersion === OSVersion.Monterey}
          onChange={() => config.setOSVersion(OSVersion.Monterey)}
        />
      </CustomizeGroup>

      <BlockTitle title={t('CUSTOMIZE_SELECT_WIRELESS_ADAPTER_TYPE')} />
      <CustomizeGroup>
        <CustomizeOption
          label={t('CUSTOMIZE_WIRELESS_APPLE')}
          icon={config.wirelessAdapterType === WirelessAdapterType.Apple ? <AppleIcon /> : <AppleBlackIcon />}
          active={config.wirelessAdapterType === WirelessAdapterType.Apple}
          onChange={() => config.setWirelessAdapterType(WirelessAdapterType.Apple)}
        />
        <CustomizeOption
          label={t('CUSTOMIZE_WIRELESS_BROADCOM')}
          icon={<BroadcomIcon />}
          active={config.wirelessAdapterType === WirelessAdapterType.Broadcom}
          onChange={() => config.setWirelessAdapterType(WirelessAdapterType.Broadcom)}
        />
        <CustomizeOption
          label={t('CUSTOMIZE_WIRELESS_INTEL')}
          icon={config.wirelessAdapterType === WirelessAdapterType.Intel ? <IntelWhiteIcon /> : <IntelIcon />}
          active={config.wirelessAdapterType === WirelessAdapterType.Intel}
          onChange={() => config.setWirelessAdapterType(WirelessAdapterType.Intel)}
        />
        <CustomizeOption
          label={t('CUSTOMIZE_ANDROID_TETHERING')}
          icon={config.usbTetheringSupport ? <USBIcon /> : <USBBlackIcon />}
          active={config.usbTetheringSupport}
          onChange={() => config.toggleUSBTetheringSupport()}
        />
      </CustomizeGroup>

      <BlockTitle title={t('CUSTOMIZE_SELECT_INTERNAL_MONITOR_TYPE')} />
      <CustomizeGroup>
        <CustomizeOption
          label="1920 × 1080 (60Hz)"
          icon={<FHDIcon />}
          active={config.internalMonitorType === InternalMonitorType.FHD}
          onChange={() => config.setInternalMonitorType(InternalMonitorType.FHD)}
        />
        <CustomizeOption
          label="1920 × 1080 (144Hz)"
          icon={<FHDHighRefreshIcon />}
          active={config.internalMonitorType === InternalMonitorType.FHDHighRefresh}
          onChange={() => config.setInternalMonitorType(InternalMonitorType.FHDHighRefresh)}
        />
        {config.product === 'Z2 Air-G' && (
          <CustomizeOption
            label={`1920 × 1080 (144Hz, ${t('CUSTOMIZE_SCHEME_2')})`}
            icon={<UHDIcon />}
            active={config.internalMonitorType === InternalMonitorType.FHDHighRefreshSolution2}
            onChange={() => config.setInternalMonitorType(InternalMonitorType.FHDHighRefreshSolution2)}
          />          
        )}
        <CustomizeOption
          label="3840 × 2160 (UHD)"
          icon={<UHDIcon />}
          active={config.internalMonitorType === InternalMonitorType.UHD}
          onChange={() => config.setInternalMonitorType(InternalMonitorType.UHD)}
        />
      </CustomizeGroup>

      <BlockTitle title={t('CUSTOMIZE_SPECIAL_HARDWARES')} />
      <CustomizeGroup>
        <CustomizeOption
          label={t('CUSTOMIZE_DISABLE_NVME')}
          icon={<DisableSSDIcon />}
          active={config.disableIncompatibleNVMe > 0}
          onChange={() => config.setDisableIncompatibleNVMe(config.disableIncompatibleNVMe ? 0 : 1)}
        />
        <CustomizeOption
          label={t('CUSTOMIZE_ENABLE_NVMEFIX')}
          icon={<SSDIcon />}
          active={config.enableNVMeFix}
          onChange={() => config.toggleNVMeFix()}
        />
        <CustomizeOption
          label={t('CUSTOMIZE_LOAD_APPLEGUC')}
          icon={<GPUIcon />}
          active={config.enableAppleGuC}
          onChange={() => config.toggleAppleGuC()}
        />
        <CustomizeOption
          label={t('CUSTOMIZE_CPU_BEST_PERFORMANCE')}
          icon={<CPUIcon />}
          active={config.cpuPerformanceMode}
          onChange={() => config.toggleCPUPerformaceMode()}
        />
      </CustomizeGroup>

      <BlockTitle title={t('CUSTOMIZE_SPECIAL_SETTINGS')} />
      <CustomizeGroup>
        <CustomizeOption
          label={t('CUSTOMIZE_ENABLE_BOOTCHIME')}
          icon={<SoundIcon />}
          active={config.enableBootChime}
          onChange={() => config.toggleEnableBootChime()}
        />
        <CustomizeOption
          label={t('CUSTOMIZE_SIMPLIFY_CONFIG')}
          icon={<ScissorIcon />}
          active={config.simplifyConfig}
          onChange={() => config.toggleSimplifyConfig()}
        />
        {config.wirelessAdapterType === WirelessAdapterType.Intel && (
          <CustomizeOption
            label={t('CUSTOMIZE_DONT_USE_AIRPORTITLWM')}
            icon={config.useAirportItlwm ? <AirdropIcon /> : <AirdropWhiteIcon />}
            active={!config.useAirportItlwm}
            onChange={() => config.toggleUseAirportItlwm()}
          />
        )}
      </CustomizeGroup>
      <ActionButtons />
    </MainContentContainer>
  );
}

export default observer(Customize);
