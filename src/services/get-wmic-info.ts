import { execute } from 'utils/execute';

export async function getWmicInfo() {
  const alternativeCommands = [
    ['cmd.exe',  ['/c', 'wmic', 'csproduct', 'get', 'UUID']],
    ['powershell.exe', ['Get-WmiObject -Class "Win32_ComputerSystemProduct" | Select-Object -Property UUID']],
  ];

  let result: Record<string, null | string> = {
    uuid: null,
  };

  for (const command of alternativeCommands) {
    const [cmd, args] = command;
    const stdout = await execute(cmd as string, args as string[]) as string;
    const parsed = stdout ? stdout.trim().split('\n') : [];
    
    if (parsed.length) {
      result.uuid = parsed[parsed.length - 1].trim();
      break;
    }
  }

  return result;
}
