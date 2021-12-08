import { CheckResult } from 'common/constants';
import t from 'resources/i18n';
import { WirelessAdapterType } from 'stores/config-store';
import { execute } from 'utils/execute';

export async function checkSolidStateDriveCompatibility() {
  const stdout = (await execute('cmd.exe', [
    '/c',
    'wmic',
    'diskdrive',
    'get',
    'model',
  ])) as string;
  const parsed = stdout ? stdout.split('\n') : [];
  if (!parsed.length) {
    return {
      state: CheckResult.UNKNOWN,
      description: t('COMPAT_CHECK_SSD_UNKNOWN'),
      payload: null,
    };
  }

  let checkResult:  {
    state: CheckResult,
    description: string,
    payload: string | null,
  } = {
    state: CheckResult.PASSING,
    description: t('COMPAT_CHECK_SSD_PASS'),
    payload: null,
  };

  parsed
    .slice(2)
    .map((item) => item.trim())
    .forEach((model) => {
      if (checkResult.state !== CheckResult.PASSING) {
        return;
      }

      if (model.startsWith('MZVLB')) {
        checkResult = {
          state: CheckResult.FAILED,
          description: t('COMPAT_CHECK_SSD_NOT_COMPATIBLE').replace(
            '$1',
            `${t('VENDOR_SAMSUNG')} PM981(a) / PM991`
          ),
          payload: model,
        };
      }

      if (model.startsWith('MTF')) {
        checkResult = {
          state: CheckResult.FAILED,
          description: t('COMPAT_CHECK_SSD_NOT_COMPATIBLE').replace(
            '$1',
            `${t('VENDOR_MICRON')} 2200s`
          ),
          payload: model,
        };
      }

      if (model.startsWith('MZVLW')) {
        checkResult = {
          state: CheckResult.WARNING,
          description: t('COMPAT_CHECK_SSD_UNKNOWN_PROBLEM').replace(
            '$1',
            `${t('VENDOR_SAMSUNG')} PM961`
          ),
          payload: model,
        };
      }

      if (model.startsWith('MZVPW')) {
        checkResult = {
          state: CheckResult.WARNING,
          description: t('COMPAT_CHECK_SSD_UNKNOWN_PROBLEM').replace(
            '$1',
            `${t('VENDOR_SAMSUNG')} SM961`
          ),
          payload: model,
        };
      }

      if (model.includes('EX920')) {
        checkResult = {
          state: CheckResult.WARNING,
          description: t('COMPAT_CHECK_SSD_UNKNOWN_PROBLEM').replace(
            '$1',
            `${t('VENDOR_HP')} EX920`
          ),
          payload: model,
        };
      }

      if (model.includes('HS SSD C2000')) {
        checkResult = {
          state: CheckResult.WARNING,
          description: t('COMPAT_CHECK_SSD_UNKNOWN_PROBLEM').replace(
            '$1',
            `${t('VENDOR_HIVISION')} C2000(L/Pro)`
          ),
          payload: model,
        };
      }

      if (model.includes('970 EVO')) {
        checkResult = {
          state: CheckResult.WARNING,
          description: t('COMPAT_CHECK_SSD_REQUIRE_FIRMWARE_UPDATE').replace(
            '$1',
            `${t('VENDOR_SAMSUNG')} 970 Evo`
          ),
          payload: model,
        };
      }
    });

  return checkResult;
}

