import styled from "styled-components";

export interface IconDivProps {
  width: number;
  height: number;
  scale?: number;
}

export interface IconContainerProps extends IconDivProps {
  icon: JSX.Element;
}


const IconDiv = styled.div<IconDivProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: inline-block;
  vertical-align: top;

  svg {
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    ${props => props.scale ? `transform: scale(${props.scale});` : ''}
  }
`;

export default function IconContainer({
  width,
  height,
  icon,
  scale
}: IconContainerProps) {

  return (
    <IconDiv width={width} height={height} scale={scale}>
      {icon}
    </IconDiv>
  )
}
