import { invoke } from "@tauri-apps/api";
import { platform } from "@tauri-apps/api/os";
import { Command } from "@tauri-apps/api/shell";
import { message } from "antd";
import ensurePathExists from "./ensure-path-exists";

export interface EfiSystemPartition {
  identifier: string;
  size: string;
  name: string;
}

export async function listEfiSystemPartitions() {
  const os = await platform();
  if (os !== 'macos') {
    return [];
  }
  
  const disklistPayload = await new Promise((resolve) => {
    const disklistCmd = new Command('diskutil', ['list']);
    let payloadData = '';
    disklistCmd.stdout.on('data', (data: string) => payloadData += '\n' + data);

    disklistCmd.on('error', (err) => {
      console.log(err);
      message.error(err);
    });

    disklistCmd.on('close', () => resolve(payloadData));

    disklistCmd.spawn();
  }) as string;

  const efiParts = disklistPayload
    .split('\n')
    .filter((line) => line.includes('EFI'))
    .map((line) =>
      line
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/\s([M|G|B])/g, '$1')
        .split(' ')
    );

  const result = efiParts.map(line => {      
    return {
      name: line.slice(-3, -2).join(),
      size: line.slice(-2, -1).join(),
      identifier: line.slice(-1).join(),
    };
  });

  return result as EfiSystemPartition[];
}

export async function mountEfiSystemPartition(identifier: string, mountPoint: string) {
  try {
    const os = await platform();
    if (os !== 'macos') {
      return false;
    }
    const isMountPointExists = await invoke('file_exists', {
      path: mountPoint,
    });
  
    if (isMountPointExists) {
      const unmountCommand = new Command('diskutil', [
        'umount',
        mountPoint,
      ]);
      await unmountCommand.execute();
    } else {
      await ensurePathExists(mountPoint);
    }
  
    await invoke('macos_sudo_exec', {
      command: `diskutil mount -mountPoint ${mountPoint} /dev/${identifier}`,
    });
    return true;
  } catch(err) {
    console.error(err);
    return false;
  }
}