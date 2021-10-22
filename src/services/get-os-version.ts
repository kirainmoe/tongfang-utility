import { execute } from 'utils/execute';

export async function getMacOSVersion() {
  const version = (
    (await execute(`sh`, [
      '-c',
      "sw_vers | grep ProductVersion | cut -d ':' -f 2",
    ])) as string
  ).trim();
  const build = (
    (await execute('sh', [
      '-c',
      "sw_vers | grep BuildVersion | cut -d ':' -f 2",
    ])) as string
  ).trim();

  return {
    version,
    build,
  };
}
