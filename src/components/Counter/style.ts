import styled from "styled-components";
import { darken } from 'polished';

export const CounterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export const CounterNumber = styled.p`
  width: 100%;
  font-size: 66px;
  text-align: center;
  color: #7ec699;
`;

export const CounterActions = styled.div`
  width: 100%;
  text-align: center;
`;

export const ActionButton = styled.button`
  background: #7ec699;
  color: #fff;

  font-size: 28px;
  
  padding: 10px;
  margin: 0 10px;

  border: 0;
  border-radius: 5px;

  transition: .25s all ease-out;
  cursor: pointer;

  &:hover {
    background: ${darken(0.1, '#7ec699')};
  }
`;