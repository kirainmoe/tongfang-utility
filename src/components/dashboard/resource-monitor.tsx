import { Popover, Progress } from 'antd';
import useSetInterval from 'common/hooks/use-set-interval';
import BlockTitle from 'components/common/block-title';
import { LiquidGraph } from 'components/common/liquid-graph';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import t from 'resources/i18n';
import { invoke } from '../../../node_modules/@tauri-apps/api';
import { ChartGrid, ChartItem, ResourceMonitorContainer } from './style';
import ReactECharts from 'echarts-for-react';
import { getTemperatureDashboardOption } from './options';

interface BatteryInfoPayload {
  charging: boolean;
  current_capacity: number;
  design_capacity: number;
  max_capacity: number;
  full_charged: boolean;
  installed: boolean;
}

interface DiskUtilizationPayload {
  percent: number;
  free: number;
  used: number;
  total: number;
}

// const getBackgroundColorBypercent = () => {};

function ResourceMonitor() {
  const [batteryInfo, setBatteryInfo] = useState<BatteryInfoPayload>({
    charging: false,
    current_capacity: 0,
    design_capacity: 0,
    max_capacity: 0,
    full_charged: false,
    installed: true,
  });

  const [storageInfo, setStorageInfo] = useState({
    percent: 0,
    free: 0,
    used: 0,
    total: 0,
  });

  const [temperature, setTemperature] = useState(0);
  const [cpuUtil, setCpuUtil] = useState(0);
  const [memUtil, setMemUtil] = useState([0, 0]);

  // 更新温度
  useSetInterval(async () => {
    const temperature = (await invoke('get_temperature')) as number;
    setTemperature(temperature);

    const cpuUtil = (await invoke('get_cpu_utilization')) as number;
    setCpuUtil(cpuUtil);

    const memUtil = (await invoke('get_memory_utilization')) as [
      number,
      number
    ];
    setMemUtil(memUtil);
  }, 3000);

  // 更新电池状态
  useSetInterval(async () => {
    const batteryInfo = (await invoke(
      'get_battery_info'
    )) as BatteryInfoPayload;

    setBatteryInfo(batteryInfo);
  }, 10000);

  // 电池容量
  const batteryPercent =
    batteryInfo.max_capacity > 0
      ? Math.floor(
          (batteryInfo.current_capacity / batteryInfo.max_capacity) * 100
        )
      : 0;

  // 更新存储状态
  useEffect(() => {
    invoke('get_disk_utilization').then((result) => {
      setStorageInfo(result as DiskUtilizationPayload);
    });
  }, []);

  const [total, used] = memUtil;

  return (
    <ResourceMonitorContainer>
      <BlockTitle title={t('DASHBOARD_RESOURCE_MONITOR')} />
      <ChartGrid>
        <ChartItem>
          <Popover
            content={
              <div>
                <div>
                  {t('DASHBOARD_BATTERY_DESIGNED_CAPACITY')}:{' '}
                  {batteryInfo.design_capacity} mAh
                </div>
                <div>
                  {t('DASHBOARD_BATTERY_MAX_CAPACITY')}:{' '}
                  {batteryInfo.max_capacity} mAh
                </div>
                <div>
                  {t('DASHBOARD_BATTERY_CURRENT_CAPACITY')}:{' '}
                  {batteryInfo.current_capacity} mAh
                </div>
              </div>
            }
          >
            <LiquidGraph
              width={100}
              height={100}
              fillColor="#389e0d"
              backgroundColor="#b7eb8f"
              percent={batteryPercent}
            />
            <span className="chart-item-tag">
              {t('DASHBOARD_BATTERY_REMAIN')}{' '}
              {batteryInfo.charging && t('DASHBOARD_BATTERY_CHARGING')}
              {!batteryInfo.installed && t('DASHBOARD_BATTERY_NOT_INSTALLED')}
            </span>
          </Popover>
        </ChartItem>

        <ChartItem>
          <Progress
            type="dashboard"
            percent={Math.floor(cpuUtil)}
            style={{ height: 120, marginTop: -5, transform: `scale(0.95)` }}
          />
          <span className="chart-item-tag" style={{ marginTop: -8 }}>
            {t('DASHBOARD_CPU_UTILIZATION')}
          </span>
        </ChartItem>

        <ChartItem className="temperature-chart">
          <ReactECharts
            style={{
              width: '450px',
              height: '450px',
              transform: `scale(0.45)`,
              left: '-122.5px',
              top: '-140px',
              position: 'absolute',
            }}
            option={getTemperatureDashboardOption(Math.floor(temperature))}
          />
          <span className="chart-item-tag">
            {t('DASHBOARD_CPU_TEMPERATURE')}
          </span>
        </ChartItem>

        <ChartItem>
          <Popover
            content={
              <div>
                <div>
                  {t('DASHBOARD_MEM_TOTAL')}: {(total / 1024).toFixed(1)} GB
                </div>
                <div>
                  {t('DASHBOARD_MEM_USED')}: {(used / 1024).toFixed(1)} GB
                </div>
              </div>
            }
          >
            <Progress
              type="dashboard"
              percent={Math.floor(total === 0 ? 0 : (used / total) * 100)}
              style={{ height: 120, marginTop: -5, transform: `scale(0.95)` }}
            />
            <span className="chart-item-tag" style={{ marginTop: -8 }}>
              {t('DASHBOARD_MEM_UTILIZATION')}
            </span>
          </Popover>
        </ChartItem>

        <ChartItem>
          <LiquidGraph
            width={100}
            height={100}
            percent={Math.floor(storageInfo.percent * 100)}
            text={`${storageInfo.used}G / ${storageInfo.total}G`}
          />
          <span className="chart-item-tag">
            {t('DASHBOARD_STORAGE_UTILIZATION')}
          </span>
        </ChartItem>
      </ChartGrid>
    </ResourceMonitorContainer>
  );
}

export default observer(ResourceMonitor);
