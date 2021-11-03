const settingTranslations = {
  SETTING_TITLE: ['偏好设置', 'Preferences'],
  SETTING_COMMON: ['常规设置', 'Common'],
  SETTING_DOWNLOAD: ['下载设置', 'Download'],
  SETTING_PATH: ['路径设置', 'Paths'],
  SETTING_PATH_DESCRIPTION: [
    '如果你遇到无法下载配置文件 / 驱动，或下载时进度条走不动的问题，请尝试选择其它下载路径。',
    'If you have trouble download config / drivers, try to specify another download path.',
  ],
  SETTING_CONFIG_DONWLOAD_PATH: ['配置文件下载位置', 'EFI Download Path'],
  SETTING_CONFIG_DOWNLOAD_PATH_DEFAULT: ['默认会将配置文件 (EFI) 下载到桌面。', 'Default download path is ~/Desktop.'],
  SETTING_APP_PATH: ['应用目录位置', 'App Path'],
  SETTING_APP_PATH_DEFAULT: [
    '默认应用目录为用户目录下的 .tfu 文件夹，用于下载驱动等。请不要设置为桌面或其它含有重要文件的目录。',
    'Default app path is ~/.tfu. Do not set it to any directory containing important files.',
  ],
  SETTING_LANGUAGE: ['语言设置', 'Language'],
  SETTING_MIRROR: ['服务器镜像设置', 'Server Mirror'],
  SETTING_CHOOSE_OTHER_PATH: ['选择其它路径', 'Choose other path'],
  SETTING_RESTORE_DEFAULT_PATH: ['恢复默认值', 'Restore default path'],
  SETTING_APPLY: ['应用设置', 'Apply'],
  SETTING_APPLIED: ['设置应用成功！', 'Preference settings applied.'],
};

export default settingTranslations;
