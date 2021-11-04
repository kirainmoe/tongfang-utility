import styled from 'styled-components';

export const KeyboardLightModesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px;
  margin: 30px 0;
`;

export const KeyboardLightItemContainer = styled.div`
  svg {
    width: 50px;
    height:50px;
    transition: .25s all ease-out;
  }

  text-align: center;
  padding: 30px 0;
  cursor: pointer;
  transition: .25s all ease-out;
  border-radius: 8px;
  position:relative;

  overflow: hidden;

  &:hover {
    background: rgba(0, 0, 0, .15);
  }

  &.active {
    background: rgba(0, 0, 0, .2);
  }

  .color-picker {
    margin-bottom: -40px;
    transition: .25s all ease-out;
  }

  &.KBL_FIXED_COLOR.active {
    svg {
      margin-top: -10px;
    }
    .color-picker {
      margin-bottom: 0;
    }
  }

  &.KBL_GRADIENT.active {
    background: rgb(211,173,248);
    color: #fff;
  }

  &.KBL_FLASH.active {
    background: rgb(251,219,20);
    color: #fff;
  }

  &.KBL_RAINBOW.active {
    background: #000;
    color: #fff;
  }

  &.KBL_WAVE.active {
    background: rgb(104,195,242);
    color: #fff;
  }

  &.KBL_BREATH.active {
    background: rgb(0,140,54);
    color: #fff;
  }
`;

export const KeyboardLightSwitchContainer = styled.div`
  position: fixed;
  right:40px;
  top: 50px;
`;

export const SlideContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
`;

export const SlideItem = styled.div`
  width: 47.5%;
  .item-title {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const KeyboardContainer = styled.div`
  text-align: center;
  font-family: sans-serif;
  margin-top: 50px;

  .keyboard-group {
    min-width: 50.5%;
    display: inline-grid;
    grid-template-columns: repeat(36, 16px);
    grid-template-rows: 35px;
    grid-gap: 5px;
    margin: 2.5px 0;
  }

  .keyboard-key {
    line-height: 30px;
    text-align: center;
    grid-column: span 2;
    border: 1px solid #00b6fa;
    border-radius: 4px;
    font-size: 10px;

    &.speed-0 {
      transition: 2s all linear;
    }
    &.speed-1 {
      transition: 1.6s all linear;
    }
    &.speed-2 {
      transition: 1.2s all linear;
    }
    &.speed-3 {
      transition: 0.8s all linear;
    }
    &.speed-4 {
      transition: 0.4s all linear;
    }
    &.KBL_FLASH, &.KBL_FIXED_COLOR, &.KBL_WAVE {
      transition: 0s!important;
    }
  }

  /* keyboard widths */
  .keyboard-key[keyboard-value='Backspace'] {
    grid-column: span 4;
  }
  .keyboard-key[keyboard-value='Tab'] {
    grid-column: span 3;
  }
  .keyboard-key[keyboard-value='\\\\'] {
    grid-column: span 3;
  }
  .keyboard-key[keyboard-value='Caps'] {
    grid-column: span 4;
  }
  .keyboard-key[keyboard-value='Enter'] {
    grid-column: span 4;
  }
  .keyboard-key[keyboard-value='LShift'] {
    grid-column: span 5;
  }
  .keyboard-key[keyboard-value='RShift'] {
    grid-column: span 3;
  }
  .keyboard-key[keyboard-value='Space'] {
    grid-column: span 11;
  }
  .keyboard-key[keyboard-value='RCtrl'] {
    grid-column: span 3;
  }
`;

export const ColorPickerContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 5px;
  text-align: center;
`;

interface ColorPickerItemProps {
  rgbColor: number[];
}

export const ColorPickerItemContainer = styled.div<ColorPickerItemProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;

  background: rgb(${props => `${props.rgbColor.join(',')}`});
  border: 2px solid rgba(0, 0, 0, .15);
  cursor: pointer;

  display: inline-block;
  transform:scale(1.1);
  padding: 0;
  margin-right: 4px;


  input {
    visibility: hidden;
  }
`;

ColorPickerContainer.defaultProps = {
  className: 'color-picker',
}
