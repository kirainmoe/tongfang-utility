import styled from "styled-components";

export const AppLogoAndNameContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;

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
  height: 360px;
  overflow-y: auto;
  background: #fafafa;
`;

export const ContentContainer = styled.div`
  padding: 10px 20px;
  line-height: 25px;
`;

export const DiscussionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

export const DiscussionChannelItem = styled.div`
  text-align: center;

  img {
    width: 150px;
    height: 150px;
    display: block;
    margin: 0 auto;
  }

  svg {
    width: 40px;
    height: 40px;
    display: block;
    margin: 20px auto;
  }

  .tips {
    font-size: 12px;
  }
`;

export const StatementItemContainer = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;

  img {
    vertical-align: middle;
    min-width: 200px;
    display: inline-block;
    cursor: pointer;
  }

  span {
    display: inline-block;
    margin-left: 40px;
    vertical-align: middle;
  }
`;

export const OtherStatementContainer = styled.div`
  margin-top: 30px;

  .title {
    margin: 8px 0;
    color: #888;
  }
`;