export async function checkEfiSystemPartitionSize() {
  const fileSystemStdout = (await execute('cmd', [
    '/c',
    'wmic',
    'volume',
    'get',
    'file system',
  ])) as string;
  const capacityStdout = (await execute('cmd', [
    '/c',
    'wmic',
    'volume',
    'get',
    'capacity',
  ])) as string;

  const fileSystem = fileSystemStdout.split('\n').slice(2).slice(0, -1);
  const capacity = capacityStdout.split('\n').slice(2).slice(0, -1);

  const parts = fileSystem.map((disk, index) => ({
    fs: disk.trim(),
    size: parseInt(capacity[index].trim()),
  }));

  if (!parts) {
    return {
      state: CheckResult.UNKNOWN,
      description: t('COMPAT_CHECK_ESP_UNKNOWN'),
    };
  }

  let fatCount = 0,
    capCount = 0;
  for (const item of parts) {
    if (item.fs === 'FAT' || item.fs === 'FAT32') {
      fatCount++;
      if (item.size / 1024 / 1024 >= 200) capCount++;
    }
  }

  if (fatCount <= 0 || capCount === 0) {
    return {
      state: CheckResult.FAILED,
      description: t('COMPAT_CHECK_NO_ESP'),
    };
  }
  if (fatCount !== capCount) {
    return {
      state: CheckResult.WARNING,
      description: t('COMPAT_CHECK_SOME_ESP_NOT_SATISFIED'),
    };
  }
  return {
    state: CheckResult.PASSING,
    description: t('COMPAT_CHECK_ESP_PASSING'),
  };
}

export async function checkUEFIBootStatus() {
  const stdout = (await execute('powershell', [
    '-c',
    '$env:firmware_type',
  ])) as string;
  const bootMethod = stdout.trim();
  if (bootMethod === 'UEFI') {
    return {
      state: CheckResult.PASSING,
      description: t('COMPAT_CHECK_BOOT_METHOD_UEFI'),
    };
  } else if (bootMethod === 'Legacy') {
    return {
      state: CheckResult.FAILED,
      description: t('COMPAT_CHECK_BOOT_METHOD_LEGACY'),
    };
  } else {
    return {
      state: CheckResult.UNKNOWN,
      description: t('COMPAT_CHECK_BOOT_METHOD_UNKNOWN'),
    };
  }
}

export async function checkDeviceBareboneModel() {
  const serial = (
    (await execute('cmd', [
      '/c',
      'wmic',
      'bios',
      'get',
      'serialnumber',
    ])) as string
  )
    .split('\n')
    .slice(1)[1]
    .trim();

  if (!serial) {
    return {
      state: CheckResult.UNKNOWN,
      description: t('COMPAT_CHECK_BAREBONE_UNKNOWN'),
    };
  }
  if (
    serial.startsWith('GK') ||
    serial.startsWith('GJ') ||
    serial.startsWith('GI') ||
    serial.startsWith('42')
  ) {
    return {
      state: CheckResult.PASSING,
      description: t('COMPAT_CHECK_BAREBONE_IS_TONGFANG'),
    };
  }
  if (serial.startsWith('C02')) {
    return {
      state: CheckResult.UNKNOWN,
      description: t('COMPAT_CHECK_USING_OPENCORE'),
    };
  }
  return {
    state: CheckResult.WARNING,
    description: t('COMPAT_CHECK_BAREBONE_OTHER'),
  };
}

export async function checkWirelessNicCompatibility() {
  const stdout = await execute('cmd', ['/c', 'wmic', 'nicconfig', 'get', 'caption']) as string;
  const nics = stdout.split('\n').slice(2).map(item => item.trim());

  for (const caption of nics) {
    if (caption.includes('Intel')) {
      return {
        state: CheckResult.PASSING,
        description: t('COMPAT_CHECK_WIRELESS_INTEL'),
        payload: WirelessAdapterType.Intel,
      };
    }

    if (caption.includes('Broadcom')) {
      return {
        state: CheckResult.PASSING,
        description: t('COMPAT_CHECK_WIRELESS_APPLE'),
        payload: WirelessAdapterType.Apple,
      };
    }

    if (caption.includes('Dell')) {
      if (caption.includes('1820A')) {
        return {
          state: CheckResult.WARNING,
          description: t('COMPAT_CHECK_WIRELESS_1820A'),
          payload: WirelessAdapterType.Broadcom,
        };
      }
      return {
        state: CheckResult.PASSING,
        description: t('COMPAT_CHECK_WIRELESS_DELL'),
        payload: null,
      };
    }
  }

  return {
    state: CheckResult.FAILED,
    description: t('COMPAT_CHECK_WIRELESS_NOT_COMPATIBLE'),
  };
}
