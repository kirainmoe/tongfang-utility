import { darken } from "polished";
import styled from "styled-components";

export const TitleBarContainer = styled.div`
  width: 100vw;
  height: 50px;

  position: fixed;
  top: 0px;
  left: 5px;
  z-index: 200;

  user-select: none;

  padding: 15px 10px;
`;

export interface TitleBarButtonProps {
  color: string;
}

export const TitleBarButton = styled.button<TitleBarButtonProps>`
  width: 12px;
  height: 12px;

  border: 0px;
  border-radius: 50%;

  margin-right: 8px;

  outline: none;

  background: ${(props) => props.color};
  transition: .2s all linear;

  &:hover {
    background: ${(props) => darken(0.1)(props.color)};
  }
`;