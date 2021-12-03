import {
  FanIntelligentModeConfigGraphContainer,
  FanIntelligentModeConfigTableContainer,
  FanIntelligentModeSettingContainer,
} from './style';
import BlockTitle from 'components/common/block-title';
import t from 'resources/i18n';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import { RootStoreContext } from 'stores';
import {
  FanControlCurveItem,
  readFanControlCurveConfig,
  writeFanControlCurveConfig,
} from 'services/fan-control-curve';
import {
  Button,
  Form,
  InputNumber,
  Message,
  Modal,
  Select,
  Table,
} from '@arco-design/web-react';
import { FanControlMode, FanControlModeStringMap } from 'common/constants';
import { CenterAlignContainer } from 'components/config-page/style';
import ReactECharts from 'echarts-for-react';
import useForm from '@arco-design/web-react/es/Form/useForm';

const { Option } = Select;

function FanControlCurve() {
  const [configTable, setConfigTable] = useState<FanControlCurveItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = useForm();

  const { fan } = useContext(RootStoreContext);

  const columns = [
    {
      title: t('FAN_CONTROL_CONFIG_TABLE_TEMPERATURE_THRESHOLD'),
      dataIndex: 'temperature',
    },
    {
      title: t('FAN_CONTROL_CONFIG_TABLE_SPEED_LEVEL'),
      dataIndex: 'level',
      render: (level: number, record: FanControlCurveItem) =>
        record.mode !== FanControlMode.MANUAL
          ? t(FanControlModeStringMap[record.mode])
          : record.level,
    },
    {
      title: t('OPERATION'),
      dataIndex: 'key',
      render: (id: number, record: FanControlCurveItem) => {
        return (
          <Button
            status="danger"
            type="text"
            onClick={() => {
              setConfigTable(configTable.filter((item) => item.key !== id));
            }}
          >
            {t('DELETE')}
          </Button>
        );
      },
    },
  ];

  const onFanConfigFormSubmit = (data: any) => {
    const nextTable = [...configTable];
    nextTable.push({
      temperature: data.temperature,
      level: data.level === -1 ? 0 : data.level,
      mode: data.level === -1 ? FanControlMode.BOOST : FanControlMode.MANUAL,
      key: Math.random(),
    });
    nextTable.sort(
      (a: FanControlCurveItem, b: FanControlCurveItem) =>
        a.temperature - b.temperature
    );
    setConfigTable(nextTable);
  };

  const onSave = () => {
    writeFanControlCurveConfig(configTable)
      .then(() => fan.applySetting())
      .then(() => Message.success(t('FAN_CONTROL_CONFIG_SAVED')));
  };

  useEffect(() => {
    readFanControlCurveConfig().then(setConfigTable);
  }, []);

  return (
    <FanIntelligentModeSettingContainer>
      <FanIntelligentModeConfigTableContainer>
        <BlockTitle title={t('FAN_CONTROL_DYNAMIC_SETTING')} />
        <Table
          size="small"
          columns={columns}
          data={configTable}
          pagination={{
            pageSize: 5,
          }}
        />
        <Button
          onClick={() => setModalVisible(true)}
          className="add-curve-button"
          status="success"
        >
          {t('ADD')}
        </Button>
      </FanIntelligentModeConfigTableContainer>

      <FanIntelligentModeConfigGraphContainer>
        <BlockTitle title={t('FAN_CONTROL_CONFIG_TABLE_CURVE_CHART')} />
        <ReactECharts
          style={{
            width: '100%',
            height: '300px',
          }}
          option={{
            xAxis: {
              type: 'category',
              data: configTable.map((item) => item.temperature),
              axisLabel: {
                formatter: (value: number) => `${value}°C`,
              },
            },
            yAxis: {
              type: 'value',
              name: t('FAN_CONTROL_CONFIG_TABLE_SPEED_LEVEL'),
            },
            series: [
              {
                data: configTable.map((item) =>
                  item.mode === FanControlMode.BOOST ? 6 : item.level
                ),
                type: 'line',
                smooth: true,
              },
            ],
          }}
        />
      </FanIntelligentModeConfigGraphContainer>

      <CenterAlignContainer style={{ marginTop: 10 }}>
        <Button className={"save-button"} type="primary" onClick={onSave}>
          {t('SAVE')}
        </Button>
      </CenterAlignContainer>

      <Modal
        title={t('FAN_CONTROL_CONFIG_MODAL_TITLE')}
        onOk={() => {
          form.submit();
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <Form form={form} onSubmit={onFanConfigFormSubmit}>
          <Form.Item
            initialValue={50}
            field="temperature"
            label={t('FAN_CONTROL_CONFIG_TABLE_TEMPERATURE_THRESHOLD')}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            initialValue={0}
            field="level"
            label={t('FAN_CONTROL_CONFIG_TABLE_SPEED_LEVEL')}
          >
            <Select>
              <Option value={0}>0</Option>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
              <Option value={4}>4</Option>
              <Option value={5}>5</Option>
              <Option value={-1}>{t('FAN_CONTROL_MODE_BOOST')}</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </FanIntelligentModeSettingContainer>
  );
}

export default observer(FanControlCurve);
