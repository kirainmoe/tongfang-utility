const compatCheckTranslations = {
  COMPAT_CHECK_TITLE: ['兼容性检查', 'Compatibility Check'],
  COMPAT_CHECK_DESCRIPTION: ['检测在这台电脑上是否能正常安装 macOS.', 'Examine whether this computer works well with macOS.'],
  COMPAT_CHECK_RESULT_PASSING: ['通过', 'Passed'],
  COMPAT_CHECK_RESULT_FAILED: ['不通过', 'Failed'],
  COMPAT_CHECK_RESULT_UNKNOWN: ['未知', 'Unknown'],
  COMPAT_CHECK_RESULT_WARNING: ['警告', 'Warning'],
  COMPAT_CHECK_RESULT_CHECKING: ['检测中...', 'Checking...'],

  COMPAT_CHECK_SSD_MODEL: ['固态硬盘型号', 'SSD Model'],
  COMPAT_CHECK_SSD_PASS: [
    '此电脑上的所有硬盘都可以正常安装和使用各版本 macOS 系统。',
    'All Solid State Drives installed on this computer are compatible with macOS.',
  ],
  COMPAT_CHECK_SSD_NOT_COMPATIBLE: [
    '检测到此电脑上安装了型号为 $1 的固态硬盘，此硬盘无法正常安装 macOS, 你需要在生成配置文件时将其屏蔽，或将硬盘取下后再安装 macOS 到其它硬盘。',
    'Detected that this computer has $1 solid state drive which is known to be incompatible with macOS. Either disable it when generating config or unplug it to install macOS.',
  ],
  COMPAT_CHECK_SSD_REQUIRE_FIRMWARE_UPDATE: [
    '检测到此电脑上安装了型号为 $1 的固态硬盘，该硬盘可能需要更新固件后，才能正常安装 macOS.',
    'Detected that this computer has $1 solid state drive which may require a firmware update to install macOS. Please ensure that your SSD has the latest firmware.',
  ],
  COMPAT_CHECK_SSD_UNKNOWN_PROBLEM: [
    '检测到此电脑上安装了型号为 $1 的固态硬盘，该硬盘可以正常安装 macOS 系统，但在使用过程中可能会遇到部分未知的问题。',
    'Detected thata this computer has $1 solid state drive which can install macOS, but there is some probability to encounter unknown problems.',
  ],
  COMPAT_CHECK_SSD_UNKNOWN: ['无法检测硬盘信息。', 'Cannot read harddisk info.'],

  COMPAT_CHECK_ESP: ['ESP 分区大小', 'ESP Size'],
  COMPAT_CHECK_ESP_UNKNOWN: ['无法检测 ESP 分区信息。', 'Cannot read ESP capacity info.'],
  COMPAT_CHECK_NO_ESP: [
    '此电脑上没有找到任何容量 >= 200M 的 EFI 系统分区。若要安装 macOS, 必须调整或重建一个>= 200M 的 EFI 系统分区。',
    'No satisfied EFI System Partition was found on this computer. Installing macOS requires at least one ESP with capacity >= 200MB.',
  ],
  COMPAT_CHECK_SOME_ESP_NOT_SATISFIED: [
    '此电脑上有部分硬盘没有 EFI 系统分区，或 EFI 系统分区小于 200MB, 你将无法在这些硬盘上安装 macOS',
    'Some EFI System Partition on the disk is smaller than 200MB. You will be not able to install macOS on these disk.',
  ],
  COMPAT_CHECK_ESP_PASSING: [
    '这台电脑上所有硬盘的 ESP 分区均大于 200MB, 可以正常安装 macOS.',
    'All EFI System Partition on this computer is larger than 200MB.',
  ],

  COMPAT_CHECK_BOOT_METHOD: ['系统引导状态', 'Boot Method'],
  COMPAT_CHECK_BOOT_METHOD_UEFI: ['此电脑正在使用 UEFI 模式引导 Windows.', 'This computer is using UEFI.'],
  COMPAT_CHECK_BOOT_METHOD_LEGACY: [
    '此电脑正在使用传统模式 (Legacy BIOS) 引导 Windows. 你需要在 UEFI 引导模式下安装 macOS 或使用双系统。',
    'This computer is booted with Legacy BIOS mode. You need UEFI mode to install macOS and dual-boot Windows.',
  ],
  COMPAT_CHECK_BOOT_METHOD_UNKNOWN: ['无法获取系统引导模式。', 'Cannot read current firmware type.'],

  COMPAT_CHECK_BAREBONE_MODEL: ['设备模具型号', 'Barebone Model'],
  COMPAT_CHECK_BAREBONE_UNKNOWN: ['无法读取或推断设备模具型号。', 'Cannot read and infer device barebone model.'],
  COMPAT_CHECK_BAREBONE_IS_TONGFANG: ['此电脑为同方机型，可以正常使用 App 提供的 EFI 安装 macOS.', 'This device is based on Tongfang barebone, and can install macOS with the EFI config provided by Utility.'],
  COMPAT_CHECK_USING_OPENCORE: ['此电脑正在使用 OpenCore 引导 Windows, 无法确定真实机型。', 'Windows is booted with OpenCore, real hardware info was hidden.'],
  COMPAT_CHECK_BAREBONE_OTHER: ['此电脑似乎不是同方机型，或不在 App 的支持列表中。请确认您的机型模具制造商。', 'This device seems not to be a Tongfang device.'],

  COMPAT_CHECK_WIRELESS_CARD: ['无线网卡', 'Wireless NIC'],
  COMPAT_CHECK_WIRELESS_INTEL: [
    '在此电脑上检测到了 Intel 无线网卡，你需要使用 itlwm 或 AirportItlwm 驱动以在 macOS 下使用 Wi-Fi.',
    'An Intel wireless NIC is detected. You will need itlwm or AirportItlwm to use Wi-Fi on macOS.',
  ],
  COMPAT_CHECK_WIRELESS_APPLE: [
    '在此电脑上检测到了 Apple & Broadcom 免驱网卡。',
    'An Broadcom & Apple wireless NIC is detected.',
  ],
  COMPAT_CHECK_WIRELESS_DELL: [
    '在此电脑上检测到了 Dell Wireless 无线网卡，该设备需要注入博通网卡、蓝牙驱动方可正常使用。',
    'An Dell Wiress NIC is deteted. You will need additional kexts to drive them.',
  ],
  COMPAT_CHECK_WIRELESS_1820A: [
    '在此电脑上检测到了 DW1820A 无线网卡，该设备有部分型号可能与同方机型不兼容；需要注入博通网卡、蓝牙驱动才能正常使用。',
    'An Dell Wireless 1820A is deteced. This wireless NIC is known to be incompatible with Tongfang barebone. You will need additional kexts to drive them.'
  ],
  COMPAT_CHECK_WIRELESS_NOT_COMPATIBLE: [
    '未检测到 macOS 下可驱动的无线网卡。',
    'No working wireless NIC is detected.',
  ],

  COMPAT_CHECK_RESULT_STATEMENT: [
    'Tips: 检查结果仅供解决问题的参考，不代表此电脑一定能（或一定不能）安装 macOS. 请优先解决检测不通过的子项。',
    'Tips: This result is only for reference. It isn\'t asserting that your computer is able (or not able) to install macOS.',
  ],

  VENDOR_SAMSUNG: ['三星', 'Samsung'],
  VENDOR_HYNIX: ['海力士', 'Hynix'],
  VENDOR_MICRON: ['镁光', 'Micron'],
  VENDOR_HIVISION: ['海康威视', 'Hivision'],
  VENDOR_HP: ['惠普', 'HP'],
};

export default compatCheckTranslations;
