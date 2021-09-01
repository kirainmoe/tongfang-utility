import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavigatorContainer = styled.div`
  width: 100vw;
  height: 60px;
  padding: 15px;
  line-height: 30px;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
  
  border-bottom: 1px solid #dededf;
`;

export const NavigationLink = styled(NavLink)`
  color: #7ec699;
  text-decoration: none;
  margin: 0 10px;

  &.active {
    font-weight: 600;
  }
`;