import { Tabs } from "antd";
import ContentPage from "components/common/content-page";
import { MainContentContainer } from "components/common/style";
import { observer } from "mobx-react";
import t from "resources/i18n";

import LocalTab from './local';
import RemoteTab from './remote';

const { TabPane } = Tabs;

function DriversPage() {
  return (
    <ContentPage title={t('DRIVERS_MANAGE_DRIVER')} enableOnBack={true}>
      <MainContentContainer>
        <Tabs defaultActiveKey="local" destroyInactiveTabPane={true}>
          <TabPane tab={t('DRIVERS_LOCAL_DOWNLOADED')} key="local">
            <LocalTab />
          </TabPane>

          <TabPane tab={t('DRIVERS_REMOTE_VERSION')} key="remote">
            <RemoteTab />
          </TabPane>
        </Tabs>
      </MainContentContainer>
    </ContentPage>
  );
}

export default observer(DriversPage);
