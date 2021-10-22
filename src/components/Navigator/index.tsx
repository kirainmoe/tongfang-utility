import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from 'stores';

import { NavigatorContainer, NavigatorLogo } from './style';

import NavigatorButton from './navigator-button';

import t from 'resources/i18n';

import { AppleIcon, DashboardIcon } from 'resources/icons';
import AppLogo from 'resources/images/TongfangUtility.png';

function Navigator() {
  const { ui } = useContext(RootStoreContext);

  return (
    <NavigatorContainer
      background={ui.navigatorColor}
      emphasizeColor={ui.navigatorActiveColor}
      hoverColor={ui.navigatorHoverColor}
    >
      <div>
        <NavigatorLogo src={AppLogo} alt="Tongfang Utility Logo" />

        <NavigatorButton
          title={t('NAVIGATOR_DASHBOARD')!}
          to="/dashboard"
          icon={<DashboardIcon />}
        />

        <NavigatorButton
          title={t('NAVIGATOR_CONFIGURATION')!}
          to="/configuration"
          icon={<AppleIcon />}
        />
      </div>
    </NavigatorContainer>
  );
}

export default observer(Navigator);
