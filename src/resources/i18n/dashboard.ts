const dashboardTranslations = {
  DASHBOARD_PAGE_TITLE: ['仪表盘', 'Dashboard'],
  DASHBOARD_DEVICE_INFO: ['设备概览', 'Device Info'],
  DASHBOARD_DEVICE_NAME: ['设备名称', 'Device Name'],
  DASHBOARD_SMBIOS_MODEL: ['SMBIOS 型号', 'SMBIOS Model'],
  DASHBOARD_REAL_DEVICE_MODEL: ['真实设备型号', 'Real Model'],
  DASHBOARD_MACOS_VERSION: ['系统版本', 'macOS Version'],
  DASHBOARD_PROCESSOR_MODEL: ['CPU', 'CPU'],
  DASHBOARD_GRAPHICS_MODEL: ['图形卡', 'Graphics'],
  DASHBOARD_MAIN_DISK: ['主硬盘', 'Disk'],
  DASHBOARD_RESOURCE_MONITOR: ['资源监视', 'Resource Monitor'],
  DASHBOARD_BATTERY_REMAIN: ['电池', 'Battery'],
  DASHBOARD_BATTERY_CHARGING: ['(正在充电)', '(Charging)'],
  DASHBOARD_BATTERY_NOT_INSTALLED: ['(未安装)', '(Not Installed)'],
  DASHBOARD_BATTERY_DESIGNED_CAPACITY: ['设计容量', 'Designed Capacity'],
  DASHBOARD_BATTERY_MAX_CAPACITY: ['最大容量', 'Max Capacity'],
  DASHBOARD_BATTERY_CURRENT_CAPACITY: ['当前容量', 'Current Capacity'],
  DASHBOARD_STORAGE_UTILIZATION: ['存储用量', 'Disk Utilization'],
  DASHBOARD_CPU_TEMPERATURE: ['核心温度', 'Temperature'],
  DASHBOARD_CPU_UTILIZATION: ['CPU 利用率', 'CPU Utilization'],
  DASHBOARD_MEM_UTILIZATION: ['内存利用率', 'Memory Utilization'],
  DASHBOARD_MEM_TOTAL: ['已安装内存', 'Total Memory'],
  DASHBOARD_MEM_USED: ['已使用内存', 'Used Memory'],
  DASHBOARD_POWER_MODE: ['电源模式', 'Power Mode'],
  DASHBOARD_POWER_SAVE: ['节能模式', 'Power-save Mode'],
  DASHBOARD_POWER_SAVE_DESCRIPTION: [
    '限制核心电压与功耗墙，降低耗电量。',
    'Reduce power consumption by limiting core voltage.',
  ],
  DASHBOARD_BALANCED_MODE: ['均衡模式', 'Balanced Mode'],
  DASHBOARD_BALANCED_MODE_DESCRIPTION: [
    '使用系统默认设置，平衡性能与功耗',
    'Use default system setting to balance performance and power consuption.',
  ],
  DASHBOARD_PERFORMANCE_MODE: ['性能模式', 'Performance Mode'],
  DASHBOARD_PERFORMANCE_MODE_DESCRIPTION: [
    '解锁更高的 TDP 功耗限制，提供最佳性能。',
    'Unlock the PL1/2 to get the best performance.',
  ],
  DASHBOARD_PERFORMANCE_INSTALL_ADDITIONAL: [
    '安装附加工具',
    'Install Additional Tool',
  ],
  DASHBOARD_PERFORMANCE_NEED_VOLTAGESHIFT: [
    '需要安装 VoltageShift 工具才可以使用电源模式调节功能，是否立刻安装？',
    'To switch power mode, VoltageShift is required. Install now?',
  ],

  DASHBOARD_PERFORMANCE_VOLTAGESHIFT_INSTALL_SUCCESS: [
    '成功安装 VoltageShift 电源管理工具.',
    'VoltageShift installed successfully.',
  ],
  DASHBOARD_PERFORMANCE_VOLTAGESHIFT_INSTALL_FAILED: [
    'VoltageShift 未安装。',
    'VoltageShift not installed.',
  ],
  DASHBOARD_PERFORMACE_MODE_SWITCHED_SUCCESSFULLY: [
    '电源模式切换成功！',
    'Power mode switched successfully.',
  ],
  DASHBOARD_PERFORMACE_MODE_SWITCHED_FAILED: [
    '电源模式切换失败！',
    'Power mode switched failed.',
  ],
  DASHBOARD_PERFORMACE_NO_KEXT: [
    '辅助 Kext 未加载，无法使用模式切换功能 (提示：请确认是否正在使用 Tongfang Utility 生成的 EFI)。',
    'Assistant kext is not loaded. Power mode switcher is not available.',
  ],
};

export default dashboardTranslations;
