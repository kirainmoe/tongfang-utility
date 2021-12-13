import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const FanCLINotFoundInfoContainer = styled.div`
  width: 100%;
  height: 80vh;

  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;

  svg {
    width: 150px;
    height: 150px;
  }

  & > * {
    width: 100%;
    margin: 20px 25px;
  }

  .title {
    font-size: 24px;
    text-align: center;
  }
`;

export const FanModeContainer = styled.div``;

export const FanAnimationContainer = styled.div`
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 3px solid #004b86;
  }

  &.mode-0 svg {
    animation: rotateAnimation 1s linear infinite;
  }

  &.mode-1 svg {
    animation: rotateAnimation 0.2s linear infinite;
  }

  @keyframes rotateAnimation {
    0% {
      transform: rotate(360deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

export const FanModeSelectorContainer = styled.div`
  margin: 20px 0px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
`;

export interface FanControlModeItemContainerProps {
  background: string;
}

export const FanControlModeItemContainer = styled.div<FanControlModeItemContainerProps>`
  border-radius: 10px;
  padding: 10px;

  background: ${(props) =>
    `linear-gradient(to right,  ${lighten(0.05)(props.background)}, ${
      props.background
    }, ${darken(0.05)(props.background)})`};
  color: #fff;

  height: 120px;

  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;

  cursor: pointer;
  transition: 0.2s all ease-out;

  &:hover {
    /* background: ${(props) => darken(0.15)(props.background)}; */
    transform: scale(1.05);
  }

  .mode-title {
    font-size: 18px;
    margin: 0 0 10px 0;
    color: #fff;
  }
`;

export const FanIntelligentModeSettingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .block-title {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const FanIntelligentModeConfigTableContainer = styled.div`
  width: 47.5%;
  max-height: 350px;
  position: relative;

  .add-curve-button {
    position: absolute;
    top: 8px;
    right: 0px;
  }
`;

export const FanIntelligentModeConfigGraphContainer = styled.div`
  width: 47.5%;
  height: 350px;
`;

export const FanManualModeContainer = styled.div`
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;

  & > * {
    width: 100%;
  }

  .fan-speed-level {
    text-align: center;
    font-size: 16px;

    span {
      margin: 0 20px;
    }
  }

  .fan-speed-indicator {
    text-align: center;

    .low {
      color: #b9e7fc;
    }
    .fast {
      color: #00b6f7;
    }

    .indicator-arrow {
      width: 380px;
      height: 3px;
      margin: 0 20px;
      display: inline-block;
      background: linear-gradient(to right, #b9e7fc, #00b6f7);
    }
  }
`;

export const FanSpeedLevelSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-content: flex-end;
  flex-direction: row;
`;

export const FanSpeedLevelItemContainer = styled.div<{
  level: number;
  active: boolean;
}>`
  width: 30px;
  height: ${(props) => props.level * 20 + 30}px;
  margin: 40px 20px;
  border: 4px solid ${(props) => darken(0.05 * props.level)('#C3E7FE')};
  border-radius: 6px;

  background: ${(props) =>
    props.active ? darken(0.05 * props.level)('#C3E7FE') : '#fff'};

  cursor: pointer;

  transition: 0.25s ease-out;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${(props) => darken(0.05 * props.level)('#C3E7FE')};
  }
`;
