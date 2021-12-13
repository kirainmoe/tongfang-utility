import { invoke } from '@tauri-apps/api';

import { BOE_HIDPI_URL, FnDaemonInstallStatus, FN_DAEMON_URL, SLEEP_OPTIMIZE_URL } from 'common/constants';
import { execute } from 'utils/execute';
import { fileExists } from 'utils/file-exists';
import { getKextsList } from 'utils/get-kext-list';

export async function fixSleep() {
  return invoke('macos_sudo_exec', {
    command: `sh -c \\"$(curl -fsSL ${SLEEP_OPTIMIZE_URL})\\"`,
  });
}

export async function checkHiDpiEnabled() {
  return await fileExists(
    '/Library/Displays/Contents/Resources/Overrides/backup'
  );
}

export async function disableHiDpi() {
  return invoke('macos_sudo_exec', {
    command: `echo 2 | sh -c \\"$(curl -fsSL  ${BOE_HIDPI_URL})\\"`,
  });
}

export async function enableHiDpiBoe() {
  return invoke('macos_sudo_exec', {
    command: `echo 1 | sh -c \\"$(curl -fsSL  ${BOE_HIDPI_URL})\\"`,
  });
}

export async function enableHiDpiUniversal() {
  return execute('bash', [
    '-c',
    `osascript -e 'tell application "Terminal" to do script "bash -c \\"$(curl -fsSL https://cdn.jsdelivr.net/gh/xzhih/one-key-hidpi/hidpi.sh)\\""'`,
  ]);
}

export async function clearNvram() {
  return invoke('macos_sudo_exec', {
    command: 'nvram -c',
  });
}

export async function checkTongfangDaemonIsInstalled(): Promise<FnDaemonInstallStatus> {
  const kexts = await getKextsList();
  const hasKext =
    kexts.filter(
      (kext) =>
        kext.name.includes('com.kirainmoe.TongfangEnhancer') ||
        kext.name.includes('VoodooWMI')
    ).length > 0;
  if (!hasKext) {
    return FnDaemonInstallStatus.NO_KEXT_DETECTED;
  }
  const installed = await fileExists('/Library/LaunchAgents/io.github.goshin.and.com.kirainmoe.TongfangEnhancerDaemon.plist');
  return installed ? FnDaemonInstallStatus.INSTALLED : FnDaemonInstallStatus.NOT_INSTALLED;
}

export async function installTongfangDaemon() {
  return invoke('macos_sudo_exec', {
    command: `bash -c \\"curl -fsSL ${FN_DAEMON_URL} | bash\\"`,
  });
}

export async function enrollDeveloperProgram() {
  return invoke('macos_sudo_exec', {
    command: `/System/Library/PrivateFrameworks/Seeding.framework/Versions/A/Resources/seedutil enroll DeveloperSeed && nvram -c`,
  });
}