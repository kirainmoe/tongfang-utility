import appConfig from 'common/appconfig';
import ContentPage from 'components/common/content-page';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import t from 'resources/i18n';
import { RootStoreContext } from 'stores';
import { VersionInfo } from './style';

export function UpdatePage() {
  const { update } = useContext(RootStoreContext);

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
            {update.remoteAppVersion === null
              ? t('UPDATE_FETCHING')
              : `${update.remoteAppVersion} (build ${update.remoteAppBuild})`}
          </span>
        </div>
      </VersionInfo>
    </ContentPage>
  );
}

export default observer(UpdatePage);
