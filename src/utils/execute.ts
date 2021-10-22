import { Command } from "@tauri-apps/api/shell";

export async function execute(cmd: string, args: string[] = []) {
  const command = new Command(cmd, args);

  const stdout = await new Promise((resolve) => {
    let stdout = '';
    command.stdout.on('data', data => stdout += `\n${data}`);
    command.on('close', () => resolve(stdout));
    command.execute();
  });

  return stdout;
}