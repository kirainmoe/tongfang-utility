import { Button } from "antd";
import styled from "styled-components";

export const ContentPageContainer = styled.div`
  width: calc(100vw - 80px);
  height: 100vh;

  margin-left: 80px;
  padding: 30px 30px;

  user-select: none;
`;

export const ContentPageTitle = styled.h1`
  margin: 10px 0;
  font-size: 24px;
  font-weight: 400;
`;

export const ContentDescription = styled.p`
  margin: 10px 0 20px 0;
  font-size: 14px;
  color: #888;
`;

export interface BlockTitleContainerProps {
  borderColor: string;
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
  margin: 20px 0;

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