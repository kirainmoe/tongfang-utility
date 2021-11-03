import ContentPage from 'components/common/content-page';
import t from 'resources/i18n';
import { AppLogoAndNameContainer, ContentContainer, LicenseFieldContainer } from './style';
import AppLogo from 'resources/images/TongfangUtility.png';
import appConfig from 'common/appconfig';
import { Tabs } from '@arco-design/web-react';
import license from './license.html?raw';
import Discussion from './discussion';
import StatementAndThank from './statement-thanks';
import Donate from './donate';

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
        <TabPane key="about" title={t('ABOUT_SOFTWARE')}>
          <ContentContainer dangerouslySetInnerHTML={{
              __html: t('ABOUT_SOFTWARE_INFO'),
          }} />
        </TabPane>
        <TabPane key="discussion" title={t('ABOUT_DISCUSSION')}>
          <Discussion />
        </TabPane>
        <TabPane key="statment-thank" title={t('ABOUT_SPECIAL_THANK')}>
          <StatementAndThank />
        </TabPane>
        <TabPane key="open-source-license" title={t('ABOUT_OPEN_SOURCE_CODE_LICENSE')}>
          <LicenseFieldContainer dangerouslySetInnerHTML={{
            __html: license,
          }} />
        </TabPane>
        <TabPane key="donate" title={t('ABOUT_DONATE')}>
          <Donate />
        </TabPane>
      </Tabs>
    </ContentPage>
  );
}

export default AboutPage;
