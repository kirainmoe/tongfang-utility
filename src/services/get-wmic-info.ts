import { execute } from 'utils/execute';

export async function getWmicInfo() {
  const stdout = await execute('cmd.exe', ['/c', 'wmic', 'csproduct', 'get', 'UUID']) as string;
  const parsed = stdout ? stdout.split('\n') : [];
  if (!parsed.length || parsed.length < 4) {
    return {
      uuid: null,
    };
  }
  return {
    uuid: stdout.split('\n')[2].trim(),
  }
}
