import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { RootStoreContext } from 'stores';

import { NavigatorContainer, NavigatorLogo, NavigatorUserAvatar } from './style';

import NavigatorButton from './navigator-button';

import t from 'resources/i18n';

import { AppleIcon, CompatCheck, DashboardIcon, KeyboardIcon, SettingIcon, UpdateIcon } from 'resources/icons';

import AppLogo from 'resources/images/TongfangUtility.png';
import UserAvatar from 'resources/images/Avatar.jpg';

function Navigator() {
  const { app, ui } = useContext(RootStoreContext);

  return (
    <NavigatorContainer
      background={ui.navigatorColor}
      emphasizeColor={ui.navigatorActiveColor}
      hoverColor={ui.navigatorHoverColor}
    >
      <div>
        <Link to="/about">
          <NavigatorLogo src={AppLogo} alt="Tongfang Utility Logo" />
        </Link>

        {app.platform === 'macos' && (
          <NavigatorButton
            title={t('NAVIGATOR_DASHBOARD')!}
            to="/dashboard"
            icon={<DashboardIcon />}
          />
        )}

        <NavigatorButton
          title={t('NAVIGATOR_CONFIGURATION')!}
          to="/configuration"
          icon={<AppleIcon />}
        />

        <NavigatorButton
          title={t('NAVIGATOR_KEYBOARD_LIGHT')!}
          to="/keyboard-light"
          icon={<KeyboardIcon />}
        />

        {app.platform === 'windows' && (
          <NavigatorButton
            title={t('NAVIGATOR_COMPAT_CHECK')}
            to="/compatibility-check"
            icon={<CompatCheck />}
          />
        )}

        <NavigatorButton
          title={t('NAVIGATOR_PREFERENCE_SETTING')}
          to="/preference"
          icon={<SettingIcon />}
        />

        <NavigatorButton
          title={t('NAVIGATOR_UPDATE')}
          to="/update"
          icon={<UpdateIcon />}
        />

        <NavigatorUserAvatar
          src={UserAvatar}
          alt="User Avatar"
        />
      </div>
    </NavigatorContainer>
  );
}

export default observer(Navigator);
