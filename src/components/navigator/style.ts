import { NavLink } from "react-router-dom";
import styled from "styled-components";

export interface NavigatorContainerProps {
  background: string;
  emphasizeColor: string;
  hoverColor: string;
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

  /* background: ${props => props.background}; */
  background: linear-gradient(to bottom, #e5eaf0, #e5e5e9, #ece3e5, #e9e3e6, #e4e9ed);

  .navigator-button.active, .navigator-button.active:hover {
    /* background: ${props => props.emphasizeColor}; */
    background: rgba(255, 255, 255, .3);
    /* .title-container {
      color: #3768d2;
    } */
  }

  .navigator-button:hover {
    background: ${props => props.hoverColor};
    background: rgba(200, 200, 200, .5);
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

  .navigator-button.active svg,
  .navigator-button:hover svg {
    /* margin-top: 15px; */
  }
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

export const NavigatorUserAvatar = styled.img`
  box-sizing: content-box;

  border: 2px solid transparent;
  width: 40px;
  height: 40px;
  position: absolute;
  left: 20px;
  bottom: 20px;
  border-radius: 50%;
  cursor: pointer;

  transition: .1s all ease-out;

  &:hover {
    border: 2px solid #3c83dc;
  }
`;