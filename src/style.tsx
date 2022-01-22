import { createGlobalStyle } from 'styled-components';

import 'antd/dist/antd.min.css';
import '@arco-design/web-react/dist/css/arco.css';
import { darken, lighten } from 'polished';

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

  .update-popover {
    .arco-popover-content {
      padding: 0;
      margin-top: 10px;
    }
  }

  ${props => props.cssVariable}
`;

export interface OverrideStyleProps {
  mainColor: string;  
}

export const OverrideStyle = createGlobalStyle<OverrideStyleProps>`
  .ant-btn-link {
    color: ${props => props.mainColor};
    &:hover {
      color: ${props => darken(0.3)(props.mainColor)};
    }
  }

  .arco-btn-primary:not(.arco-btn-disabled):not(.arco-btn-loading) {
    background-color: ${props => props.mainColor};
    &:hover {
      background-color: ${props => darken(0.05)(props.mainColor)};  
    }
  }

  .arco-steps-mode-arrow .arco-steps-item-process {
    background-color: ${props => props.mainColor};
  }

  .arco-steps-mode-arrow.arco-steps-size-small .arco-steps-item:not(:last-child).arco-steps-item-process::after {
    border-left: 20px solid ${props => props.mainColor};
  }

  .arco-radio-checked .arco-radio-mask {
    background-color: ${props => props.mainColor};
    border-color: ${props => props.mainColor};
  }

  .arco-btn-primary:not(.arco-btn-disabled).arco-btn-loading {
    background: ${props => lighten(0.05)(props.mainColor)};
  }

  .arco-switch-checked,
  .arco-slider-bar,
  .arco-tabs-header-ink {
    background-color: ${props => props.mainColor};
  }

  .arco-slider-button::after {
    border: 2px solid ${props => props.mainColor};
  }

  .arco-tabs-header-title-active, .arco-tabs-header-title-active:hover {
    color: ${props => props.mainColor};
  }
`;

export default GlobalStyle;
