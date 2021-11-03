import { createRef, useCallback, useState } from 'react';
import { HEXtoRGB } from 'utils/color-convert';
import { ColorPickerContainer, ColorPickerItemContainer } from './style';
import { debounce } from 'lodash-es';

export interface ColorPickerProps {
  defaultValue: number[][];
  onChange: (v: number[][]) => void;
}

export interface ColorPickerItemProps {
  defaultValue: number[];
  onChange: (v: number[]) => void;
}

export function ColorPickerItem({
  defaultValue,
  onChange,
}: ColorPickerItemProps) {
  const [color, setColor] = useState(defaultValue);
  const inputRef = createRef<HTMLInputElement>();

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = HEXtoRGB((e.target as HTMLInputElement).value);
    setColor(color);
    onChange(color);
  };

  return (
    <ColorPickerItemContainer rgbColor={color} onClick={onClick}>
      <input onChange={handleInputChange} type="color" ref={inputRef} />
    </ColorPickerItemContainer>
  );
}

export function ColorPicker({ defaultValue, onChange }: ColorPickerProps) {
  const [colorSeries, setColorSeries] = useState(defaultValue);

  // eslint-disable-next-line
  const debouncedChanger = useCallback(
    debounce(onChange, 500, {
      leading: true,
    }),
    []
  );

  const changeColorSeries = (index: number, color: number[]) => {
    const newSeries = [...colorSeries];
    newSeries[index] = color;
    setColorSeries(newSeries);
    debouncedChanger(newSeries);
  };

  return (
    <ColorPickerContainer>
      {colorSeries.map((series, index) => (
        <ColorPickerItem
          key={index}
          defaultValue={series}
          onChange={(v) => changeColorSeries(index, v)}
        />
      ))}
    </ColorPickerContainer>
  );
}

export default ColorPicker;
