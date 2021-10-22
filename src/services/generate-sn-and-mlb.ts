import { invoke } from '@tauri-apps/api';

export async function generateSNAndMLB(modelIndex: number = 42) {
  const payload = await invoke('generate_sn_mlb', {
    modelIndex,
  }).then((result: any) => {
    const sn = result.serial_number
      .filter((item: number) => item !== 0)
      .map((item: number) => String.fromCharCode(item))
      .join('');

    const mlb = result.mlb
      .filter((item: number) => item !== 0)
      .map((item: number) => String.fromCharCode(item))
      .join('');
      
    return {
      sn,
      mlb,
    };
  });

  return payload;
}
