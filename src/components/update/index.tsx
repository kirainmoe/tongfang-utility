import { Button, Message, Modal, Notification, Space } from '@arco-design/web-react';
import appConfig from 'common/appconfig';
import ContentPage from 'components/common/content-page';
import { CenterAlignContainer } from 'components/config-page/style';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import t from 'resources/i18n';
import { RootStoreContext } from 'stores';
import { emit, listen } from '@tauri-apps/api/event';
import { UpdateNotes, UpdateTips, VersionInfo } from './style';
import { relaunch } from '@tauri-apps/api/process';
import { debounce } from 'lodash-es';
import { LinkButton } from 'components/common/style';
import { openPage } from 'utils/open-directory';

let globalNotificationId = '';
const downloadFullLarkDocumentUrl =
  'https://kirainmoe.feishu.cn/wiki/wikcnEwIS4GV8YPgob4AIDdvyPf';

export function UpdatePage() {
  const { update } = useContext(RootStoreContext);
  const [updating, setUpdating] = useState(false);

  const handleUpdateDone = debounce(() => {
    Modal.success({
      title: t('UPDATE_FINISHED'),
      content: t('UPDATE_RESTART_TO_APPLY'),
      onOk() {
        relaunch();
      },
    });
  }, 1000);

  const handleUpdate = async () => {
    setUpdating(true);
    Notification.remove(globalNotificationId);

    await listen('tauri://update-status', function (res) {
      if ((res.payload as any).status === 'DONE') {
        handleUpdateDone();
      }
    });
    await emit('tauri://update-install');
  };

  useEffect(() => {
    update.checkUpdate();
  }, [update]);

  useEffect(() => {
    if (update.requireUpdate) {
      globalNotificationId = `${+new Date()}`;
      Notification.info({
        id: globalNotificationId,
        title: t('UPDATE_NEW_VERSION_AVAILABLLE'),
        content: t('UPDATE_NEW_VERSION_DESCRIPTION')
          .replace('$localVersion', appConfig.version)
          .replace('$localBuild', appConfig.build.toString())
          .replace('$remoteVersion', update.remoteAppVersion!)
          .replace('$remoteBuild', update.remoteAppBuild!.toString()),
        btn: (
          <Space>
            <Button onClick={() => Notification.remove(globalNotificationId)}>
              {t('UPDATE_LATER')}
            </Button>
            <Button onClick={() => handleUpdate()} type="primary">
              {t('UPDATE_NOW')}
            </Button>
          </Space>
        ),
      });
    }
  }, [update.requireUpdate, update.remoteAppBuild, update.remoteAppVersion]);

  useEffect(() => {
    if (update.isRequestError) {
      Message.error(t('UPDATE_NETWORK_ERROR'));
    }
  }, [update.isRequestError]);

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
            {update.isRequestError
              ? t('UPDATE_CANNOT_FETCH_LATEST_VERSION')
              : update.requireUpdate === null
              ? t('UPDATE_FETCHING')
              : update.requireUpdate === true
              ? `${update.remoteAppVersion} (build ${update.remoteAppBuild})`
              : t('UPDATE_NO_REQUIRE')}
          </span>
        </div>
      </VersionInfo>

      <UpdateTips>
        {update.requireUpdate && t('UPDATE_NEW_VERSION_TIPS')}
        {update.isRequestError && t('UPDATE_NETWORK_ERROR')}
        {(update.requireUpdate || update.isRequestError) && (
          <LinkButton onClick={() => openPage(downloadFullLarkDocumentUrl)}>
            {t('UPDATE_DOWNLOAD_COMPLETE_PACKAGE')}
          </LinkButton>
        )}
      </UpdateTips>

      <UpdateNotes>{update.releaseNote}</UpdateNotes>

      <CenterAlignContainer style={{ marginTop: 20 }}>
        {update.requireUpdate && (
          <Button
            loading={updating}
            onClick={handleUpdate}
            disabled={updating}
            status="success"
            type="primary"
          >
            {updating ? t('UPDATE_UPDATING') : t('UPDATE_NOW')}
          </Button>
        )}
      </CenterAlignContainer>
    </ContentPage>
  );
}

export default observer(UpdatePage);
