import { FanControlMode, FAN_CONFIG_PATH } from 'common/constants';
import { fileExists } from 'utils/file-exists';
import { readTextFile, writeFile } from '@tauri-apps/api/fs';
import { invoke } from '@tauri-apps/api/tauri';

export interface FanControlCurveItem {
  temperature: number;
  mode: FanControlMode;
  level: number;
  key: number;
}

export function getDefaultFanControlCurveConfig(): FanControlCurveItem[] {
  return [
    {
      temperature: 0,
      level: 0,
      mode: FanControlMode.MANUAL,
    },
    {
      temperature: 50,
      level: 1,
      mode: FanControlMode.MANUAL,
    },
    {
      temperature: 65,
      level: 2,
      mode: FanControlMode.MANUAL,
    },
    {
      temperature: 75,
      level: 3,
      mode: FanControlMode.MANUAL,
    },
    {
      temperature: 80,
      level: 4,
      mode: FanControlMode.MANUAL,
    },
    {
      temperature: 85,
      level: 5,
      mode: FanControlMode.MANUAL,
    },
    {
      temperature: 90,
      level: 0,
      mode: FanControlMode.BOOST,
    },
  ].map((item, index) => ({
    ...item,
    key: index,
  }));
}

export async function readFanControlCurveConfig(): Promise<
  FanControlCurveItem[]
> {
  const isConfigExists = await fileExists(FAN_CONFIG_PATH);
  const defaultConfig = getDefaultFanControlCurveConfig();
  if (!isConfigExists) {
    return defaultConfig;
  }
  const content = await readTextFile(FAN_CONFIG_PATH);
  const items = content.split('\n').map((line) => {
    const [temperature, level, mode] = line
      .split(' ')
      .map((item) => Number(item));
    return {
      temperature,
      level,
      mode,
    };
  }) as FanControlCurveItem[];
  if (!items.length) {
    return defaultConfig;
  }
  return items.map((item, id) => ({
    ...item,
    key: id,
  }));
}

export async function writeFanControlCurveConfig(
  config: FanControlCurveItem[]
) {
  const isConfigExists = await fileExists(FAN_CONFIG_PATH);
  if (!isConfigExists) {
    await invoke('macos_sudo_exec', {
      command: `touch ${FAN_CONFIG_PATH} && chmod -R 777 ${FAN_CONFIG_PATH}`,
    });
  }
  const writeString = config
    .map((item) => `${Math.round(item.temperature)} ${item.level} ${item.mode}`)
    .join('\n');

  await writeFile({
    path: FAN_CONFIG_PATH,
    contents: writeString,
  });
}
