import { NavigatorButtonContainer } from "./style";

export interface NavigatorButtonProps {
  title: string;
  to: string;
  icon: JSX.Element;
  children?: React.ReactChild | React.ReactChild[] | null;
}

export default function NavigatorButton(props: NavigatorButtonProps) {
  return (
    <NavigatorButtonContainer to={props.to}>
      <div className="icon-container">
        {props.icon}
      </div>
      <div className="title-container">
        {props.title}
      </div>
    </NavigatorButtonContainer>
  );
}