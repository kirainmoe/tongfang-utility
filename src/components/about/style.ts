import styled from "styled-components";

export const AppLogoAndNameContainer = styled.div`
  text-align: center;

  .app-name {
    margin: 10px 0 0 0;
    font-size: 24px;
    font-weight: bold;
  }
  
  .app-version {
    color: #888;
  }

  small {
    display: block;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

export const LicenseFieldContainer = styled.div`
  padding: 20px;
  height: 400px;
  overflow-y: auto;
  background: #fafafa;
`;