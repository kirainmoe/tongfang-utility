import { Slider, Switch, Message } from '@arco-design/web-react';
import { invoke } from '@tauri-apps/api/tauri';
import cn from 'classnames';
import ContentPage from 'components/common/content-page';
import { useCallback, useEffect, useState } from 'react';
import t from 'resources/i18n';
import {
  Breathing,
  Flash,
  Gradient,
  Palette,
  Rainbow,
  Wave,
} from 'resources/icons';
import ColorPicker from './color-picker';
import { Keyboard } from './keyboard';
import {
  KeyboardLightItemContainer,
  KeyboardLightModesContainer,
  KeyboardLightSwitchContainer,
  SlideContainer,
  SlideItem,
} from './style';

export interface KeyboardLightItemProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick: () => void;
}

function KeyboardLightItem({
  title,
  children,
  className,
  icon,
  onClick,
}: KeyboardLightItemProps) {
  return (
    <KeyboardLightItemContainer className={className} onClick={onClick}>
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div>{children}</div>
    </KeyboardLightItemContainer>
  );
}

const keyboardStyleModes = [
  { key: 'KBL_FIXED_COLOR', icon: <Palette /> },
  { key: 'KBL_BREATH', icon: <Breathing /> },
  { key: 'KBL_WAVE', icon: <Wave /> },
  { key: 'KBL_RAINBOW', icon: <Rainbow /> },
  { key: 'KBL_FLASH', icon: <Flash /> },
  { key: 'KBL_GRADIENT', icon: <Gradient /> },
];

const brightness = [0x00, 0x08, 0x16, 0x24, 0x32];
const speeds = [0x0a, 0x07, 0x05, 0x03, 0x01];

function KeyboardLight() {
  const tryParse = (item: string | null, parser: any) => {
    if (!item) {
      return null;
    }
    try {
      return parser(item);
    } catch (err) {
      return null;
    }
  };

  // 从 localStorage 读取缓存值
  const [currentMode, setCurrentMode] = useState(
    localStorage.getItem('tfu-kbl-current-mode') || 'KBL_FIXED_COLOR'
  );
  const [fixedColorSeries, setFixedColorSeries] = useState(
    tryParse(
      localStorage.getItem('tfu-kbl-fixed-color-series'),
      JSON.parse
    ) || [
      [255, 255, 255],
      [255, 255, 255],
      [255, 255, 255],
      [255, 255, 255],
    ]
  );
  const [disabled, setDisabled] = useState(
    tryParse(localStorage.getItem('tfu-kbl-disabled'), (v: string) => v === 'true') || false
  );
  const [brightnessIndex, setBrightnessIndex] = useState(
    tryParse(localStorage.getItem('tfu-kbl-brightness-index'), Number) || 2
  );
  const [speedIndex, setSpeedIndex] = useState(
    tryParse(localStorage.getItem('tfu-kbl-speed-index'), Number) || 2
  );

  const applyModeChange = useCallback(() => {
    localStorage.setItem('tfu-kbl-current-mode', currentMode);
    localStorage.setItem(
      'tfu-kbl-fixed-color-series',
      JSON.stringify(fixedColorSeries)
    );
    localStorage.setItem('tfu-kbl-brightness-index', String(brightnessIndex));
    localStorage.setItem('tfu-kbl-speed-index', String(speedIndex));

    if (disabled) {
      return;
    }

    (async() => {
      switch (currentMode) {
        case 'KBL_FIXED_COLOR':
          for (let i = 0; i < fixedColorSeries.length; i++) {
            const [r, g, b] = fixedColorSeries[i];
  
            await invoke('set_mono_color', {
              r,
              g,
              b,
              block: i + 1,
              brightness: brightness[brightnessIndex],
              save: 1,
            }).catch((err) => Message.error(err));
          }
          break;
  
        case 'KBL_BREATH':
          await invoke('set_breathing', {
            brightness: brightness[brightnessIndex],
            speed: speeds[speedIndex],
            save: 1,
          }).catch((err) => Message.error(err));
          break;
  
        case 'KBL_WAVE':
          await invoke('set_wave', {
            brightness: brightness[brightnessIndex],
            speed: speeds[speedIndex],
            direction: 0,
            save: 1,
          }).catch((err) => Message.error(err));
          break;
  
        case 'KBL_RAINBOW':
          await invoke('set_rainbow', {
            brightness: brightness[brightnessIndex],
            save: 1,
          }).catch((err) => Message.error(err));
          break;
  
        case 'KBL_FLASH':
          await invoke('set_flashing', {
            brightness: brightness[brightnessIndex],
            speed: speeds[speedIndex],
            direction: 0,
            save: 1,
          }).catch((err) => Message.error(err));
          break;
  
        case 'KBL_GRADIENT':
          await invoke('set_gradient', {
            brightness: brightness[brightnessIndex],
            speed: speeds[speedIndex],
            save: 1,
          }).catch((err) => Message.error(err));
          break;
      }  
    })();

  }, [disabled, currentMode, fixedColorSeries, brightnessIndex, speedIndex]);

  const handleToggleKeyboardLight = (v: boolean) => {
    setDisabled(!v);
    localStorage.setItem('tfu-kbl-disabled', String(!v));
    if (!v) {
      invoke('disable_keyboard_light').catch((err) => Message.error(err));
    }
  };

  useEffect(() => {
    applyModeChange();
  }, [applyModeChange]);

  return (
    <ContentPage title={t('KBL_TITLE')}>
      <Keyboard 
        currentMode={currentMode}
        colorSeries={fixedColorSeries}
        speedIndex={speedIndex}
        disabled={disabled}
      />

      <KeyboardLightModesContainer>
        {keyboardStyleModes.map((mode, index) => (
          <KeyboardLightItem
            title={t(mode.key)}
            className={cn(mode.key === currentMode && 'active', mode.key)}
            icon={mode.icon}
            key={index}
            onClick={() => setCurrentMode(mode.key)}
          >
            {mode.key === 'KBL_FIXED_COLOR' && (
              <ColorPicker
                defaultValue={fixedColorSeries}
                onChange={setFixedColorSeries}
              />
            )}
          </KeyboardLightItem>
        ))}
      </KeyboardLightModesContainer>

      <KeyboardLightSwitchContainer>
        <Switch
          defaultChecked={!disabled}
          onChange={handleToggleKeyboardLight}
        />
      </KeyboardLightSwitchContainer>

      <SlideContainer>
        <SlideItem>
          <div className="item-title">{t('KBL_BRIGHTNESS')}</div>
          <Slider
            defaultValue={brightnessIndex * 25}
            step={25}
            formatTooltip={(v) => `${v}%`}
            onChange={(v) => setBrightnessIndex(Math.round((v as number) / 25))}
          />
        </SlideItem>

        <SlideItem>
          <div className="item-title">{t('KBL_SPEED')}</div>
          <Slider
            defaultValue={speedIndex * 25}
            step={25}
            formatTooltip={(v) => `${v}%`}
            onChange={(v) => setSpeedIndex(Math.round((v as number) / 25))}
          />
        </SlideItem>
      </SlideContainer>
    </ContentPage>
  );
}

export default KeyboardLight;
