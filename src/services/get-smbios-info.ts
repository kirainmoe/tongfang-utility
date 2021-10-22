import { invoke } from "@tauri-apps/api";
import { platform } from "@tauri-apps/api/os";

export async function getSMBIOSInfo() {
  const osType = await platform();
  if (osType !== 'macos') {
    return null;
  }
  const payload:{ [key: string]: string } = await invoke('get_smbios');
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      payload[key] = payload[key].replace(/\0/g, '');
    }
  }
  return payload;
}