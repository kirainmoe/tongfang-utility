import { fileExists } from "utils/file-exists";
import { invoke } from "@tauri-apps/api/tauri";
import { VOLTAGESHIFT_URL } from "common/constants";

export async function checkVoltageShift() {
  return await fileExists('/usr/local/bin/voltageshift');
}

export async function installVoltageShift() {
  console.log(1);
  await invoke('download_without_progress', {
    url: VOLTAGESHIFT_URL,
    savePath: '/tmp/voltageshift',
  });

  console.log('downloaded');

  await invoke('macos_sudo_exec', {
    command: 'cp /tmp/voltageshift /usr/local/bin/voltageshift && chmod -R 755 /usr/local/bin/voltageshift && rm /tmp/voltageshift',
  });
}

export async function setVoltageShiftParams(
  cpuVolt: number,
  gpuVolt: number,
  cacheVolt: number,
  pl1: number,
  pl2: number,
  turbo: number,
) {
  await invoke('macos_sudo_exec', {
    command: `/usr/local/bin/voltageshift offset ${cpuVolt} ${gpuVolt} ${cacheVolt} && /usr/local/bin/voltageshift power ${pl1}w ${pl2}w && /usr/local/bin/voltageshift turbo ${turbo}`,
  });
}