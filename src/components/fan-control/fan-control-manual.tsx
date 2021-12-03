import useSetInterval from 'common/hooks/use-set-interval';
import { observer } from 'mobx-react';
import { useContext, useState } from 'react';
import t from 'resources/i18n';
import { RootStoreContext } from 'stores';
import { invoke } from '@tauri-apps/api';
import {
  FanManualModeContainer,
  FanSpeedLevelItemContainer,
  FanSpeedLevelSelector,
} from './style';

interface FanSpeedLevelItemProps {
  active: boolean;
  level: number;
  onClick: () => void;
}

function FanSpeedLevelItem({ level, active, onClick }: FanSpeedLevelItemProps) {
  return (
    <FanSpeedLevelItemContainer
      className={`class-${level}`}
      level={level}
      active={active}
      onClick={onClick}
    >
      {level}  
    </FanSpeedLevelItemContainer>
  );
}

function FanControlManual() {
  const { fan } = useContext(RootStoreContext);

  const [temperature, setTemperature] = useState(0);

  // 更新温度
  useSetInterval(async () => {
    const temperature = (await invoke('get_temperature')) as number;
    setTemperature(temperature);
  }, 3000);

  return (
    <FanManualModeContainer>
      <div className="fan-speed-level">
        <span>
          {t('FAN_CONTROL_CPU_TEMP')}: {temperature}°C
        </span>
        <span>
          {t('FAN_CONTROL_LEVEL')}: {fan.fanSpeedLevel}
        </span>
      </div>

      <FanSpeedLevelSelector>
        {[0, 1, 2, 3, 4, 5].map((level) => (
          <FanSpeedLevelItem
            active={fan.fanSpeedLevel === level}
            level={level}
            onClick={() => fan.setFanSpeedLevel(level)}
            key={level}
          />
        ))}
      </FanSpeedLevelSelector>

      <div className="fan-speed-indicator">
        <span className="low">{t('FAN_CONTROL_SPEED_LOW')}</span>
        <span className="indicator-arrow"></span>
        <span className="fast">{t('FAN_CONTROL_SPEED_FAST')}</span>
      </div>
    </FanManualModeContainer>
  );
}

export default observer(FanControlManual);
