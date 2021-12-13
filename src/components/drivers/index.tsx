import { Tabs } from "@arco-design/web-react";
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
        <Tabs animation={true} destroyOnHide={true}>
          <TabPane title={t('DRIVERS_LOCAL_DOWNLOADED')} key="local">
            <LocalTab />
          </TabPane>

          <TabPane title={t('DRIVERS_REMOTE_VERSION')} key="remote">
            <RemoteTab />
          </TabPane>
        </Tabs>
      </MainContentContainer>
    </ContentPage>
  );
}

export default observer(DriversPage);
