import { platform } from "@tauri-apps/api/os";
import { Command } from "@tauri-apps/api/shell";

export default async function openDirectory(directory: string) {
  const os = await platform();

  if (os === 'macos') {
    const command = new Command(`open`, [directory]);
    await command.spawn();
  }
}

export const openPage = openDirectory;
