import BlockTitle from 'components/common/block-title';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import t from 'resources/i18n';

import MacBookProImage from 'resources/images/MacBookPro.png';
import { RootStoreContext } from 'stores';
import {
  DeviceContainer,
  DeviceInfoContainer,
  DeviceInfoItemContainer,
  FlexStartContainer,
  HardwareSpecContainer,
  HardwareSpecItemContainer,
  MacBookImageContainer,
  SpecialContainer,
} from './style';

export interface DeviceInfoItemProps {
  label: string;
  value: string | null;
}

function DeviceInfoItem({ label, value }: DeviceInfoItemProps) {
  return (
    <DeviceInfoItemContainer>
      <span className="property-name">{label}</span>
      <span className="value">{value}</span>
    </DeviceInfoItemContainer>
  );
}

function HardwareSpecItem({ label, value }: DeviceInfoItemProps) {
  return (
    <HardwareSpecItemContainer>
      <span className="property-name">{label}</span>
      <span className="value">{value}</span>
    </HardwareSpecItemContainer>
  );
}

function DeviceInfo() {
  const { dashboard } = useContext(RootStoreContext);
  return (
    <DeviceInfoContainer>
      <BlockTitle title={t('DASHBOARD_DEVICE_INFO')} />
      <SpecialContainer>
        <FlexStartContainer>
          <MacBookImageContainer
            src={MacBookProImage}
            alt="MacBook Pro Image"
          />
          <DeviceContainer>
            <DeviceInfoItem
              label={t('DASHBOARD_DEVICE_NAME')}
              value={dashboard.deviceName}
            />
            <DeviceInfoItem
              label={t('DASHBOARD_SMBIOS_MODEL')}
              value={dashboard.smbiosModel}
            />
            <DeviceInfoItem
              label={t('DASHBOARD_REAL_DEVICE_MODEL')}
              value={dashboard.realModel}
            />
            <DeviceInfoItem
              label={t('DASHBOARD_MACOS_VERSION')}
              value={dashboard.osVersion}
            />
          </DeviceContainer>

          <HardwareSpecContainer>
            <HardwareSpecItem
              label={t('DASHBOARD_PROCESSOR_MODEL')}
              value={dashboard.processorModel}
            />
            <HardwareSpecItem
              label={t('DASHBOARD_GRAPHICS_MODEL')}
              value={dashboard.graphicsModel}
            />
            <HardwareSpecItem
              label={t('DASHBOARD_MAIN_DISK')}
              value={dashboard.mainDiskModel}
            />
          </HardwareSpecContainer>
        </FlexStartContainer>
      </SpecialContainer>
    </DeviceInfoContainer>
  );
}

export default observer(DeviceInfo);
