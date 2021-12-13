import { createGlobalStyle } from 'styled-components';

import 'antd/dist/antd.min.css';
import '@arco-design/web-react/dist/css/arco.css';

export interface GlobalStyleProps {
  cssVariable: string;
}

// Global CSS styles
export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  * {
    box-sizing: border-box;
  }

  html, body, body > #root {
    width: 100vw;
    height: 100vh;
    margin: 0;

    overflow: hidden;

    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", "WenQuanYi Micro Hei", Tahoma, Arial;
  }

  ${props => props.cssVariable}
`;

export default GlobalStyle;
