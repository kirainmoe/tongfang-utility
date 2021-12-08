import { execute } from './execute';

let kextlist: {
  index: string;
  name: string;
  version: string;
  uuid: string;
}[] = [];

export async function getKextsList() {
  if (kextlist.length) {
    return kextlist;
  }
  
  const kexts = (await execute('kextstat')) as string;
  kextlist = kexts
    .split('\n')
    .slice(2)
    .map((str) => {
      const raw = str.replace(/\s+/g, ' ').split(' ');
      return {
        index: raw[1],
        name: raw[6],
        version: raw[7].slice(1, -1),
        uuid: raw[8],
      };
    });
  return kextlist;
}
