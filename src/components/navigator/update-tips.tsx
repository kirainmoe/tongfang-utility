import { Popover, Button } from '@arco-design/web-react';
import { CenterAlignContainer } from 'components/config-page/style';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import t from 'resources/i18n';
import { UpdateAvailable } from 'resources/icons';
import { RootStoreContext } from 'stores';
import { SeparateLine, UpdateTipsContainer, UpdateTipsContentContainer } from './style';

export function UpdateTips() {
  const { update } = useContext(RootStoreContext);
  const history = useHistory();

  return (
    <Popover
      className="update-popover"
      position="left"
      content={
        <UpdateTipsContentContainer>
          <div className="title">
            {t('NAVIGATOR_UPDATE_READY')
              .replace('$appName', t('APP_NAME'))
              .replace('$version', update.remoteAppVersion!)}
          </div>

          <SeparateLine />

          <div className="content">{update.releaseNote}</div>

          <div className="action">
            <CenterAlignContainer style={{ marginTop: 20 }}>
              <Button
                onClick={() => history.push('/update')}
                type="primary"
              >
                {t('UPDATE_NOW')}
              </Button>
            </CenterAlignContainer>
          </div>
        </UpdateTipsContentContainer>
      }
    >
      <UpdateTipsContainer>
        <UpdateAvailable />
      </UpdateTipsContainer>
    </Popover>
  );
}

export default observer(UpdateTips);
