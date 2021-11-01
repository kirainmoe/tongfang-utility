import ContentPage from 'components/common/content-page';
import t from 'resources/i18n';
import { AppLogoAndNameContainer, LicenseFieldContainer } from './style';
import AppLogo from 'resources/images/TongfangUtility.png';
import appConfig from 'common/appconfig';
import { Tabs } from '@arco-design/web-react';
import license from './license.html?raw';

const { TabPane } = Tabs;

function AboutPage() {
  return (
    <ContentPage>
      <AppLogoAndNameContainer>
        <div className="app-logo">
          <img
            width={100}
            height={100}
            src={AppLogo}
            alt="Tongfang Utility Logo"
          />
        </div>
        <div className="app-name">
          {appConfig.appName}
        </div>
        <div>
          <small>by Ami Technology</small>
        </div>
        <div className="app-version">
          v{appConfig.version} ({appConfig.build})
        </div>
      </AppLogoAndNameContainer>

      <Tabs destroyOnHide={true}>
        <TabPane key="open-source-license" title={t('ABOUT_OPEN_SOURCE_CODE_LICENSE')}>
          <LicenseFieldContainer dangerouslySetInnerHTML={{
            __html: license,
          }}>

          </LicenseFieldContainer>
        </TabPane>
      </Tabs>
    </ContentPage>
  );
}

export default AboutPage;
