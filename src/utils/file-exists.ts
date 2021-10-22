import { invoke } from "@tauri-apps/api";

export async function fileExists(path: string) {
  return await invoke('file_exists', {
    path
  });
}