import { createGlobalStyle } from 'styled-components';

// Global CSS styles
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, body > #root {
    width: 100vw;
    height: 100vh;
    margin: 0;
  }
`;

export default GlobalStyle;
