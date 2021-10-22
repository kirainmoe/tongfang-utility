import { observer } from "mobx-react-lite";

import ContentPage from "components/common/content-page";
import t from "resources/i18n";
import { MainContentContainer } from "components/common/style";

import DeviceInfo from "./device-info";
import ResourceMonitor from './resource-monitor';
import PowerModeSwitcher from "./power-mode-switcher";


function Dashboard() {
  return (
    <ContentPage title={t('DASHBOARD_PAGE_TITLE')}>
      <MainContentContainer>
        <DeviceInfo />
        <ResourceMonitor />
        <PowerModeSwitcher />
      </MainContentContainer>
    </ContentPage>
  );
}

export default observer(Dashboard);
