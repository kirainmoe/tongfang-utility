import { Tooltip } from "antd";
import cn from "classnames";
import { darken } from "polished";
import styled from "styled-components";

export interface CustomizeOptionProps {
  label: string;
  description?: string;
  icon: React.ReactNode;
  active: boolean;
  onChange: () => void;
}

const CustomizeOptionContainer = styled.div`
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
    background: #0060f7;
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
  }
  .label-container {
    line-height: 30px;
  }
`;

function CustomizeOption({ label, description, icon, active, onChange }: CustomizeOptionProps) {
  const main = (
    <CustomizeOptionContainer onClick={onChange} className={cn(active && 'active')}>
      <div className="icon-container">{icon}</div>
      <div className="label-container">{label}</div>
    </CustomizeOptionContainer>
  );
  return description ? <Tooltip title={description}>{main}</Tooltip> : main;
}

export default CustomizeOption;