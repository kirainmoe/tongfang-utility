import cn from 'classnames';
import ContentPage from 'components/common/content-page';
import t from 'resources/i18n';
import {
  ClearNVRAMIcon,
  FailedIcon,
  FnKeyIcon,
  HiDPIIcon,
  PassingIcon,
  SeedProgramIcon,
  SleepIcon,
} from 'resources/icons';
import { ToolkitContainer, ToolkitItemContainer } from './style';
import HeliPortIcon from 'resources/images/heliport.png';
import { useEffect, useState } from 'react';
import { FnDaemonInstallStatus } from 'common/constants';
import { Message, Modal, Spin, Notification } from '@arco-design/web-react';
import {
  checkHiDpiEnabled,
  checkTongfangDaemonIsInstalled,
  clearNvram,
  disableHiDpi,
  enableHiDpiBoe,
  enableHiDpiUniversal,
  enrollDeveloperProgram,
  fixSleep,
  installTongfangDaemon,
} from 'services/toolkit-services';
import { openPage } from 'utils/open-directory';

export interface ToolkitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  disabled?: boolean;
  status?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

export function ToolkitItem({
  icon,
  disabled,
  title,
  description,
  onClick,
  children,
  status,
}: ToolkitItemProps) {
  return (
    <ToolkitItemContainer
      className={cn((disabled || status === 'performing') && 'disabled')}
      onClick={(disabled || status === 'performing') ? () => {} : onClick}
    >
      <div className="icon">{icon}</div>
      <h3 className="title">{title}</h3>
      <div className="description">
        {status === 'performing' ? (
          <>
            <Spin />
            <div className="performing">{t('TOOLKIT_PERFORMING')}</div>
          </>
        ) : status === 'success' ? (
          <>
            <PassingIcon />
            <div className="performing">{t('SUCCESS')}</div>
          </>
        ) : status === 'failed' ? (
          <>
            <FailedIcon />
            <div className="performing">{t('FAILED')}</div>
          </>
        ) : (
          description
        )}
      </div>

      {children}
    </ToolkitItemContainer>
  );
}

function makeConfirm(content: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      content,
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
}

