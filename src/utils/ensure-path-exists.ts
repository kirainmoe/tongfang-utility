import { fs, invoke } from '@tauri-apps/api';

export default async function ensurePathExists(path: string) {
  const exists = await invoke('file_exists', {
    path,
  });
  
  if (!exists) {
    await fs.createDir(path);
  }
}
