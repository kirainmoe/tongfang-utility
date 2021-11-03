import { LogicalSize } from "@tauri-apps/api/window";

export const DEFAULT_WINDOW_SIZE = new LogicalSize(900, 700);

export enum CheckResult {
  PASSING,
  UNKNOWN,
  WARNING,
  FAILED,
  CHECKING,
}

export enum DownloadServer {
  LOCAL = "local",
  EINE = "eine",
  RINCO = "rinco",
}

export const DOWNLOAD_MIRROR_DOMAINS = {
  local: 'http://localhost:9000/',
  rinco: 'https://utility-rinco.kirainmoe.com/',
  eine: 'https://utility-eine.kirainmoe.com:1900/',
};

export enum FnDaemonInstallStatus {
  NO_KEXT_DETECTED,
  NOT_INSTALLED,
  INSTALLED,
}

export const SLEEP_OPTIMIZE_URL = `https://gitee.com/kirainmoe/hasee-tongfang-macos/raw/scripts/sleep.sh`;
export const BOE_HIDPI_URL = `https://gitee.com/kirainmoe/static-files/raw/master/hidpi.sh`;
export const UNIVERSAL_HIDPI_URL = `https://cdn.jsdelivr.net/gh/xzhih/one-key-hidpi/hidpi.sh`;
export const FN_DAEMON_URL = `https://gitee.com/kirainmoe/hasee-tongfang-macos/raw/scripts/install_daemon.sh`;
export const VOLTAGESHIFT_URL = `https://gitee.com/kirainmoe/static-files/raw/master/voltageshift`;
