import Haru from './haru';
import Natsu from './natsu';
import Aki from './aki';
import Fuyu from './fuyu';
import Yoru from './yoru';

import Ava from './ava';
import Bella from './bella';
import Carol from './carol';
import Diana from './diana';
import Eileen from './eileen';

export interface Theme {
  name: string;
  nameKey: string;
  background: string;
  title: {
    fontColor: string;
  };
  navigator: {
    itemHover: string;
    itemActive: string;
    fontColor: string;
  };
  [key: string]: any;
}

const themes = {
  Haru,
  Natsu,
  Aki,
  Fuyu,
  Yoru,

  Ava,
  Bella,
  Carol,
  Diana,
  Eileen,
};

export default themes;
