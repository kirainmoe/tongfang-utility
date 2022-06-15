import cn from 'classnames';
import { Message, Modal, Spin, Tooltip } from '@arco-design/web-react';
import {
  DownloadServer,
  MIRROR_NAMES,
  MIRROR_SERVER_DOMAINS,
  MIRROR_SERVER_NAME,
} from 'common/constants';
import { useContext, useEffect, useRef, useState } from 'react';
import t from 'resources/i18n';
import { RootStoreContext } from 'stores';
import {
  MirrorCheckResult,
  MirrorServerItem,
  MirrorServerItemContainer,
} from './style';
import { observer } from 'mobx-react-lite';

export interface MirrorServerSwitchProps {
  show: boolean;
  callback: (status: boolean) => void;
}

function MirrorServerSwitcher({ show, callback }: MirrorServerSwitchProps) {
  const { app } = useContext(RootStoreContext);
  const [, rerender] = useState({});
  const mirrorConnectivity = useRef(
    (() => {
      const status: Record<string, 'checking' | 'available' | 'unavailable'> =
        {};
      MIRROR_NAMES.forEach((name) => (status[name] = 'checking'));
      return status;
    })()
  );

  const handleSetMirror = (mirrorName: DownloadServer) => {
    app.setDownloadMirror(mirrorName);
    callback(true);
    Message.success({
      content: t('CONNECTIVITY_CHECKER_MIRROR_SWITCHED').replace(
        '$1',
        MIRROR_SERVER_NAME[mirrorName]
      ),
    });
  };

  // check mirror server connectivity
  useEffect(() => {
    if (show && mirrorConnectivity.current) {
      MIRROR_NAMES.forEach((name) => {
        fetch(MIRROR_SERVER_DOMAINS[name] + 'api/efi/release')
          .then((res) => {
            mirrorConnectivity.current[name] = 'available';
            rerender({});
          })
          .catch((err) => {
            mirrorConnectivity.current[name] = 'unavailable';
            rerender({});
          });
      });
    }
  }, [show]);

  return (
    <Modal
      title={t('CONNECTIVITY_CHECKER_SWITCH_MIRROR_SERVER')}
      visible={show}
      onCancel={() => callback(false)}
    >
      <div>
        <p>
          <b>{t('CONNECTIVITY_CHECKER_CURRENT_SERVER')}：</b>
          <span>{MIRROR_SERVER_NAME[app.downloadMirror]}</span>
        </p>

        <MirrorServerItemContainer>
          {mirrorConnectivity.current &&
            MIRROR_NAMES.map((name, index) => (
              <MirrorServerItem
                key={index}
                className={cn(
                  mirrorConnectivity.current[name] === 'unavailable' &&
                    'disabled'
                )}
                onClick={() => handleSetMirror(name)}
              >
                <Tooltip
                  content={() => {
                    switch (mirrorConnectivity.current[name]) {
                      case 'checking':
                        return t('CONNECTIVITY_CHECKER_SERVER_CHECKING');
                      case 'available':
                        return t('CONNECTIVITY_CHECKER_SERVER_ONLINE');
                      case 'unavailable':
                        return t('CONNECTIVITY_CHECKER_SERVER_OFFLINE');
                    }
                  }}
                >
                  <p>{MIRROR_SERVER_NAME[name].replace(/\(.*\)/, '')}</p>

                  <div>
                    {(() => {
                      switch (mirrorConnectivity.current[name]) {
                        case 'checking':
                          return <MirrorCheckResult icon={<Spin />} />;
                        case 'available':
                          return <MirrorCheckResult status="success" />;
                        case 'unavailable':
                          return <MirrorCheckResult status="error" />;
                      }
                    })()}
                  </div>
                </Tooltip>
              </MirrorServerItem>
            ))}
        </MirrorServerItemContainer>
      </div>
    </Modal>
  );
}

export default observer(MirrorServerSwitcher);