import { Tabs } from '@arco-design/web-react';

import ContentPage from 'components/common/content-page';
import { observer } from 'mobx-react';
import t from 'resources/i18n';

import SettingDownload from './download';
import SettingCommon from './common';

const { TabPane } = Tabs;

function Setting() {
  return (
    <ContentPage title={t('SETTING_TITLE')}>
      <Tabs destroyOnHide={true} animation={true}>
        <TabPane key="common" title={t('SETTING_COMMON')}>
          <SettingCommon />
        </TabPane>

        <TabPane key="download" title={t('SETTING_DOWNLOAD')}>
          <SettingDownload />
        </TabPane>
      </Tabs>
    </ContentPage>
  );
}

export default observer(Setting);
