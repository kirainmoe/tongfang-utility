import { execute } from "./execute"

export async function getKextsList() {
  const kexts = await execute('kextstat') as string;
  return kexts.split('\n').slice(2).map((str) => {
    const raw = str.replace(/\s+/g, ' ').split(' ');
    return {
      index: raw[1],
      name: raw[6],
      version: raw[7].slice(1, -1),
      uuid: raw[8],
    };
  });
}