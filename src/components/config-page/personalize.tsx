import { observer } from 'mobx-react';
import { Dropdown, Form, Input, Menu, Select, Switch, Modal, Message } from '@arco-design/web-react';

import BlockTitle from 'components/common/block-title';
import { MainContentContainer } from 'components/common/style';

import t from 'resources/i18n';
import { PlatformData, PlatformString } from 'resources/smbios/smbios-list';
import { DescriptionBlock, ImagePathContainer, StyledBootArgsSelect, StyledForm } from './style';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getModelNameBySN } from 'services/get-model-name-by-sn';
import { generateSNAndMLB } from 'services/generate-sn-and-mlb';
import { getSMBIOSInfo } from 'services/get-smbios-info';
import { getWmicInfo } from 'services/get-wmic-info';
import { More } from '@icon-park/react';
import { RootStoreContext } from 'stores';
import { open } from '@tauri-apps/api/dialog';
import ActionButtons from 'components/common/action-buttons';
import { v4 } from 'uuid';
import bootArgsPreset from 'resources/boot-args-preset';

const { Item, useForm } = Form;
const { Option } = Select;
const { confirm } = Modal;

// SMBIOS 来源
export enum SMBIOSSource {
  ReadFromSystem, // 从系统读取
  ManuallyModified, // 手动修改
  AutoGenerated, // 自动生成
  LastGenerated, // 上次生成
}

