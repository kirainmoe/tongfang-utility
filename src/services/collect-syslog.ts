import moment from "moment";
import { execute } from "utils/execute";
import { getSMBIOSInfo } from './get-smbios-info';
import { invoke } from "@tauri-apps/api/tauri";
import { writeFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import store from "stores";

export async function collectSysLog() {
  const collectTime = moment().format("YYYY_MM_DD_HH_mm_ss");
  const logPath = '/tmp/tfu_log';
  const { config } = store;

  try {
    console.log('[log] creating log directory.');
    await execute(`mkdir`, ['-p', logPath]);

    console.log('[log] collecting dmesg...');
    await invoke('macos_sudo_exec', {
      command: `dmesg > ${logPath}/`,
    });
  
    console.log('[log] collecting system profile...');
    await execute('sh', ['-c', `system_profiler > ${logPath}/system_profile`]);
    await execute('sh', ['-c', `sw_vers > ${logPath}/sw_vers`]);

    console.log('[log] collecting kext list...');
    await execute('sh', ['-c', `kextstat > ${logPath}/kextstat`]);

    console.log('[log] collecting ioreg...');
    await execute('sh', ['-c', `ioreg -l > ${logPath}/ioreg`]);

    console.log('[log] collecting log...');
    await execute('sh', ['-c', `log show --last 1h > ${logPath}/log_last_1h`]);

    console.log('[log] collecting pmset log...');
    await execute('sh', ['-c', `pmset -g > ${logPath}/pmset`]);

    console.log('[log] collecting nvram...');
    await execute('sh', ['-c', `nvram -p > ${logPath}/nvram`]);

    console.log('[log] collecting last generate config...');
    await writeFile({
      path: `${logPath}/generate_config.json`,
      contents: JSON.stringify(config.freezeConfig(), null, 4),
    });

    console.log('[log] collecting smbios info...');
    const smbios = await getSMBIOSInfo();
    await writeFile({
      path: `${logPath}/smbios.json`,
      contents: JSON.stringify(smbios, null, 4),
    });

    console.log('[log] collecting current process...');
    await execute('sh', ['-c', `ps -el > ${logPath}/process`]);

    console.log('[log] packaging files...');
    const desktopPath = await desktopDir();
    const filename = `${desktopPath}/log_${collectTime}.tar.gz`;
    await execute('sh', ['-c', `tar -zcvf ${filename} ${logPath}`]);

    console.log('[log] clean up...');
    await execute('sh', ['-c', `rm -rf ${logPath}`]);

    return filename;
  } catch(err) {
    console.log(err);
    return false;
  }
}