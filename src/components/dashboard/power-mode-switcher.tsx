import { Message, Modal } from '@arco-design/web-react';
import BlockTitle from 'components/common/block-title';
import { useEffect, useState } from 'react';
import t from 'resources/i18n';
import {
  BalanceIcon,
  PowerSaveIcon,
  TurboIcon,
} from 'resources/icons/power-mode';
import {
  checkVoltageShift,
  installVoltageShift,
  setVoltageShiftParams,
} from 'services/voltage-shift';
import { getKextsList } from 'utils/get-kext-list';
import {
  PowerModeItemContainer,
  PowerModeItemIcon,
  PowerModeItemText,
  PowerSwitcherContainer,
  PowerSwitcherGrids,
} from './style';

export interface PowerModeItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function PowerModeItem({
  title,
  description,
  icon,
  onClick,
}: PowerModeItemProps) {
  return (
    <PowerModeItemContainer onClick={onClick}>
      <PowerModeItemIcon>{icon}</PowerModeItemIcon>
      <PowerModeItemText>
        <div className="text-title">{title}</div>
        <div className="text-description">{description}</div>
      </PowerModeItemText>
    </PowerModeItemContainer>
  );
}

function PowerModeSwitcher() {
  const [hasVoltageShiftKext, setHasVoltageShiftKext] = useState(false);

  useEffect(() => {
    (async () => {
      const list = await getKextsList();
      const hasVoltageShift =
        list.filter((item) => item.name.includes('com.sicreative.VoltageShift'))
          .length > 0;
      setHasVoltageShiftKext(hasVoltageShift);
    })();
  }, []);

  const requestInstallVoltageShift = async () => {
    Modal.confirm({
      title: t('DASHBOARD_PERFORMANCE_INSTALL_ADDITIONAL'),
      content: t('DASHBOARD_PERFORMANCE_NEED_VOLTAGESHIFT'),
      onOk: async () => {
        installVoltageShift()
          .then(() =>
            Message.success(
              t('DASHBOARD_PERFORMANCE_VOLTAGESHIFT_INSTALL_SUCCESS')
            )
          )
          .catch((err) =>
            Message.error(
              t('DASHBOARD_PERFORMANCE_VOLTAGESHIFT_INSTALL_FAILED')
            )
          );
      },
    });
  };

  const switchToPowerSaveMode = async () => {
    if (!hasVoltageShiftKext) {
      Message.error(t('DASHBOARD_PERFORMACE_NO_KEXT'));
      return;
    }

    if (!(await checkVoltageShift())) {
      requestInstallVoltageShift();
      return;
    }

    setVoltageShiftParams(-35, -15, -15, 15, 15, 0)
      .then(
        () => Message.success(t('DASHBOARD_PERFORMACE_MODE_SWITCHED_SUCCESSFULLY'))
      )
      .catch(err => Message.error(t('DASHBOARD_PERFORMACE_MODE_SWITCHED_FAILED')));
  };

  const switchToBalancedMode = async () => {
    if (!hasVoltageShiftKext) {
      Message.error(t('DASHBOARD_PERFORMACE_NO_KEXT'));
      return;
    }

    if (!(await checkVoltageShift())) {
      requestInstallVoltageShift();
      return;
    }

    setVoltageShiftParams(-20, -10, -10, 45, 56, 1)
      .then(
        () => Message.success(t('DASHBOARD_PERFORMACE_MODE_SWITCHED_SUCCESSFULLY'))
      )
      .catch(err => Message.error(t('DASHBOARD_PERFORMACE_MODE_SWITCHED_FAILED')));
  };

  const switchToPerformanceMode = async () => {
    if (!hasVoltageShiftKext) {
      Message.error(t('DASHBOARD_PERFORMACE_NO_KEXT'));
      return;
    }

    if (!(await checkVoltageShift())) {
      requestInstallVoltageShift();
      return;
    }

    setVoltageShiftParams(-10, -5, -5, 50, 60, 1)
      .then(
        () => Message.success(t('DASHBOARD_PERFORMACE_MODE_SWITCHED_SUCCESSFULLY'))
      )
      .catch(err => Message.error(t('DASHBOARD_PERFORMACE_MODE_SWITCHED_FAILED')));
  };

  return (
    <PowerSwitcherContainer>
      <BlockTitle title={t('DASHBOARD_POWER_MODE')} />
      <PowerSwitcherGrids>
        <PowerModeItem
          icon={<PowerSaveIcon />}
          title={t('DASHBOARD_POWER_SAVE')}
          description={t('DASHBOARD_POWER_SAVE_DESCRIPTION')}
          onClick={switchToPowerSaveMode}
        />
        <PowerModeItem
          icon={<BalanceIcon />}
          title={t('DASHBOARD_BALANCED_MODE')}
          description={t('DASHBOARD_BALANCED_MODE_DESCRIPTION')}
          onClick={switchToBalancedMode}
        />
        <PowerModeItem
          icon={<TurboIcon />}
          title={t('DASHBOARD_PERFORMANCE_MODE')}
          description={t('DASHBOARD_PERFORMANCE_MODE_DESCRIPTION')}
          onClick={switchToPerformanceMode}
        />
      </PowerSwitcherGrids>
    </PowerSwitcherContainer>
  );
}

export default PowerModeSwitcher;
