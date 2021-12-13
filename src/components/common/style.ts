import { Button } from "antd";
import styled from "styled-components";

export const ContentPageContainer = styled.div<{
  dark: boolean;
}>`
  width: calc(100vw - 80px);
  height: calc(100vh - 50px);

  padding: 20px 30px;
  background: ${props => props.dark ? '#1a1a1a' : '#fff'};
  color: ${props => props.dark ? '#fff' : '#000'};

  position: absolute;
  top: 50px;
  left: 80px;

  user-select: none;
  border-radius: 10px 0 0 0;

  ${props => props.dark && `
    h1, h2, h3 { color: #fff; }
    .ant-progress-text { color: #fff; }
  `}
`;

export interface ContentPageTitleProps {
  color: string;
}

export const ContentPageTitle = styled.h1<ContentPageTitleProps>`
  margin: 10px 0;
  font-size: 15px;
  line-height: 16px;
  font-weight: 500;
  position: absolute;
  top: -42.5px;
  color: ${props => props.color};
`;

export const ContentDescription = styled.p`
  margin: 10px 0 15px 0;
  font-size: 14px;
  color: #888;
`;

export interface BlockTitleContainerProps {
  // borderColor: string;
}

export const BlockTitleContainer = styled.div<BlockTitleContainerProps>`
  font-size: 18px;
  margin-top: 10px;
  position: relative;

  .title-children {
    position: absolute;
    top: 0px;
    right: 0px;
    text-align: right;

    font-size: 14px;
    font-weight: normal;

    svg {
      padding-top: 3px;
    }
  }
`;

export const MainContentContainer = styled.div`
  position: relative;
`;

export const LinkButton = styled(Button)`
  padding: 0;
`;

LinkButton.defaultProps = {
  type: 'link',
};

export const RightContentContainer = styled.div`
  text-align: right;
`;