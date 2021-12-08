import React from "react";

import DashboardPage from 'components/dashboard';
import ConfigPage from 'components/config-page';
import DriversPage from 'components/drivers';
import CompatibilityCheckPage from 'components/compatibility-check';
import SettingPage from 'components/setting';
import AboutPage from 'components/about';
import KeyboardLightPage from 'components/keyboard-light';
import FanControlPage from 'components/fan-control';
import UpdatePage from 'components/update';
import ToolkitPage from 'components/toolkit';

export interface RouteItem {
  path: string;
  component: React.ComponentType;
  platform?: 'windows' | 'macos';
  exact?: boolean;
};

const routers: RouteItem[] = [
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/keyboard-light',
    component: KeyboardLightPage,
  },
  {
    path: '/fan-control',
    platform: 'macos',
    component: FanControlPage,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
  },
  {
    path: '/configuration',
    component: ConfigPage,
  },
  {
    path: '/drivers',
    component: DriversPage,
  },
  {
    path: '/compatibility-check',
    platform: 'windows',
    component: CompatibilityCheckPage,
  },
  {
    path: '/preference',
    component: SettingPage,
  },
  {
    path: '/update',
    component: UpdatePage,
  },
  {
    path: '/toolkit',
    component: ToolkitPage,
  },
];

export const defaultRoute = {
  windows: '/configuration',
  macos: '/dashboard',
};

export default routers;