export function ToolkitPage() {
  const [fnDaemonStatus, setFnDaemonStatus] = useState(
    FnDaemonInstallStatus.NO_KEXT_DETECTED
  );

  const [fixSleepStatus, setFixSleepStatus] = useState('none');
  const [hidpiStatus, setHidpiStatus] = useState('none');
  const [isHidpiEnabled, setIsHidpiEnabled] = useState(false);
  const [clearNvramStatus, setClearNvramStatus] = useState('none');
  const [fnDaemonInstallStatus, setFnDaemonInstallStatus] = useState('none');
  const [enrollStatus, setEnrollStatus] = useState('none');

  useEffect(() => {
    (async () => {
      if (hidpiStatus === 'performing') return;
      const isBackupExists = await checkHiDpiEnabled();
      if (isBackupExists) {
        setIsHidpiEnabled(true);
      }
    })();
  }, [hidpiStatus]);

  useEffect(() => {
    if (fnDaemonInstallStatus === 'performing') return;
    checkTongfangDaemonIsInstalled().then(setFnDaemonStatus);
  }, [fnDaemonInstallStatus]);

  const handleFixSleepClick = async () => {
    setFixSleepStatus('performing');
    setTimeout(() => {
      fixSleep()
        .then(() => {
          setFixSleepStatus('success');
          setTimeout(() => setFixSleepStatus('none'), 4000);
        })
        .catch((err) => {
          Message.error(t(err));
          setFixSleepStatus('failed');
        });
    }, 0);
  };

  const handleToggleHiDPI = async () => {
    setHidpiStatus('performing');

    const setSuccess = () => {
      setHidpiStatus('success');
      setTimeout(() => setHidpiStatus('none'), 4000);
    };

    const setError = (err: any) => {
      Message.error(t(err));
      setHidpiStatus('failed');
    };

    setTimeout(async () => {
      if (isHidpiEnabled) {
        const shouldDisable = await makeConfirm(t('TOOLKIT_HIDPI_SURE_DISBLE'));
        if (shouldDisable) {
          disableHiDpi().then(setSuccess).catch(setError);
        } else {
          setHidpiStatus('none');
        }
      } else {
        const shouldUseBoe = await makeConfirm(t('TOOLKIT_HIDPI_USE_BOE'));
        if (shouldUseBoe) {
          enableHiDpiBoe().then(setSuccess).catch(setError);
        } else {
          Notification.info({
            title: t('TOOLKIT_HIDPI_OPERATION_REQUIRED'),
            content: t('TOOLKIT_HIDPI_OPERATION_DESCRIPTION'),
          });
          enableHiDpiUniversal().then(setSuccess).catch(setError);
        }
      }
    }, 0);
  };

  const handleClearNVRAM = async () => {
    setClearNvramStatus('performing');
    setTimeout(() => {
      clearNvram()
        .then(() => {
          setClearNvramStatus('success');
          setTimeout(() => setClearNvramStatus('none'), 4000);
        })
        .catch((err) => {
          Message.error(t(err));
          setClearNvramStatus('failed');
        });
    }, 0);
  };

  const handleInstallFnDaemon = async () => {
    setFnDaemonInstallStatus('performing');
    setTimeout(() => {
      installTongfangDaemon()
        .then(() => {
          setFnDaemonInstallStatus('success');
          setTimeout(() => setFnDaemonInstallStatus('none'), 4000);
        })
        .catch((err) => {
          Message.error(t(err));
          setFnDaemonInstallStatus('failed');
        });
    }, 0);
  };

  const handleDownloadHeliPort = async() => {
    openPage(`https://github.com/OpenIntelWireless/HeliPort/releases/`);
  };

  const handleEnrollDeveloperProgram = async() => {
    setEnrollStatus('performing');
    setTimeout(() => {
      enrollDeveloperProgram()
        .then(() => {
          setEnrollStatus('success');
          setTimeout(() => setEnrollStatus('none'), 4000);
        }).
        catch(err => {
          Message.error(t(err));
          setEnrollStatus('failed');
        });
    }, 0);
  };

  return (
    <ContentPage
      title={t('TOOLKIT_TITLE')}
      description={t('TOOLKIT_PRIVILEGE_REQUIRED')}
    >
      <ToolkitContainer>
        <ToolkitItem
          icon={<SleepIcon />}
          title={t('TOOLKIT_FIX_SLEEP')}
          description={t('TOOLKIT_FIX_SLEEP_DESCRIPTION')}
          status={fixSleepStatus}
          onClick={handleFixSleepClick}
        />

        <ToolkitItem
          icon={<HiDPIIcon />}
          title={t('TOOLKIT_TOGGLE_HIDPI')}
          description={t('TOOLKIT_TOGGLE_HIDPI_DESCRIPTION')}
          status={hidpiStatus}
          onClick={handleToggleHiDPI}
        />

        <ToolkitItem
          icon={<ClearNVRAMIcon />}
          title={t('TOOLKIT_CLEAR_NVRAM')}
          description={t('TOOLKIT_CLEAR_NVRAM_DESCRIPTION')}
          status={clearNvramStatus}
          onClick={handleClearNVRAM}
        />

        <ToolkitItem
          disabled={
            fnDaemonStatus === FnDaemonInstallStatus.NO_KEXT_DETECTED
          }
          icon={<FnKeyIcon />}
          title={t('TOOLKIT_INSTALL_FN_DAEMON')}
          description={t('TOOLKIT_INSTALL_FN_DAEMON_DESCRIPTION')}
          onClick={handleInstallFnDaemon}
          status={fnDaemonInstallStatus}
        >
          <div className="fn-daemon-status">
            {fnDaemonStatus === FnDaemonInstallStatus.NO_KEXT_DETECTED
              ? t('TOOLKIT_FN_DAEMON_NO_KEXT_DETECTED')
              : fnDaemonStatus === FnDaemonInstallStatus.NOT_INSTALLED
              ? t('TOOLKIT_FN_DAEMON_NOT_INSTALLED')
              : t('TOOLKIT_FN_DAEMON_INSTALLED')}
          </div>
        </ToolkitItem>

        <ToolkitItem
          icon={
            <img className="heliport-icon" src={HeliPortIcon} alt="HeliPort" />
          }
          title={t('TOOLKIT_DOWNLOAD_HELIPORT')}
          description={t('TOOLKIT_DOWNLOAD_HELIPORT_DESCRIPTION')}
          onClick={handleDownloadHeliPort}
        />

        <ToolkitItem
          icon={<SeedProgramIcon />}
          title={t('TOOLKIT_ENROLL_SEED_PROGRAM')}
          description={t('TOOLKIT_ENROLL_SEED_PROGRAM_DESCRIPTION')}
          status={enrollStatus}
          onClick={handleEnrollDeveloperProgram}
        />
      </ToolkitContainer>
    </ContentPage>
  );
}

export default ToolkitPage;
