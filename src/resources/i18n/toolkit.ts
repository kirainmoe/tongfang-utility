export const toolkitTranslation = {
  TOOLKIT_TITLE: ['工具箱', 'Toolkit'],
  TOOLKIT_PRIVILEGE_REQUIRED: [
    '提示：部分操作将需要管理员权限。', 
    'Tips: some operation may require administration privilege.'
  ],

  TOOLKIT_FIX_SLEEP: ['调节睡眠参数', 'Fix Sleep'],
  TOOLKIT_FIX_SLEEP_DESCRIPTION: [
    '调节睡眠参数，修复睡眠睡死、自动唤醒等问题。',
    'Set sleep / hibernate parameters to fix sleep problems.'
  ],
  
  TOOLKIT_TOGGLE_HIDPI: ['启用/禁用 HiDPI',  'Enable/Disable HiDPI'],
  TOOLKIT_TOGGLE_HIDPI_DESCRIPTION: [
    '在笔记本内建屏幕中启用缩放 (HiDPI) 功能，降低可视分辨率使得文字渲染更清晰。',
    'Enable HiDPI to make font rendering clearer.',
  ],
  TOOLKIT_HIDPI_SURE_DISBLE: [
    '检测到当前系统已经启用了 HiDPI，继续操作将关闭 HiDPI 并恢复到原先的状态。请确认是否要关闭 HiDPI？',
    'Detected that you have already enabled HiDPI, this operation will remove the HiDPI config and restore the initial state. Do you want to disable HiDPI?'
  ],
  TOOLKIT_HIDPI_USE_BOE: [
    '你想启用京东方屏幕专用的 HiDPI 吗？\n选择确定以使用京东方屏幕专用的 HiDPI 方案；选择取消以使用通用的方案。',
    "Is the vendor of your laptop monitor BOE? Click `Cancel` if isn't (or you don't know).",
  ],
  TOOLKIT_HIDPI_OPERATION_REQUIRED: ['需要操作', 'Need Further Actions'],
  TOOLKIT_HIDPI_OPERATION_DESCRIPTION: [
    '请在弹出的终端窗口中按照提示操作。',
    'Please follow the prompts in the terminal window.',
  ],
  
  TOOLKIT_CLEAR_NVRAM: ['重置 NVRAM', 'Clear NVRAM'],
  TOOLKIT_CLEAR_NVRAM_DESCRIPTION: [
    '重置 NVRAM 解决更新等操作残留的变量，导致某些信息显示错误。',
    'Reset NVRAM to deprecate outdated variable.'
  ],

  TOOLKIT_INSTALL_FN_DAEMON: ['安装快捷键守护程序', 'Install Fn Daemon'],
  TOOLKIT_INSTALL_FN_DAEMON_DESCRIPTION: [
    '安装同方 Fn 快捷键守护程序，以使 Fn 快捷键和双击开关触摸板功能正常使用 (FnDaemon 由 @Goshin 编写)。',
    'Install Tongfang Fn Daemon to make Fn key and double-click toggle touchpad work (Credit: @Goshin).',
  ],
  TOOLKIT_FN_DAEMON_NO_KEXT_DETECTED: [
    '未检测到 TongfangKeyboardUtility 或 VoodooWMI，无法安装 TongfangFnDaemon.',
    'Both TongfangKeyboardUtility and VoodooWMI are not present. Can not install TongfangFnDaemon.'
  ],
  TOOLKIT_FN_DAEMON_NOT_INSTALLED: ['(状态：未安装)', '(status: not installed)'],
  TOOLKIT_FN_DAEMON_INSTALLED: ['(状态: 已安装)', '(status: installed)'],
  TOOLKIT_DOWNLOAD_HELIPORT: ['下载 HeliPort', 'Download HeliPort'],
  TOOLKIT_DOWNLOAD_HELIPORT_DESCRIPTION: [
    '下载 Intel 无线网卡联网管理客户端 (请先使用有线或 USB 共享等方式联网)。',
    'Download Intel Wi-Fi manager app HeliPort for macOS.',
  ],
  TOOLKIT_ENROLL_SEED_PROGRAM: ['加入开发者种子计划', 'Enroll Developer Seed Program'],
  TOOLKIT_ENROLL_SEED_PROGRAM_DESCRIPTION: [
    '一键注册 Apple 开发者种子计划，以便能够提前获取到测试版系统更新。',
    'Enroll Apple Developer Seed Program to get the latest update of macOS beta.'
  ],
  TOOLKIT_PERFORMING: ['操作进行中...', 'Performing action...'],
};

export default toolkitTranslation;
