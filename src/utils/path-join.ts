import { sep } from "@tauri-apps/api/path";

export default function pathJoin(...args: string[]) {
  return args.reduce((a, b) => a.endsWith(sep) ? `${a}${b}` : `${a}${sep}${b}`);
}