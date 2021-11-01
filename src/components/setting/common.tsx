import useForm from '@arco-design/web-react/es/Form/useForm';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { RootStoreContext } from 'stores';
import { SettingActionContainer, StyledForm } from './style';
import BlockTitle from 'components/common/block-title';
import t from 'resources/i18n';
import { Button, Message, Select } from '@arco-design/web-react';

const { Item } = StyledForm;
const { Option } = Select;

function SettingCommon() {
  const { ui } = useContext(RootStoreContext);
  const [form] = useForm();

  const handleSubmit = (values: any) => {
    ui.setUILanguage(values.language);
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

      <SettingActionContainer>
        <Button htmlType="submit" type="primary">
          {t('SETTING_APPLY')}
        </Button>
      </SettingActionContainer>
    </StyledForm>
  );
}

export default observer(SettingCommon);