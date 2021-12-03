import { Message, Modal } from '@arco-design/web-react';
import { FanControlMode } from 'common/constants';
import ContentPage from 'components/common/content-page';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import t from 'resources/i18n';
import { FanCLINotFoundIcon, FanImage } from 'resources/icons';
import { installTongfangDaemon } from 'services/toolkit-services';
import { RootStoreContext } from 'stores';
import { fileExists } from 'utils/file-exists';
import BlockTitle from 'components/common/block-title';
import {
  FanAnimationContainer,
  FanCLINotFoundInfoContainer,
  FanControlModeItemContainer,
  FanModeContainer,
  FanModeSelectorContainer,
} from './style';
import FanControlCurve from './fan-control-curve';
import FanControlManual from './fan-control-manual';


export interface FanControlModeItemProps {
  active: boolean;
  title: string;
  description: string;
  background: string;
  onClick: () => void;
}

function FanControlModeItem({
  active,
  title,
  background,
  description,
  onClick,
}: FanControlModeItemProps) {
  return (
    <FanControlModeItemContainer background={background} onClick={onClick}>
      <h1 className="mode-title">
        {title} {active && `(${t('FAN_CONTROL_CURRENT_MODE')})`}
      </h1>
      <div className="mode-description">{description}</div>
    </FanControlModeItemContainer>
  );
}

function FanControlPage() {
  const [hasFanCLI, setHasFanCLI] = useState(true);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const { fan } = useContext(RootStoreContext);

  const refreshFanCLIInstallStatus = async () => {
    const isFanCLIInstalled = (await fileExists(
      '/usr/local/bin/fancli'
    )) as boolean;
    setHasFanCLI(isFanCLIInstalled);
  };

  const installFanCLI = async () => {
    Message.info(t('FAN_CONTROL_FANCLI_INSTALLING'));
    setShowInstallPrompt(false);
    installTongfangDaemon().then(() => refreshFanCLIInstallStatus());
  };

  useEffect(() => {
    refreshFanCLIInstallStatus();
  }, []);

  useEffect(() => {
    if (!hasFanCLI) setShowInstallPrompt(true);
  }, [hasFanCLI]);

  return (
    <ContentPage title={t('FAN_CONTROL_TITLE')}>
      {!hasFanCLI && (
        <FanCLINotFoundInfoContainer>
          <FanCLINotFoundIcon />
          <h3 className="title">{t('FAN_CONTROL_FANCLI_NOT_INSTALLED')}</h3>
        </FanCLINotFoundInfoContainer>
      )}

      {!hasFanCLI && (
        <Modal
          title={t('FAN_CONTROL_FANCLI_NOT_INSTALLED')}
          visible={showInstallPrompt}
          onOk={() => installFanCLI()}
          onCancel={() => setShowInstallPrompt(false)}
        >
          <div>{t('FAN_CONTROL_FANCLI_NOT_INSTALLED_PROMPT')}</div>
        </Modal>
      )}

      {hasFanCLI && (
        <>
          <FanModeContainer>
            <BlockTitle title={t('FAN_CONTROL_MODE_SET')} />
            <FanModeSelectorContainer>
              <FanControlModeItem
                title={t('FAN_CONTROL_MODE_NORMAL')}
                description={t('FAN_CONTROL_MODE_NORMAL_DESCRIPTION')}
                background="#37D4CF"
                active={fan.fanControlMode === FanControlMode.NORMAL}
                onClick={() => fan.setFanControlMode(FanControlMode.NORMAL)}
              />

              <FanControlModeItem
                title={t('FAN_CONTROL_MODE_INTELLIGENT')}
                description={t('FAN_CONTROL_MODE_INTELLIGENT_DESCRIPTION')}
                background="#57A9FB"
                active={fan.fanControlMode === FanControlMode.INTELLIGENT}
                onClick={() => fan.setFanControlMode(FanControlMode.INTELLIGENT)}
              />

              <FanControlModeItem
                title={t('FAN_CONTROL_MODE_MANUAL')}
                description={t('FAN_CONTROL_MODE_MANUAL_DESCRIPTION')}
                background="#A871E3"
                active={fan.fanControlMode === FanControlMode.MANUAL}
                onClick={() => fan.setFanControlMode(FanControlMode.MANUAL)}
              />

              <FanControlModeItem
                title={t('FAN_CONTROL_MODE_BOOST')}
                description={t('FAN_CONTROL_MODE_BOOST_DESCRIPTION')}
                background="#F76560"
                active={fan.fanControlMode === FanControlMode.BOOST}
                onClick={() => fan.setFanControlMode(FanControlMode.BOOST)}
              />
            </FanModeSelectorContainer>

            {fan.fanControlMode === FanControlMode.INTELLIGENT && (
              <FanControlCurve />
            )}

            {fan.fanControlMode === FanControlMode.MANUAL && (
              <FanControlManual />
            )}

            {(fan.fanControlMode === FanControlMode.NORMAL || fan.fanControlMode === FanControlMode.BOOST) && (
              <FanAnimationContainer className={`mode-${fan.fanControlMode}`}>
                <FanImage />
              </FanAnimationContainer>
            )}
          </FanModeContainer>
        </>
      )}
    </ContentPage>
  );
}

export default observer(FanControlPage);
