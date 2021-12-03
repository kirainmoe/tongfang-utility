const fanControlTranslation = {
  FAN_CONTROL_TITLE: ['散热控制', 'Fan Speed Control'],
  FAN_CONTROL_FANCLI_NOT_INSTALLED: ['控制组件未安装', 'Fan Control Component is not Installed'],
  FAN_CONTROL_FANCLI_NOT_INSTALLED_PROMPT: [
    '需要安装风扇控制命令行工具到系统以使用散热控制功能。是否下载并安装？',
    'You need to install `fancli` to adjust the fan speed. Do you want to download and install `fancli`?',
  ],
  FAN_CONTROL_FANCLI_INSTALLING: [
    '正在安装风扇控制命令行工具，安装完毕后会自动刷新页面，请稍等。',
    '`fancli` is installing. Page will be refreshed automatically after installation finished.',
  ],
  FAN_CONTROL_MODE_SET: ['散热模式设置', 'Fan Control Mode'],
  FAN_CONTROL_MODE_NORMAL: ['默认预设', 'Default'],
  FAN_CONTROL_MODE_NORMAL_DESCRIPTION: ['使用主板默认的风扇调度策略', 'Use default fan control strategy defined in montherboard'],
  FAN_CONTROL_MODE_INTELLIGENT: ['智能调节', 'Intelligent'],
  FAN_CONTROL_MODE_INTELLIGENT_DESCRIPTION: ['使用软件预设或自定义配置动态调节风扇转速', 'Automatically adjust fan speed according to current temperature'],
  FAN_CONTROL_MODE_MANUAL: ['手动设置', 'Manual'],
  FAN_CONTROL_MODE_MANUAL_DESCRIPTION: ['自行设置转速档位，覆盖默认设置', 'Specify a fan speed level manually'],
  FAN_CONTROL_MODE_BOOST: ['狂飙模式', 'Boost'],
  FAN_CONTROL_MODE_BOOST_DESCRIPTION: ['风扇设置为最快转速，快速降温', 'Set fan speed to the maximum value'],
  FAN_CONTROL_CURRENT_MODE: ['当前', 'Current'],

  FAN_CONTROL_DYNAMIC_SETTING: ['动态调节配置', 'Dynamic Adjustment Config'],
  FAN_CONTROL_CONFIG_TABLE_TEMPERATURE_THRESHOLD: ['温度阈值 (°C)', 'Temperature (°C)'],
  FAN_CONTROL_CONFIG_TABLE_SPEED_LEVEL: ['转速等级', 'Speed Level'],
  FAN_CONTROL_CONFIG_MODAL_TITLE: ['添加风扇转速控制点', 'Add Fan Speed Control Point'],
  FAN_CONTROL_CONFIG_SAVED: ['风扇转速曲线设置已保存。', 'Fan control config saved.'],
  FAN_CONTROL_CONFIG_TABLE_CURVE_CHART: ['转速温控曲线图', 'Fan Speed Curve Chart'],

  FAN_CONTROL_LEVEL: ['转速等级', 'Level'],
  FAN_CONTROL_CPU_TEMP: ['当前核心温度', 'Current Temperature'],
  FAN_CONTROL_SPEED_LOW: ['慢'],
  FAN_CONTROL_SPEED_FAST: ['快'],
};

export default fanControlTranslation;
