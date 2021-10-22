import { FileEntry, readDir } from "@tauri-apps/api/fs";

import store from "stores";

import { DriverList, DriverPayload, DriverReleaseType } from "types/drivers";

import ensurePathExists from "utils/ensure-path-exists";
import pathJoin from "utils/path-join";

export default async function getLocalDrivers(): Promise<DriverList> {
  const basePath = await store.app.getPathConfig();

  const driversPath = pathJoin(basePath.appPath, 'drivers');
  await ensurePathExists(driversPath);

  const wifiDriversPath = pathJoin(driversPath, 'intel-wifi');
  await ensurePathExists(wifiDriversPath);

  const bluetoothDriversPath = pathJoin(driversPath, 'intel-bluetooth');
  await ensurePathExists(bluetoothDriversPath);

  const parseDirectory = (
    name: string,
    entries: FileEntry[]
  ): (DriverPayload | null)[] =>
    entries
      .map((entry) => {
        if (entry.children === undefined) return null;
        const segments = entry.name!.split('-');
        if (segments.length !== 3) return null;
        return {
          name,
          version: segments[0],
          build: segments[1],
          type:
            segments[2] === 'dev'
              ? DriverReleaseType.DEV
              : DriverReleaseType.STABLE,
          kexts: [],
          release_date: new Date(),
        };
      })
      .filter((item) => item !== null);

  const wifiDrivers = parseDirectory('intel-wifi', await readDir(wifiDriversPath));
  const bluetoothDriver  = parseDirectory('intel-bluetooth', await readDir(bluetoothDriversPath));

  return {
    wifi: wifiDrivers as DriverPayload[],
    bluetooth: bluetoothDriver as DriverPayload[],
  };
}
