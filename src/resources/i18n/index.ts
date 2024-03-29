import config from './config';
import navigator from './navigator';
import global from './global';
import vendor from './vendor';
import drivers from './drivers';
import dashboard from './dashboard';
import compatCheck from './compat-check';
import settings from './settings';
import about from './about';
import keyboardLight from './keyboard-light';
import fanControl from './fan-control';
import update from './update';
import toolkit from './toolkit';
import status from './status';
import userpanel from './userpanel';
import rust from './rust';

import store from 'stores';

const translations: { [key: string]: string[]; } = {
  ...dashboard,
  ...config,
  ...vendor,
  ...navigator,
  ...drivers,
  ...compatCheck,
  ...settings,
  ...about,
  ...keyboardLight,
  ...fanControl,
  ...update,
  ...toolkit,
  ...status,
  ...userpanel,
  ...global,
  ...rust,
};

export default function t(key: string) {
  if (!translations[key]) {
    return key;
  }

  let index;
  switch (store.ui.language.toLowerCase()) {
    case "zh-cn":
    case "zh":
    case "zh-hk":
    case "zh-tw":
      index = 0;
      break;

    default:
      index = 1;
      break;
  }

  return translations[key][index];
}

