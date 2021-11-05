import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { RootStoreContext } from 'stores';

import { Button, Notification, Space } from '@arco-design/web-react';
import t from 'resources/i18n';
import { useHistory } from 'react-router-dom';

import appConfig from 'common/appconfig';

function CheckUpdate() {
  const { update } = useContext(RootStoreContext);
  const history = useHistory();

  useEffect(() => {
    if (update.requireUpdate) {
      const id = `${+new Date()}`;

      const onUpdate = () => {
        history.push(`/update`);
        Notification.remove(id);
      };

      Notification.info({
        id,
        title: t('UPDATE_NEW_VERSION_AVAILABLLE'),
        duration: 5000,
        content: t('UPDATE_NEW_VERSION_DESCRIPTION')
          .replace('$localVersion', appConfig.version)
          .replace('$localBuild', appConfig.build.toString())
          .replace('$remoteVersion', update.remoteAppVersion!)
          .replace('$remoteBuild', update.remoteAppBuild!.toString()),
        btn: (
          <Space>
            <Button onClick={onUpdate} type="primary">
              {t('UPDATE_NOW')}
            </Button>
          </Space>
        ),
      });
    }
  }, [update, history]);
  return <></>;
}

export default observer(CheckUpdate);
