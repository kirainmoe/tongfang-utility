import store from "stores";
import ensurePathExists from "utils/ensure-path-exists";
import pathJoin from "utils/path-join";
import { removeDir } from "@tauri-apps/api/fs";

export default async function clearLocalDrivers(): Promise<boolean> {
  const basePath = await store.app.getPathConfig();

  const driversPath = pathJoin(basePath.appPath, 'drivers');
  await ensurePathExists(driversPath);

  const wifiDriversPath = pathJoin(driversPath, 'intel-wifi');
  await ensurePathExists(wifiDriversPath);

  const bluetoothDriversPath = pathJoin(driversPath, 'intel-bluetooth');
  await ensurePathExists(bluetoothDriversPath);

  await removeDir(wifiDriversPath, { recursive: true });
  await removeDir(bluetoothDriversPath, { recursive: true });
  await ensurePathExists(wifiDriversPath);
  await ensurePathExists(bluetoothDriversPath);

  return true;
}