import { Tooltip } from "@arco-design/web-react";
import cn from "classnames";
import { observer } from "mobx-react-lite";
import { darken, lighten } from "polished";
import { useContext } from "react";
import { RootStoreContext } from "stores";
import styled from "styled-components";
import { ContentPageContainer } from "./style";

export interface CustomizeOptionProps {
  label: string;
  description?: string;
  icon: React.ReactNode;
  active: boolean;
  onChange: () => void;
}

export interface CustomizeOptionContainerProps {
  mainColor: string;
}

const CustomizeOptionContainer = styled.div<CustomizeOptionContainerProps>`
  border-radius: 30px;
  background: #e5f3fe;
  font-size: 0.75rem;
  padding: 3px 2px;
  transition: .25s all ease-out;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    background: ${darken(0.1, '#e5f3fe')};
  }
  &.active {
    background: ${props => props.mainColor};
    color: #ffffff;
  }
  & > div {
    display: inline-block;
    vertical-align: top;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  svg {
    width: 20px;
    height: 20px;
  }
  .icon-container {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    svg {
      margin: 5px;
    }
    span {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin: 5px 8px;
    }
  }
  .label-container {
    line-height: 30px;
  }

  ${ContentPageContainer}.dark-mode & {
    background: #2a415b;

    &.active {
      background: ${lighten(0.3)('#2a415b')}
    }
  }
`;

function CustomizeOption({ label, description, icon, active, onChange }: CustomizeOptionProps) {
  const { ui } = useContext(RootStoreContext);
  const main = (
    <CustomizeOptionContainer onClick={onChange} className={cn(active && 'active')} mainColor={ui.mainColor}>
      <div className="icon-container">{icon}</div>
      <div className="label-container">{label}</div>
    </CustomizeOptionContainer>
  );
  return description ? <Tooltip content={description}>{main}</Tooltip> : main;
}

export default observer(CustomizeOption);