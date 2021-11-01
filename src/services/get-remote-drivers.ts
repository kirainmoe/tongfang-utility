import { DriverList, DriverReleaseType } from "types/drivers";

export default function getRemoteDrivers(): Promise<DriverList> {
  return new Promise((resolve) => {
    resolve({
      wifi: [
        {
          name: 'intel-wifi',
          version: '2.1.0',
          build: '3aab4a6',
          type: DriverReleaseType.DEV,
          kexts: [
            {
              name: 'AirportItlwm.kext',
              os: 'mojave',
              download_url: 'https://github.com/OpenIntelWireless/itlwm/releases/download/v2.1.0-alpha/AirportItlwm-Mojave-v2.1.0-DEBUG-alpha-3aab4a6.zip',
            },
            {
              name: 'AirportItlwm.kext',
              os: 'catalina',
              download_url: 'https://github.com/OpenIntelWireless/itlwm/releases/download/v2.1.0-alpha/AirportItlwm-Catalina-v2.1.0-DEBUG-alpha-3aab4a6.zip',
            },
            {
              name: 'AirportItlwm.kext',
              os: 'bigsur',
              download_url: 'https://github.com/OpenIntelWireless/itlwm/releases/download/v2.1.0-alpha/AirportItlwm-Big_Sur-v2.1.0-DEBUG-alpha-3aab4a6.zip',
            },
            {
              name: 'AirportItlwm.kext',
              os: 'monterey',
              download_url: 'https://github.com/OpenIntelWireless/itlwm/releases/download/v2.1.0-alpha/AirportItlwm-Monterey-v2.1.0-DEBUG-alpha-3aab4a6.zip',
            },
            {
              name: 'itlwm.kext',
              os: 'general',
              download_url: 'https://github.com/OpenIntelWireless/itlwm/releases/download/v2.1.0-alpha/itlwm-v2.1.0-DEBUG-alpha-3aab4a6.zip',
            }
          ],
          release_date: new Date(),
        }
      ],
      bluetooth: [
        {
          name: 'intel-bluetooth',
          version: '2.0.1',
          build: '9b44388',
          type: DriverReleaseType.STABLE,
          kexts: [
            {
              name: 'IntelBluetoothFirmware.kext',
              os: 'general',
              download_url: 'https://github.com/OpenIntelWireless/IntelBluetoothFirmware/releases/download/v2.0.1/IntelBluetoothFirmware-v2.0.1.zip',
            },
          ],
          release_date: new Date(),
        }
      ],
    });
  });
}