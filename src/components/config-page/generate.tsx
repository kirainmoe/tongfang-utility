import BlockTitle from "components/common/block-title";
import CustomizeOption from "components/common/customize-option";
import ListItem from "components/common/list-item";
import ActionButtons from "components/common/action-buttons";
import { MainContentContainer } from "components/common/style";
import { observer } from "mobx-react";
import { useContext, useState } from "react";
import t from "resources/i18n";
import { RootStoreContext } from "stores";
import { InternalMonitorType, WirelessAdapterType } from "stores/config-store";
import { getDownloadSourceIcon } from "utils/get-download-source-icon";
import getOSName from "utils/get-os-name";
import { CustomizeGroup, ListContainer } from "./style";
import Processing from "./processing";
import { Link } from "react-router-dom";

function Generate() {
  const [generating, setGenerating] = useState(false);
  const { app, config } = useContext(RootStoreContext);
  const model = config.getModel();

  const getNetworkMethod = () => {
    let base = (() => {
      switch (config.wirelessAdapterType) {
        case WirelessAdapterType.Apple:
          return t('CUSTOMIZE_WIRELESS_APPLE');
        case WirelessAdapterType.Broadcom:
          return t('CUSTOMIZE_WIRELESS_BROADCOM');
        case WirelessAdapterType.Intel:
          return t('CUSTOMIZE_WIRELESS_INTEL');
      }
    })();
    
    let addition = config.usbTetheringSupport ? `${t('GENERATE_USE_TETHERING')}` : '';
    return `${base}${addition}`;
  };

  const getInternalMonitorType = () => {
    switch (config.internalMonitorType) {
      case InternalMonitorType.FHD:
        return `1920 × 1080 (60Hz)`;
      case InternalMonitorType.FHDHighRefresh:
      case InternalMonitorType.FHDHighRefreshSolution2:
        return `1920 × 1080 (144Hz)`;
      case InternalMonitorType.UHD:
        return `3840 × 2160 (UHD)`;
    }
  };

  // 显示下载源选择器
  const renderDownloadSourceSelector = () => {
    if (config.isLocal) {
      return null;
    }
    const sources = config.downloadSource;
    const results = [];
    for (const sourceName in sources) {
      if (!sources.hasOwnProperty(sourceName)) {
        continue;
      }
      results.push(
        <CustomizeOption
          key={sourceName}
          label={t('PERSONALIZE_DOWNLOAD_FROM').replace(':downloadSourceName', t(sourceName.toUpperCase()))}
          icon={getDownloadSourceIcon(sourceName)}
          active={config.downloadSourceUrl === (sources as any)[sourceName]}
          onChange={() => config.setDownloadSourceUrl((sources as any)[sourceName])}
        ></CustomizeOption>
      );
    }
    return results;
  };

  const onNextStep = () => {
    setGenerating(true);
  };

  let cannotNextReason: React.ReactNode = null;

  const canNext = (() => {
    if (
      config.wirelessAdapterType === WirelessAdapterType.Intel &&
      (app.defaultDriverVersion.wifi === 'null' ||
        app.defaultDriverVersion.bluetooth === 'null')
    ) {
      cannotNextReason = (
        <ListItem 
          value={
            <>
              {t('GENERATE_INTEL_DRIVER_NOT_SPECIFIED')}
              <Link to="/drivers">{t('GENERATE_INTEL_DRIVER_GO_MANAGE')}</Link>
            </>
          }
          type="critical"
          style={{ marginLeft: 30 }}
        />
      )
      return false;
    }
    return true;
  })();

  if (generating) {
    return (
      <Processing />
    );
  }

  return (
    <MainContentContainer>
      <BlockTitle title={t('GENERATE_ENSURE_OPTIONS')} />
      <ListContainer>
        {model && (
          <ListItem
            title={t('GENERATE_CHOSEN_MODEL')}
            value={`${t(model.vendor)} ${t(model.product)}`}
          />
        )}
        <ListItem
          title={t('GENERATE_MACOS_VERSION')}
          value={getOSName(config.osVersion)}
        />
        <ListItem
          title={t('GENERATE_NETWORK_METHOD')}
          value={getNetworkMethod()}
        />
        {config.wirelessAdapterType === WirelessAdapterType.Intel && !config.useAirportItlwm && (
          <ListItem
            value={t('GENERATE_NOT_USE_AIRPORTITLWM')}
            type="warning"
          />
        )}
        <ListItem
          title={t('GENERATE_MONITOR_TYPE')}
          value={getInternalMonitorType()}
        />

        {(config.bootArgs.length > 0) && (
          <ListItem
            title={t('GENERATE_CUSTOM_BOOT_ARGS')}
            value={config.bootArgs}
          />
        )}

        {(config.disableIncompatibleNVMe || config.enableNVMeFix) && (
          <ListItem
            value={[
              config.disableIncompatibleNVMe > 0 &&
                t('GENERATE_NVME_DISABLED').replace(
                  ':slot',
                  config.disableIncompatibleNVMe.toString()
                ),
              config.enableNVMeFix && t('GENERATE_NVMEFIDX_ENABLED'),
            ]
              .filter((item) => item !== false)
              .join('; ')}
          />
        )}

        {(config.enableAppleGuC || config.cpuPerformanceMode) && (
          <ListItem
            value={[
              config.enableAppleGuC && t('GENERATE_LOAD_APPLE_GUC'),
              config.cpuPerformanceMode && t('GENERATE_CPU_BEST_PERFORMANCE'),
            ]
              .filter((item) => item !== false)
              .join('; ')}
          />
        )}

        {config.simplifyConfig && (
          <ListItem value={t('GENERATE_SIMPLIFY_CONFIG')} />
        )}
      </ListContainer>

      {!config.isLocal && config.downloadSourceUrl && (
        <>
          <BlockTitle title={t('PERSONALIZE_DOWNLOAD_SOURCE')} />
          <CustomizeGroup>{renderDownloadSourceSelector()}</CustomizeGroup>
        </>
      )}

      {cannotNextReason && (
        <>
          <div style={{ marginTop: 20 }} />
          <BlockTitle title={t('GENERATE_CANNOT_NEXT')} />
          <p style={{ color: '#888', fontSize: 12, margin: '8px 0' }}>
            {t('GENERATE_CANNOT_NEXT_DESCRIPTION')}
          </p>
          {cannotNextReason}
        </>
      )}

      <ActionButtons
        canNext={canNext}
        onNext={onNextStep}
      />
    </MainContentContainer>
  );
}

export default observer(Generate);
