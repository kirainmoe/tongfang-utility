import useForm from '@arco-design/web-react/es/Form/useForm';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { RootStoreContext } from 'stores';
import {
  SettingActionContainer,
  StyledForm,
  ThemeItemSelectorContainer,
} from './style';
import BlockTitle from 'components/common/block-title';
import t from 'resources/i18n';
import { Button, Message, Select, Tooltip } from '@arco-design/web-react';
import { DownloadServer } from 'common/constants';
import themes, { Theme } from 'common/themes';
import UIStore from 'stores/ui-store';

const { Item } = StyledForm;
const { Option } = Select;

interface ThemeItemSelectorProps {
  theme: Theme;
  ui: UIStore;
}

function ThemeItemSelector({ theme, ui }: ThemeItemSelectorProps) {
  return (
    <Tooltip content={t(theme.nameKey)}>
      <ThemeItemSelectorContainer
        style={{
          background: theme.background,
        }}
        onClick={() => ui.setTheme(theme)}
      />
    </Tooltip>
  );
}

function SettingCommon() {
  const { app, ui } = useContext(RootStoreContext);
  const [form] = useForm();

  const handleSubmit = (values: any) => {
    ui.setUILanguage(values.language);
    app.setDownloadMirror(values['download-mirror'] as DownloadServer);
    Message.success(t('SETTING_APPLIED'));
  };

  return (
    <StyledForm form={form} layout="vertical" onSubmit={handleSubmit}>
      <BlockTitle title={t('SETTING_LANGUAGE')} />
      <Item
        field="language"
        style={{ marginTop: 10 }}
        initialValue={ui.language}
      >
        <Select>
          <Option value="zh-cn">简体中文 (zh-CN)</Option>
          <Option value="en">English (en)</Option>
        </Select>
      </Item>

      <BlockTitle title={t('SETTING_MIRROR')} />
      <Item
        field="download-mirror"
        style={{ marginTop: 10 }}
        initialValue={app.downloadMirror}
      >
        <Select>
          <Option value="rinco">🍁 Rinco (RingNet)</Option>
          <Option value="eine">🎩 Eine (Tencent Cloud)</Option>
          <Option value="akane">🍷 Akane (Cloudflare)</Option>
          {process.env.NODE_ENV === 'development' && (
            <Option value="local">💻 Local (Dev)</Option>
          )}
        </Select>
      </Item>

      <BlockTitle title={t('SETTING_APPEARANCE')} />
      <div>
        {Object.keys(themes).map((themeName) => (
          <ThemeItemSelector
            theme={(themes as Record<string, Theme>)[themeName]}
            ui={ui}
          />
        ))}
      </div>

      <SettingActionContainer>
        <Button htmlType="submit" type="primary">
          {t('SETTING_APPLY')}
        </Button>
      </SettingActionContainer>
    </StyledForm>
  );
}

export default observer(SettingCommon);
