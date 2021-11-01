import useForm from '@arco-design/web-react/es/Form/useForm';
import { dialog } from '@tauri-apps/api';
import { useContext } from 'react';
import { RootStoreContext } from 'stores';
import BlockTitle from 'components/common/block-title';
import {
  BlockDescription,
  FormItemDefaultTips,
  VerticalMargin,
  StyledForm,
  SettingActionContainer,
} from './style';
import t from 'resources/i18n';
import { Button, Form, Input, Message, Space } from '@arco-design/web-react';
import { observer } from 'mobx-react';
import { RightContentContainer } from 'components/common/style';

const { Item } = Form;

function SettingDownload() {
  const { app } = useContext(RootStoreContext);

  const [form] = useForm();

  const handleClickChooseDownloadPath = async () => {
    const path = await dialog.open({
      directory: true,
    });
    form.setFieldsValue({
      'efi-download-path': path,
    });
  };

  const handleClickResetDownloadPath = async () => {
    const path = await app.getDefaultDownloadPath();
    form.setFieldsValue({
      'efi-download-path': path,
    });
  };

  const handleClickChooseAppPath = async () => {
    const path = await dialog.open({
      directory: true,
    });
    form.setFieldsValue({
      'app-path': path,
    });
  };

  const handleClickResetAppPath = async () => {
    const path = await app.getDefaultAppPath();
    form.setFieldsValue({
      'app-path': path,
    });
  };

  const handleSubmit = (values: any) => {
    app.setAppPath(values['app-path']);
    app.setDownloadPath(values['efi-download-path']);
    Message.success(t('SETTING_APPLIED'));
  };

  return (
    <StyledForm form={form} layout="vertical" onSubmit={handleSubmit}>
      <BlockTitle title={t('SETTING_PATH')} />
      <BlockDescription>{t('SETTING_PATH_DESCRIPTION')}</BlockDescription>

      <Item
        field="efi-download-path"
        label={t('SETTING_CONFIG_DONWLOAD_PATH')}
        rules={[{ required: true }]}
        initialValue={app.downloadPath}
      >
        <Input />
      </Item>

      <RightContentContainer>
        <FormItemDefaultTips>
          {t('SETTING_CONFIG_DOWNLOAD_PATH_DEFAULT')}
        </FormItemDefaultTips>
        <Space>
          <Button status="success" onClick={handleClickChooseDownloadPath}>
            {t('SETTING_CHOOSE_OTHER_PATH')}
          </Button>
          <Button status="warning" onClick={handleClickResetDownloadPath}>
            {t('SETTING_RESTORE_DEFAULT_PATH')}
          </Button>
        </Space>
      </RightContentContainer>

      <VerticalMargin />

      <Item
        field="app-path"
        label={t('SETTING_APP_PATH')}
        rules={[{ required: true }]}
        initialValue={app.appPath}
      >
        <Input />
      </Item>

      <RightContentContainer>
        <FormItemDefaultTips>
          {t('SETTING_APP_PATH_DEFAULT')}
        </FormItemDefaultTips>
        <Space>
          <Button status="success" onClick={handleClickChooseAppPath}>
            {t('SETTING_CHOOSE_OTHER_PATH')}
          </Button>
          <Button status="warning" onClick={handleClickResetAppPath}>
            {t('SETTING_RESTORE_DEFAULT_PATH')}
          </Button>
        </Space>
      </RightContentContainer>

      <SettingActionContainer>
        <Button htmlType="submit" type="primary">
          {t('SETTING_APPLY')}
        </Button>
      </SettingActionContainer>
    </StyledForm>
  );
}

export default observer(SettingDownload);
