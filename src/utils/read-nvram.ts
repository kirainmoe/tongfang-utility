import { Command } from '@tauri-apps/api/shell';

export default async function readNVRAM(key: string): Promise<string | null> {
  const nvramCommand = new Command('nvram', ['-p']);
  const stdout = (await new Promise((resolve) => {
    let stdout = '';
    nvramCommand.stdout.on('data', (data) => (stdout += `\n${data}`));
    nvramCommand.on('close', () => resolve(stdout));
    nvramCommand.execute();
  })) as string;

  const lines = stdout.split('\n').filter((line) => line.startsWith(key));
  if (!lines.length) {
    return null;
  }

  return lines[0].split('\t')[1].trim().replace(/%00/g, '');
}
