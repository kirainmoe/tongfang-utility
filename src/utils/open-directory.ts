import { platform } from "@tauri-apps/api/os";
import { Command } from "@tauri-apps/api/shell";

export default async function openDirectory(directory: string) {
  const os = await platform();

  console.log(os, directory);

  if (os === 'macos') {
    const command = new Command(`open`, [directory]);
    await command.spawn();
  }

  if (os === 'windows') {
    const command = new Command(`cmd`, ['/c', 'start', directory]);
    await command.spawn();
  }
}

export const openPage = openDirectory;
