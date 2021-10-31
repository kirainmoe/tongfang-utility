import { createGlobalStyle } from 'styled-components';

import 'antd/dist/antd.min.css';
import '@arco-design/web-react/dist/css/arco.css';

// Global CSS styles
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, body > #root {
    width: 100vw;
    height: 100vh;
    margin: 0;

    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", "WenQuanYi Micro Hei", Tahoma, Arial;
  }
`;

export default GlobalStyle;
