import { NavLink } from "react-router-dom";
import styled from "styled-components";

export interface NavigatorContainerProps {
  hoverColor: string;
  fontColor: string;
  activeColor: string;
}

export const NavigatorContainer = styled.div<NavigatorContainerProps>`
  width: 80px;
  height: 100vh;

  padding: 40px 0;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 150;

  margin-top: 10px;
  user-select: none;

  /* background: linear-gradient(to bottom, #e5eaf0, #e5e5e9, #ece3e5, #e9e3e6, #e4e9ed); */

  .navigator-button.active, .navigator-button.active:hover {
    background: ${props => props.activeColor};
  }

  .navigator-button:hover {
    background: ${props => props.hoverColor};
  }

  .navigator-button.active , .navigator-button:hover {
    .title-container {
      margin-top: 0px;
    }
    svg {
      margin-top: 15px;
    }
    /* font-size: 12px; */
  }

  .navigator-button .title-container {
    color: ${props => props.fontColor};
  }

  .navigator-button.active svg,
  .navigator-button:hover svg {
    /* margin-top: 15px; */
  }
`;

export interface NavigatorWrapperProps {
  background: string;
}

export const NavigatorWrapper = styled.div<NavigatorWrapperProps>`
  width: 100vw;
  height: 100vh;
  position: relative;

  background: ${props => props.background};
`;

export const NavigatorButtonContainer = styled(NavLink)`
  width: 70px;
  height: 70px;
  margin: 0 auto;
  margin-bottom: 2px;

  display: block;

  transition: .2s background ease-out;
  overflow: hidden;

  position: relative;
  border-radius: 8px;

  svg {
    width: 25px;
    height: 25px;
    margin-top: 30px;
    transition: .25s all ease-out;
  }

  .title-container {
    font-size: 10px;
    margin-top: 20px;
    transition: .15s all ease-out;
    color: #000;
  }
`;

NavigatorButtonContainer.defaultProps = {
  className: 'navigator-button',
};

export const NavigatorLogo = styled.img`
  width: 35px;
  height: 35px;

  display: block;

  margin: 10px auto;
  margin-bottom: 20px;
`;

export const NavigatorUserAvatarContainer = styled.div`
  width: 30px;
  height: 30px;


  position: absolute;
  right: 10px;
  top: 7.5px;

  cursor: pointer;

  transition: .1s all ease-out;
  z-index: 300;
  outline: 0;

  .user-avatar-img img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export const AvatarFrame = styled.img`
  position: absolute;
  top: -10px;
  left: -10px;
  width: 50px;
  height: 50px;
`;

export const UpdateTipsContainer = styled.div`
  position: absolute;
  top: 12.5px;
  right: 60px;
  z-index: 2000;

  cursor: pointer;

  svg {
    background: #fff;
    border-radius: 50%;
    width: 25px;
    height: 25px;
  }
`;

export const UpdateTipsContentContainer = styled.div`
  width: 350px;
  .title {
    font-weight: bold;
    padding: 15px 20px;
  }

  .content {
    padding: 15px 20px;
  }

  .action {
    padding: 15px 0px;
  }
`;

export const SeparateLine = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
`;