import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { KeyboardContainer } from './style';

export interface KeyItemProps {
  primary: string;
  group: number;
  color: number[];
  className: string;
}

export interface KeyboardProps {
  colorSeries: number[][];
  currentMode: string;
  speedIndex: number;
  disabled: boolean;
}

const DEFAULT_COLOR_SERIES = [
  [0xff, 0x00, 0x00],
  [0xff, 0x5a, 0x00],
  [0xff, 0xb4, 0x00],
  [0x00, 0xb4, 0x00],
  [0x00, 0x00, 0xff],
  [0x00, 0xb4, 0xff],
  [0xff, 0x00, 0xff],
];

const DEFAULT_RAINBOW_COLOR = [
  [0xff, 0x00, 0x00],
  [0x00, 0xb4, 0x00],
  [0x00, 0x00, 0xff],
  [0xff, 0x00, 0xff],
];

const STATIC_COLOR = [0xee, 0xee, 0xee];

const KEYBOARD_MAP = [
  [
    ['ESC', 'F1', 'F2', 'F3'],
    ['F4', 'F5', 'F6', 'F7'],
    ['F8', 'F9', 'F10', 'F11', 'F12'],
    ['PrtSc', 'DEL', 'END', '+', '-'],
  ],
  [
    ['`', '1', '2', '3'],
    ['4', '5', '6', '7'],
    ['8', '9', '0', '-', '='],
    ['Backspace', 'NUM', '/', '*'],
  ],
  [
    ['Tab', 'Q', 'W', 'E'],
    ['R', 'T', 'Y', 'U'],
    ['I', 'O', 'P', '[', ']'],
    ['\\', '7', '8', '9'],
  ],
  [
    ['Caps', 'A', 'S', 'D'],
    ['F', 'G', 'H', 'J'],
    ['K', 'L', ';', "'"],
    ['Enter', '4', '5', '6'],
  ],
  [
    ['LShift', 'Z', 'X', 'C'],
    ['V', 'B', 'N', 'M'],
    [',', '.', '/', 'RShift'],
    ['↑', '1', '2', '3'],
  ],
  [
    ['LCtrl', 'Fn', 'Win', 'LAlt'],
    ['Space', 'RAlt'],
    ['Menu', 'RCtrl', '←'],
    ['↓', '→', '0', '.'],
  ],
];



function KeyItem({ primary, group, color, className }: KeyItemProps) {
  const displayValue =
    (primary[0] === 'L' || primary[0] === 'R') && primary.length > 1
      ? primary.substr(1, primary.length - 1)
      : primary;

  return (
    <div
      className={`keyboard-key ${className}`}
      keyboard-value={primary}
      keyboard-group={group}
      style={{
        border: `2px solid rgb(${color.join(',')})`,
      }}
    >
      <span>{displayValue}</span>
    </div>
  );
}

function repeat<T>(target: T[], times: number): T[][] {
  const arr: T[][] = [];
  while (times--) {
    arr.push([...target]);
  }
  return arr;
}

export function Keyboard({ disabled, currentMode, colorSeries, speedIndex }: KeyboardProps) {
  const [changeIndex, setChangeIndex] = useState(0);
  const [currentTimes, setCurrentTimes] = useState(0);
  const [colors, setColors] = useState(repeat(STATIC_COLOR, 4));

  useEffect(() => {
    const duration = (5 - speedIndex) * (
      currentMode === 'KBL_FLASH' ? 100 : 400
    );

    const interval = setInterval(() => {
      if (disabled) {
        setColors(repeat(STATIC_COLOR, 4));
        return;
      }

      switch (currentMode) {
        case 'KBL_GRADIENT':
          setColors(repeat(DEFAULT_COLOR_SERIES[changeIndex], 4));
          setChangeIndex((changeIndex + 1) % DEFAULT_COLOR_SERIES.length);
          break;
        
        case 'KBL_FLASH':
          if (currentTimes >= 20) {
            setCurrentTimes(0);
            setChangeIndex((changeIndex + 1) % DEFAULT_COLOR_SERIES.length);
            break;
          }
          else if (currentTimes === 10) {
            setColors(repeat(STATIC_COLOR, 4));
          }
          else if (currentTimes <= 10 && currentTimes % 2 === 0) {
            setColors(repeat(STATIC_COLOR, 4));
          } else if (currentTimes <= 10) {
            setColors(repeat(DEFAULT_COLOR_SERIES[changeIndex], 4));
          }
          setCurrentTimes(currentTimes + 1);
          break;

        case 'KBL_FIXED_COLOR':
          setColors(colorSeries);
          break;

        case 'KBL_BREATH':
          if (currentTimes % 2) {
            setColors(repeat(DEFAULT_COLOR_SERIES[changeIndex], 4));
            setChangeIndex((changeIndex + 1) % DEFAULT_COLOR_SERIES.length);
          } else {
            setColors(repeat(STATIC_COLOR, 4));
          }
          setCurrentTimes(currentTimes + 1);
          break;

        case 'KBL_WAVE':
          setColors([
            DEFAULT_COLOR_SERIES[(changeIndex + 3) % DEFAULT_COLOR_SERIES.length],
            DEFAULT_COLOR_SERIES[(changeIndex + 2) % DEFAULT_COLOR_SERIES.length],
            DEFAULT_COLOR_SERIES[(changeIndex + 1) % DEFAULT_COLOR_SERIES.length],
            DEFAULT_COLOR_SERIES[changeIndex],
          ]);
          setChangeIndex((changeIndex + 1) % DEFAULT_COLOR_SERIES.length);
          break;

        case 'KBL_RAINBOW':
          setColors(DEFAULT_RAINBOW_COLOR);
          break;

        default:
          break;
      }
    }, duration);
    return () => {
      clearInterval(interval);
    }
  }, [disabled, speedIndex, colorSeries, changeIndex, currentTimes, currentMode]);

  const renderKeyboard = () => {
    const results = [];
    let rowIndex = 0;
    for (const row in KEYBOARD_MAP) {
      if (!KEYBOARD_MAP.hasOwnProperty(row)) continue;

      const rows = KEYBOARD_MAP[row],
        rowKeys = [];

      for (let group = 0; group < rows.length; group++) {
        for (let index = 0; index < rows[group].length; index++) {
          const keyVal = rows[group][index];

          /* preview different styles */

          rowKeys.push(
            <KeyItem
              key={`${group}${keyVal}`}
              primary={keyVal}
              group={group}
              color={colors[group]}
              className={classNames(currentMode, `speed-${speedIndex}`)}
            />
          );
        } // for keyVal of rows[group]
      } // for group in rows
      results.push(
        <div key={rowIndex++} className="keyboard-group">
          {rowKeys}
        </div>
      );
    }
    return results;
  };

  return <KeyboardContainer>{renderKeyboard()}</KeyboardContainer>;
}
