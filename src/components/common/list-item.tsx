import { observer } from "mobx-react";
import { useContext } from "react";
import { RootStoreContext } from "stores";
import styled from "styled-components";

export interface ListItemProps {
  title?: string;
  value: React.ReactNode;
  type?: string;
  style?: React.CSSProperties;
}

export interface ListItemContainerProps {
  textColor: string;
};

const ListItemContainer = styled.li<ListItemContainerProps>`
  margin: 6px 0;
  .title {
    font-weight: bold;
  }
  .value {
    color: ${props => props.textColor}
  }
  .value.warning {
    color: #ff7d00;
  }
  .value.critical {
    color: #f53f3f;
  }
  &.warning {
    list-style: none;
  }
`;

function ListItem({ title, value, type, style }: ListItemProps) {
  const { ui } = useContext(RootStoreContext);
  return (
    <ListItemContainer className={type} textColor={ui.mainColor} style={style}>
      <span className="title">{title}</span>
      <span className={`value ${type}`}>{value}</span>
    </ListItemContainer>
  )
}

export default observer(ListItem);
