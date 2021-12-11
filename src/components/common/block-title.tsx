import { Tooltip } from "antd";
import { observer } from "mobx-react-lite";
// import { useContext } from "react";
// import { RootStoreContext } from "stores";
import { Help } from '@icon-park/react';
import { BlockTitleContainer } from "./style";

export interface BlockTitleProps {
  title: string;
  tips?: string;
  children?: React.ReactNode;
}

function BlockTitle(props: BlockTitleProps) {
  // const { ui } = useContext(RootStoreContext);
  return (
    <BlockTitleContainer className="block-title">
      <span>{props.title}</span>

      {props.tips && (
        <Tooltip title={props.tips}>
          <Help
            theme="outline"
            size="14"
            fill="#333"
            style={{ marginLeft: 10 }}
          />
        </Tooltip>
      )}

      {props.children && <div className="title-children">{props.children}</div>}
    </BlockTitleContainer>
  );
}

export default observer(BlockTitle);