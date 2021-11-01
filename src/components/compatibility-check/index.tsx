import { Popover, Spin } from '@arco-design/web-react';
import ContentPage from 'components/common/content-page';
import { useEffect, useState } from 'react';
import t from 'resources/i18n';
import {
  DiskDivision,
  FailedIcon,
  LaptopIcon,
  PassingIcon,
  SSDIcon,
  SystemBoot,
  UnknownIcon,
  WarningIcon,
  WirelessIcon,
} from 'resources/icons';
import { CheckResult } from 'common/constants';

import {
  CheckGridContainer,
  CheckItemContainer,
  CheckItemIconContainer,
  CheckItemTitle,
  CheckResultContainer,
  ResultStatement,
} from './style';
import {
  checkDeviceBareboneModel,
  checkEfiSystemPartitionSize,
  checkSolidStateDriveCompatibility,
  checkUEFIBootStatus,
  checkWirelessNicCompatibility,
} from 'services/check-compatibility';

export interface CheckItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  result: CheckResult;
}

function CheckItem({ icon, title, description, result }: CheckItemProps) {
  const renderResult = () => {
    switch (result) {
      case CheckResult.FAILED:
        return (
          <CheckResultContainer>
            <FailedIcon />
            <span>{t('COMPAT_CHECK_RESULT_FAILED')}</span>
          </CheckResultContainer>
        );
      case CheckResult.UNKNOWN:
        return (
          <CheckResultContainer>
            <UnknownIcon />
            <span>{t('COMPAT_CHECK_RESULT_UNKNOWN')}</span>
          </CheckResultContainer>
        );
      case CheckResult.WARNING:
        return (
          <CheckResultContainer>
            <WarningIcon />
            <span>{t('COMPAT_CHECK_RESULT_WARNING')}</span>
          </CheckResultContainer>
        );
      case CheckResult.CHECKING:
        return (
          <CheckResultContainer>
            <Spin />
            <span>{t('COMPAT_CHECK_RESULT_CHECKING')}</span>
          </CheckResultContainer>
        );
      case CheckResult.PASSING:
      default:
        return (
          <CheckResultContainer>
            <PassingIcon />
            <span>{t('COMPAT_CHECK_RESULT_PASSING')}</span>
          </CheckResultContainer>
        );
    }
  };

  return (
    <CheckItemContainer>
      <Popover content={description}>
        <CheckItemIconContainer>{icon}</CheckItemIconContainer>
        <CheckItemTitle>{title}</CheckItemTitle>
        {renderResult()}
      </Popover>
    </CheckItemContainer>
  );
}

function CompatibilityCheckPage() {
  const initialState = {
    state: CheckResult.CHECKING,
    description: '',
  };

  const [SSDResult, setSSDResult] = useState(initialState);
  const [ESPResult, setESPResult] = useState(initialState);
  const [bootResult, setBootResult] = useState(initialState);
  const [bareboneResult, setBareboneResult] = useState(initialState);
  const [wirelessResult, setWirelessResult] = useState(initialState);

  useEffect(() => {
    (async () => {
      checkSolidStateDriveCompatibility().then(setSSDResult);
      checkEfiSystemPartitionSize().then(setESPResult);
      checkUEFIBootStatus().then(setBootResult);
      checkDeviceBareboneModel().then(setBareboneResult);
      checkWirelessNicCompatibility().then(setWirelessResult);
    })();
  }, []);

  return (
    <ContentPage
      title={t('COMPAT_CHECK_TITLE')}
      description={t('COMPAT_CHECK_DESCRIPTION')}
    >
      <CheckGridContainer>
        <CheckItem
          icon={<SSDIcon />}
          title={t('COMPAT_CHECK_SSD_MODEL')}
          description={SSDResult.description}
          result={SSDResult.state}
        />

        <CheckItem
          icon={<DiskDivision />}
          title={t('COMPAT_CHECK_ESP')}
          description={ESPResult.description}
          result={ESPResult.state}
        />

        <CheckItem
          icon={<SystemBoot />}
          title={t('COMPAT_CHECK_BOOT_METHOD')}
          description={bootResult.description}
          result={bootResult.state}
        />

        <CheckItem
          icon={<LaptopIcon />}
          title={t('COMPAT_CHECK_BAREBONE_MODEL')}
          description={bareboneResult.description}
          result={bareboneResult.state}
        />

        <CheckItem
          icon={<WirelessIcon />}
          title={t('COMPAT_CHECK_WIRELESS_CARD')}
          description={wirelessResult.description}
          result={wirelessResult.state}
        />
      </CheckGridContainer>

      <ResultStatement>
        {t('COMPAT_CHECK_RESULT_STATEMENT')}
      </ResultStatement>
    </ContentPage>
  );
}

export default CompatibilityCheckPage;
