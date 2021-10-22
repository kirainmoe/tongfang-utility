import config from './config';
import navigator from './navigator';
import global from './global';
import vendor from './vendor';
import drivers from './drivers';
import dashboard from './dashboard';

import store from 'stores';

const translations: { [key: string]: string[]; } = {
  ...dashboard,
  ...config,
  ...vendor,
  ...navigator,
  ...drivers,
  ...global,
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

