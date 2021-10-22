import { invoke } from "@tauri-apps/api";
import { readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";

export async function resizeImage(path: string, target: string, width: number = 1920, height: number = 1080) {
  if (!path.endsWith('.png')) {
    return false;
  }

  const image = await readBinaryFile(path);

  const result = await invoke('resize_png', {
    input: image,
    filterType: 4,
    width,
    height,
  });

  await writeBinaryFile({
    path: target,
    contents: new Uint8Array(result as number[]),
  });

  return true;
}