import { Button, Modal, Notification, Progress, Space } from '@arco-design/web-react';
import appConfig from 'common/appconfig';
import ContentPage from 'components/common/content-page';
import { CenterAlignContainer } from 'components/config-page/style';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import t from 'resources/i18n';
import { RootStoreContext } from 'stores';
import { emit, listen } from '@tauri-apps/api/event';
import { UpdateNotes, UpdateTips, VersionInfo } from './style';
import { getCurrent } from '@tauri-apps/api/window';

export function UpdatePage() {
  const { update } = useContext(RootStoreContext);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    setUpdating(true);
    await listen("tauri://update-status", function (res) {
      if ((res.payload as any).status === 'DONE') {
        Modal.success({
          title: t('UPDATE_FINISHED'),
          content: t('UPDATE_RESTART_TO_APPLY'),
          onOk() {
            const window = getCurrent();
            window.close();
          }
        });
      }
      console.log("New status: ", res);
    });
    await emit('tauri://update-install');
  };

  useEffect(() => {
    update.checkUpdate();
  }, [update]);

  useEffect(() => {
    if (update.requireUpdate) {
      const id = `${+new Date()}`;
      Notification.info({
        id,
        title: t('UPDATE_NEW_VERSION_AVAILABLLE'),
        content: t('UPDATE_NEW_VERSION_DESCRIPTION')
          .replace('$localVersion', appConfig.version)
          .replace('$localBuild', appConfig.build.toString())
          .replace('$remoteVersion', update.remoteAppVersion!)
          .replace('$remoteBuild', update.remoteAppBuild!.toString()),
        btn: (
          <Space>
            <Button disabled={updating} onClick={() => Notification.remove(id)}>
              {t('UPDATE_LATER')}
            </Button>
            <Button onClick={() => handleUpdate()} type="primary">{t('UPDATE_NOW')}</Button>
          </Space>
        ),
      });
    }
  }, [update.requireUpdate, update.remoteAppBuild, update.remoteAppVersion]);


  return (
    <ContentPage title={t('UPDATE_TITLE')}>
      <VersionInfo>
        <div>
          <b>{t('UPDATE_CURRENT_VERSION')}：</b>
          <span>
            {appConfig.version} (build {appConfig.build})
          </span>
        </div>
        <div>
          <b>{t('UPDATE_REMOTE_VERSION')}：</b>
          <span>
            {update.requireUpdate === null
              ? t('UPDATE_FETCHING')
              : update.requireUpdate === true
              ? `${update.remoteAppVersion} (build ${update.remoteAppBuild})`
              : t('UPDATE_NO_REQUIRE')}
          </span>
        </div>
      </VersionInfo>

      <UpdateTips>
        {update.requireUpdate && t('UPDATE_NEW_VERSION_TIPS')}
      </UpdateTips>

      <UpdateNotes>{update.releaseNote}</UpdateNotes>

      <Progress percent={updateProgress} />

      <CenterAlignContainer style={{ marginTop: 20 }}>
        {update.requireUpdate && (
          <Button onClick={handleUpdate} disabled={updating} status="success" type="primary">
            {updating ? t('UPDATE_UPDATING') : t('UPDATE_NOW')}
          </Button>
        )}
      </CenterAlignContainer>
    </ContentPage>
  );
}

export default observer(UpdatePage);
