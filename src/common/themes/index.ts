import Haru from './haru';
import Natsu from './natsu';
import Aki from './aki';
import Fuyu from './fuyu';
import Yoru from './yoru';

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
};

export default themes;
