import { LogicalSize } from '@tauri-apps/api/window';

export const DEFAULT_WINDOW_SIZE = new LogicalSize(900, 700);

export enum CheckResult {
  PASSING,
  UNKNOWN,
  WARNING,
  FAILED,
  CHECKING,
}

export enum DownloadServer {
  LOCAL = 'local',
  EINE = 'eine',
  RINCO = 'rinco',
  AKANE = 'akane',
}

export const MIRROR_SERVER_DOMAINS = {
  local: 'http://localhost:9000/',
  rinco: 'https://utility-rinco.kirainmoe.com:30000/',
  eine: 'http://106.52.9.48:1901/',
  akane: 'http://utility-akane.kirainmoe.com/',
};

export const MIRROR_NAMES = [
  'akane',
  'rinco',
  'eine',
  process.env.NODE_ENV === 'development' ? 'local' : '',
].filter((x) => x.length > 0) as DownloadServer[];

export const MIRROR_SERVER_NAME = {
  local: '💻 Local (Dev)',
  akane: '🍷 Akane (Cloudflare)',
  eine: '🎩 Eine (Tencent Cloud)',
  rinco: '🍁 Rinco (RingNet)',
};

export enum FnDaemonInstallStatus {
  NO_KEXT_DETECTED,
  NOT_INSTALLED,
  INSTALLED,
}

export enum FanControlMode {
  NORMAL,
  BOOST,
  MANUAL,
  INTELLIGENT,
}

export const FanControlModeStringMap = {
  [FanControlMode.NORMAL]: 'FAN_CONTROL_MODE_NORMAL',
  [FanControlMode.INTELLIGENT]: 'FAN_CONTROL_MODE_INTELLIGENT',
  [FanControlMode.MANUAL]: 'FAN_CONTROL_MODE_MANUAL',
  [FanControlMode.BOOST]: 'FAN_CONTROL_MODE_BOOST',
};

export const SLEEP_OPTIMIZE_URL = `https://gitee.com/kirainmoe/hasee-tongfang-macos/raw/scripts/sleep.sh`;
export const BOE_HIDPI_URL = `https://gitee.com/kirainmoe/static-files/raw/master/hidpi.sh`;
export const UNIVERSAL_HIDPI_URL = `https://cdn.jsdelivr.net/gh/xzhih/one-key-hidpi/hidpi.sh`;
export const FN_DAEMON_URL = `https://gitee.com/kirainmoe/static-files/raw/master/enhancer/install_daemon.sh`;
export const VOLTAGESHIFT_URL = `https://gitee.com/kirainmoe/static-files/raw/master/voltageshift`;
export const SENTRY_TRACKING_URL = `https://4a42e7a4aa624865b97fff6c3ba0c93f@sentry.kirainmoe.com/2`;

export const FAN_CONFIG_PATH = '/usr/local/etc/fan.config';