function Personalize() {
  // SMBIOS 信息来源
  const [source, setSMBIOSSource] = useState(SMBIOSSource.ReadFromSystem);

  const [form] = useForm();
  const { app, config } = useContext(RootStoreContext);

  // 默认 SMBIOS model
  const defaultModelIndex = (() => {
    switch (config.generation) {
      case 7:
        return 41;    // MBP14,3
      case 8:
        return 42;    // MBP15,1
      case 9:
      default:
        return 44;    // MBP15,3
    }
  })();

  // 从 localStorage 读取 SMBIOS 信息
  const readFromLocalStorageAndFill = useCallback(() => {
    const info = localStorage.getItem('tfu-efi-smbios');
    if (!info) {
      return false;
    }
    try {
      const smbios = JSON.parse(info);
      form.setFieldsValue(smbios);
      setSMBIOSSource(SMBIOSSource.LastGenerated);
      return true;
    } catch(err) {
      return false;
    }
  }, [form]);

  // 随机生成并填写 SMBIOS 信息
  const generateAndFill = useCallback(async (index: number) => {
    const { sn, mlb } = await generateSNAndMLB(index);
    form.setFieldsValue({
      sn,
      mlb,
    });
    setSMBIOSSource(SMBIOSSource.AutoGenerated);
  }, [form]);

  // 从系统读取并填写 SMBIOS 信息
  const readAndFill = useCallback(async () => {
    if (app.platform === 'macos') {
      const smbios = await getSMBIOSInfo();
      if (smbios) {
        form.setFieldsValue({
          model: PlatformString.indexOf(smbios.model),
          sn: smbios.serial_number,
          mlb: smbios.mlb,
          smuuid: smbios.system_uuid,
        });
        setSMBIOSSource(SMBIOSSource.ReadFromSystem);
        return true;
      }
    } else if (app.platform === 'windows') {
      Message.warning(t('PERSONALIZE_ONLY_SMUUID_ON_WINDOWS'));
      const wmicInfo = await getWmicInfo();
      if (wmicInfo.uuid) {
        form.setFieldsValue({
          smuuid: wmicInfo.uuid,
        });
        return false;
      }
    }
    return false;
  }, [app, form]);

  const onSelectModel = useCallback(async (index: number) => {
    await generateAndFill(index);
  }, [generateAndFill]);

  // SMBIOS 来源标识
  const getSMBIOSSourceTag = () => {
    switch (source) {
      case SMBIOSSource.ReadFromSystem:
        return t('PERSONALIZE_SMBIOS_READ_FROM_CURRENT_SYSTEM');
      case SMBIOSSource.AutoGenerated:
        return t('PERSONALIZE_SMBIOS_AUTO_GENERATED');
      case SMBIOSSource.ManuallyModified:
        return t('PERSONALIZE_SMBIOS_MANUALLY_MODIFIED');
      case SMBIOSSource.LastGenerated:
        return t('PERSONALIZE_SMBIOS_LAST_GENERATED');
      default:
        return null;
    }
  };

  // 重置 SmUUID
  const resetSmUUID = () => {
    confirm({
      title: t('PERSONALIZE_SMBIOS_RANDOM_SMUUID_WARN'),
      onOk() {
        const smuuid = v4().toUpperCase();
        setSMBIOSSource(SMBIOSSource.AutoGenerated);
        form.setFieldsValue({
          smuuid,
        });
      },
    })
  };

  // 下拉菜单组件
  const menu = (
    <Menu>
      <Menu.Item key="random_generate" onClick={() => generateAndFill(form.getFieldValue('model'))}>
        {t('PERSONALIZE_SMBIOS_RANDOM_GENERATE_USING_THIS_MODEL')}
      </Menu.Item>
      <Menu.Item key="read_from_system" onClick={() => readAndFill()}>
        {t('PERSONALIZE_SMBIOS_READ_FROM_SYSTEM')}
      </Menu.Item>
      <Menu.Item key="random_smuuid" onClick={() => resetSmUUID()}>
        {t('PERSONALIZE_SMBIOS_RANDOM_SMUUID')}
      </Menu.Item>
    </Menu>
  );

  const onSwitchCustomBackground = async (value: boolean) => {
    if (value) {
      const imagePath = await open({
        filters: [
          {
            name: 'PNG and ICNS',
            extensions: ['png', 'icns'],
          },
        ],
      });
      if (imagePath) {
        const imagePathStr = imagePath as string;
        config.setCustomBackground(true, imagePathStr);
      }
    } else {
      config.setCustomBackground(false);
    }
  };

  const onNextStep = async () => {
    const formValues = form.getFieldsValue();
    formValues.model = PlatformData[formValues.model][0];
    config.setSMBIOSInfo(formValues);
    config.nextStep();
  };

  useEffect(() => {
    (async () => {
      if (!await readAndFill()) {}
      else if (!readFromLocalStorageAndFill()) {}
      else {
        onSelectModel(defaultModelIndex); // generate
      }
    })();
  }, [defaultModelIndex, onSelectModel, readAndFill, readFromLocalStorageAndFill]);

  return (
    <MainContentContainer>
      <BlockTitle title={t('PERSONALIZE_SMBIOS')} tips={t('PERSONALIZE_SMBIOS_DESCRIPTION')}>
        <span style={{ marginRight: 10, color: '#888' }}>
          {t('PERSONALIZE_SMBIOS_CURRENT_SOURCE')}: {getSMBIOSSourceTag()}
        </span>
        <Dropdown droplist={menu}>
          <More
            theme="outline"
            size="16"
            fill="#333"
            style={{ cursor: 'pointer' }}
          />
        </Dropdown>
      </BlockTitle>
      <StyledForm form={form} labelCol={{ span: 5 }} size="small">
        <Item
          label={t('PERSONALIZE_SMBIOS_MODEL')}
          field="model"
          required
          initialValue={defaultModelIndex}
        >
          <Select onChange={(v) => onSelectModel(v as number)}>
            {PlatformData.map(([name, sn], index) => (
              <Option key={index} value={index}>
                {name} - {getModelNameBySN(sn)}
              </Option>
            ))}
          </Select>
        </Item>

        <Item label={t('PERSONALIZE_SMBIOS_SN')} field="sn" required>
          <Input />
        </Item>

        <Item label={t('PERSONALIZE_SMBIOS_MLB')} field="mlb" required>
          <Input />
        </Item>

        <Item label={t('PERSONALIZE_SMBIOS_SMUUID')} field="smuuid" required>
          <Input />
        </Item>
      </StyledForm>

      <BlockTitle
        title={t('PERSONALIZE_CUSTOM_BACKGROUND')}
      >
        <ImagePathContainer title={config.customBackgroundPath}>
          {config.useCustomBackground
            ? `${t('PERSONALIZE_USE_CUSTOM_BACKGROUND')}: ${
                config.customBackgroundPath
              }`
            : t('PERSONALIZE_USE_DEFAULT_BACKGROUND')}
        </ImagePathContainer>
        <Switch
          checked={config.useCustomBackground}
          onChange={onSwitchCustomBackground}
        />
      </BlockTitle>
      <DescriptionBlock>
        {t('PERSONALIZE_CUSTOM_BACKGROUND_DESCRIPTION')}
      </DescriptionBlock>

      <BlockTitle title={t('PERSONALIZE_SET_BOOT_ARGS')} />
      <StyledBootArgsSelect
        mode="multiple"
        allowCreate={true}
        allowClear={true}
        onChange={(v) => config.setBootArgs((v as any).join(' '))}
        placeholder={t('PERSONALIZE_SET_BOOT_ARGS_PLACEHOLDER')}
        defaultValue={config.bootArgs.length ? config.bootArgs.split(' ') : []}
      >
        {bootArgsPreset.map((arg, index) => (
          <Option key={index} value={arg}>{arg}</Option>
        ))}
      </StyledBootArgsSelect>

      <ActionButtons
        onNext={onNextStep}
      />
    </MainContentContainer>
  );
}

export default observer(Personalize);
