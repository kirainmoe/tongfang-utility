import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { RootStoreContext } from 'stores';

import {
  NavigatorContainer,
  NavigatorLogo,
  NavigatorWrapper,
} from './style';

import NavigatorUserAvatar from './avatar';
import NavigatorButton from './navigator-button';
import UpdateTips from './update-tips';

import t from 'resources/i18n';

import {
  AppleIcon,
  CompatCheck,
  DashboardIcon,
  FanIcon,
  KeyboardIcon,
  SettingIcon,
  Toolkit,
  UpdateIcon,
} from 'resources/icons';

import AppLogo from 'resources/images/TongfangUtility.png';
import { Message } from '@arco-design/web-react';


function Navigator() {
  const { app, ui, update } = useContext(RootStoreContext);
  const [clickTime, setClickTime] = useState(0);

  useEffect(() => {
    if (clickTime === 10) {
      if (localStorage.getItem('tfu-release-debug')) {
        localStorage.removeItem('tfu-release-debug');
        Message.info(t('NAVIGATOR_EXIT_DEVELOPER_MODE'));
        (window as any).eruda.destroy();
      } else {
        localStorage.setItem('tfu-release-debug', 'true');
        Message.info(t('NAVIGATOR_ENTER_DEVELOPER_MODE'));
        (window as any).eruda.init();
      }
      setClickTime(0);
    }
  }, [clickTime]);

  return (
    <NavigatorWrapper background={ui.background}>
      <NavigatorContainer
        activeColor={ui.navigatorItemActive}
        hoverColor={ui.navigatorItemHover}
        fontColor={ui.navigatorItemFontColor}
      >
        <div>
          <Link to="/about" onClick={() => setClickTime(clickTime + 1)}>
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

          {app.platform === 'macos' && app.supportFanControl && (
            <NavigatorButton
              title={t('NAVIGATOR_FAN_CONTROL')}
              to="/fan-control"
              icon={<FanIcon />}
            />
          )}

          {app.platform === 'macos' && (
            <NavigatorButton
              title={t('NAVIGATOR_TOOLKIT')!}
              to="/toolkit"
              icon={<Toolkit />}
            />
          )}

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
        </div>
      </NavigatorContainer>

      <NavigatorUserAvatar />

      {update.requireUpdate && <UpdateTips />}
    </NavigatorWrapper>
  );
}

export default observer(Navigator);
