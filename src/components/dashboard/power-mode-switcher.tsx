import BlockTitle from 'components/common/block-title';
import t from 'resources/i18n';
import { PowerSaveIcon } from 'resources/icons/power-mode';
import {
  PowerModeItemContainer,
  PowerModeItemIcon,
  PowerModeItemText,
  PowerSwitcherContainer,
  PowerSwitcherGrids,
} from './style';

export interface PowerModeItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function PowerModeItem({
  title,
  description,
  icon,
  onClick,
}: PowerModeItemProps) {
  return (
    <PowerModeItemContainer onClick={onClick}>
      <PowerModeItemIcon>{icon}</PowerModeItemIcon>
      <PowerModeItemText>
        <div className="text-title">
          {title}
        </div>
        <div className="text-description">
          {description}
        </div>
      </PowerModeItemText>
    </PowerModeItemContainer>
  );
}

function PowerModeSwitcher() {
  const switchToPowerSaveMode = () => {};
  return (
    <PowerSwitcherContainer>
      <BlockTitle title={t('DASHBOARD_POWER_MODE')} />
      <PowerSwitcherGrids>
        <PowerModeItem 
          icon={<PowerSaveIcon />}
          title={t('DASHBOARD_POWER_SAVE')}
          description={t('DASHBOARD_POWER_SAVE_DESCRIPTION')}
          onClick={switchToPowerSaveMode}
        />
      </PowerSwitcherGrids>
    </PowerSwitcherContainer>
  );
}

export default PowerModeSwitcher;
