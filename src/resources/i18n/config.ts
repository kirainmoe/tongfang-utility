const configPageTranslation = {
  CONFIG_PAGE_TITLE: ['配置文件', 'Configuration'],
  CONFIG_PAGE_DESCRIPTION: ['管理，更新和定制 OpenCore 配置文件。', 'Manage, update and customize OpenCore config.'],
  CONFIG_STEP_WELCOME: ['欢迎', 'Welcome'],
  CONFIG_STEP_SELECT_MODEL: ['选择机型/模具', 'Select Model'],
  CONFIG_STEP_CUSTOMIZE: ['定制配置文件', 'Customize'],
  CONFIG_STEP_PERSONALIZE: ['个性化', 'Personalize'],
  CONFIG_STEP_GENERATE_CONFIG: ['生成配置文件', 'Generate Config'],
  CONFIG_STEP_DONE: ['完成', 'Done'],
  CONFIG_NEXT_STEP: ['下一步', 'Next'],
  CONFIG_PREV_STEP: ['上一步', 'Prev'],
  CONFIG_PLEASE_WAIT: ['请稍等...', 'Please wait...'],
  CONFIG_FETCH_yml_FAILED: ['获取构建信息失败', 'Failed to fetch build info '],
  CONFIG_UTILITY_VERSION_NOT_SATISFIED: ['Tongfang Utility 版本不满足要求', 'Tongfang Utility version not satisfied'],
  CONFIG_UTILITY_VERSION_NOT_SATISFIED_CONTENT: [
    '选择的 EFI 版本 (:efi_version) 需要 Tongfang Utility :utility_version (:utility_build) 或更高版本；当前正在使用的版本是 :local_utility_version (:local_utility_build). 需要先更新 Tongfang Utility 才能下载该 EFI 版本。',
    'Current selected EFI version (:efi_version) requires Tongfang Utility :utility_version (:utility_build) or above, while you have :local_utility_version (:local_utility_build). You need to upgrade Tongfang Utility to latest version to download this EFI release version.'
  ],
  CONFIG_GO_TO_UPGRADE: ['前往更新', 'Upgrade'],
  CONFIG_BUILD_FILE_HASH_NOT_MATCH: ['警告：EFI 构建文件 build.yml 哈希值不一致！', 'Warning: build.yml hash check failed!'],
  CONFIG_BUILD_FILE_HASH_NOT_MATCH_CONTENT: [
    '检测到构建配置文件 build.yml 的哈希值与云端不一致，这可能是因为拉取构建配置文件出现错误，或 build.yml 文件被篡改导致的。被修改的构建配置文件可能会导致风险。是否继续？',
    'Tongfang Utility detected that the hash of "build.yml" is different from the hash from remote server. This may because errors occurred while fetching build.yml, or build.yml has been modified by somebody. Continue with risk?'
  ],
  CONFIG_THIS_IS_A_LOCAL_BUILD: ['这是一个从本地读取的文件，无法获取更新内容。', 'This is a local file. We could not know anything :('],

  WELCOME_CHECK_COMPONENT_VERSION: ['检查组件版本', 'Component Version'],
  WELCOME_CURRENT_EFI_VERSION: ['当前引导 EFI 版本', 'Current EFI Version'],
  WELCOME_INTEL_WIFI_VERSION: ['Intel Wi-Fi 驱动版本', 'Intel Wi-Fi Driver Version'],
  WELCOME_INTEL_BLUETOOTH_VERSION: ['Intel 蓝牙驱动版本', 'Bluetooth Driver Version'],
  WELCOME_EFI_RELEASE_LIST: ['EFI 版本列表', 'EFI Release List'],
  WELCOME_READ_RELEASE_NOTE: ['查看详情..', 'Detail..'],
  WELCOME_MANAGE_VERSION: ['管理版本..', 'Manage..'],
  WELCOME_ON_WINDOWS: ['未知 (Windows 环境)', 'Unknown (on Windows)'],

  SELECT_MODEL_FILTER_INPUT: ['搜索机型 / 模具 / 制造商...', 'Search model / barebone / vendor...'],
  SELECT_MODEL_BY_VENDOR: ['按制造商分类', 'Group by vendor'],
  SELECT_MODEL_BY_BAREBONES: ['按模具型号分类', 'Group by barebones'],
  SELECT_MODEL_CURRENT: ['当前选择型号', 'Current selection'],

  CUSTOMIZE_SELECT_OS_VERSION: ['选择你要安装的 macOS 版本', 'Select macOS Version You Want to Install'],
  CUSTOMIZE_SELECT_WIRELESS_ADAPTER_TYPE: ['选择无线网卡型号 / 联网方式', 'Select Wireless Adapter Type'],
  CUSTOMIZE_SELECT_INTERNAL_MONITOR_TYPE: ['选择笔记本内屏类型', 'Select Internal Monitor Type'],
  CUSTOMIZE_SPECIAL_HARDWARES: ['硬件兼容设置', 'Hardwares Compatibility Setting'],
  CUSTOMIZE_SPECIAL_SETTINGS: ['特殊设置', 'Special Setting'],
  CUSTOMIZE_WIRELESS_APPLE: ['Mac 原装无线网卡', 'Mac original'],
  CUSTOMIZE_WIRELESS_BROADCOM: ['博通 / 戴尔兼容无线网卡', 'Broadcom / DELL compatible'],
  CUSTOMIZE_WIRELESS_INTEL: ['Intel 无线网卡', 'Intel wireless'],
  CUSTOMIZE_ANDROID_TETHERING: ['Android USB 共享网络', 'Android USB Tethering'],
  CUSTOMIZE_DESC_APPLE_WIRELESS: [
    '常见 Mac 原装无线网卡型号为 BCM94360CS2, BCM943602CS, BCM943224PCIEBT2 等。若没有拆机更换过无线网卡请勿选择此项。',
    'Example: BCM94360CS2, BCM943602CS, BCM943224PCIEBT2, etc.',
  ],
  CUSTOMIZE_DESC_BROADCOM_WIRELESS: [
    '常见博通/戴尔无线网卡型号为：DW1830 (BCM943602BAED), DW1560 (BCM94352Z), DW1820A (BCM94350ZAE) 等。若没有拆机更换过无线网卡请勿选择此项。',
    'Example: DW1830 (BCM943602BAED), DW1560 (BCM94352Z), DW1820A (BCM94350ZAE), etc.'
  ],
  CUSTOMIZE_DESC_INTEL_WIRELESS: [
    '常见 Intel 无线网卡型号为：AC9462, AC9560, AX200 等，若未拆机更换过网卡请选择此项。',
    'Example: AC9462, AC9560, AX200, etc.',
  ],
  CUSTOMIZE_DESC_ANDROID_HORNDIS: [
    '是否添加 Android USB 共享网络驱动。如果你是 iPhone 用户，系统已自带 USB 热点功能，直接连接数据线即可。',
    'Add Android USB tether kext to use USB hotspot. MacOS has native support for iPhone USB hotspot, no kext is needed.',
  ],
  CUSTOMIZE_DESC_1080P: ['若你的笔记本内屏分辨率为 1920x1080@60Hz 请选择此项，此选项适合大部分用户。', 'This option is preferred for normal users.'],
  CUSTOMIZE_DESC_1080P144:  ['若你的笔记本内屏分辨率为 1920x1080@144Hz 请选择此项。', 'This option is preferred for those laptops having high refresh rate monitor.'],
  CUSTOMIZE_DESC_1080P144_SCHEME2: [
    '部分机械革命的 144Hz 笔记本（常见 Z2-G, Z2 Air-G）需要使用此方案，否则会卡在 IOConsoleUsers 无法进入 macOS. 如果方案 1 对你的电脑不起作用，请尝试此方案。',
    'Some laptops with 144Hz monitor does not work on 144Hz scheme 1. If you are encountering this problem, please try scheme 2.',
  ],
  CUSTOMIZE_DESC_4K: [
    '若你的笔记本内屏分辨率为 3820x2160 请选择此项。请注意，根据你更换的 4K 屏幕型号和选择的屏线不同，可能产生部分由 4K 屏幕引起的体验问题。',
    'This option is preferred for those laptops that upgraded UHD monitors. Note that you may still encounter some experience problems caused by 4K monitor on macOS.',
  ],
  CUSTOMIZE_SCHEME_2: ['方案2', 'Scheme 2'],

  CUSTOMIZE_DISABLE_NVME: ['屏蔽不兼容的 NVMe 硬盘', 'Disable incompatible NVMe SSD'],
  CUSTOMIZE_ENABLE_NVMEFIX: ['启用 NVMe 电源优化', 'Enable NVMeFix'],
  CUSTOMIZE_LOAD_APPLEGUC: ['加载 Apple GuC 固件', 'Load AppleGuC firmware'],
  CUSTOMIZE_CPU_BEST_PERFORMANCE: ['CPU 最佳性能模式', 'Best Performace Mode'],
  CUSTOMIZE_ENABLE_BOOTCHIME: ['启用开机声音', 'Enable boot chime'],
  CUSTOMIZE_DONT_USE_AIRPORTITLWM: ['不使用原生 Intel 驱动', 'Use itlwm instead of AirportItlwm'],
  CUSTOMIZE_SIMPLIFY_CONFIG: ['最简化配置文件', 'Simplify config.plist'],
  CUSTOMIZE_DESC_DISABLE_NVME: [
    '部分固态硬盘 (三星 PM981, 镁光 2200S 等) 与 macOS 无法兼容，会导致 macOS 死机、冻屏或 panic（即使不作为系统盘）, 需要使用 SSDT 屏蔽。请将其插到 1 号 M.2 盘位 (靠近风扇的盘位) 后勾选此项屏蔽。非不兼容硬盘用户请勿选择此项。',
    'Some SSD models are not compatible with macOS (e.g. Samsung PM981, Micron 2200s, etc.) and will make macOS stuck or panic. If you have these SSD(s) installed, put it in the 1st M.2 slot (adjacent to fan) and check this option.',
  ],
  CUSTOMIZE_DESC_ENABLE_NVMEFIX: [
    '如果你的 NVMe 固态硬盘在 macOS 下发热异常，请勾选此项。',
    'Enable NVMeFix.kext if your NVMe SSD overheats on macOS.',
  ],
  CUSTOMIZE_DESC_ENABLE_APPLEGUC: [
    '加载 AppleGuC 核显固件可以显著提升 Intel UHD 核芯显卡在 macOS 下的性能，但可能会使部分用户遇到睡眠无法唤醒的问题。',
    'Load Apple GuC firmware will promote the performance of Intel UHD Graphics. Note that some users may meet the problem of sleep wake failure if enable this.',
  ],
  CUSTOMIZE_DESC_CPU_BEST_PERFORMACE: [
    '显著提升 CPU 的性能，但同时会增大耗电量。',
    'Promote CPU performace at the sacrifice battery life.',
  ],
  CUSTOMIZE_DESC_SIMPLIFY: [
    '删除配置文件中不加载的 KEXT, SSDT 和 ACPI 补丁，减小产生的 EFI 文件体积。如果你有二次修改 config 的需要，推荐不要选择此项。',
    'Remove kexts, SSDTs and ACPI patches that are not loaded from config and EFI.',
  ],

  PERSONALIZE_SMBIOS: ['SMBIOS 信息', 'SMBIOS'],
  PERSONALIZE_SMBIOS_MODEL: ['SMBIOS 型号', 'SMBIOS Model'],
  PERSONALIZE_SMBIOS_SN: ['设备序列号', 'Serial Number'],
  PERSONALIZE_SMBIOS_MLB: ['主板序列号', 'MLB'],
  PERSONALIZE_SMBIOS_SMUUID: ['System UUID', 'System UUID'],
  PERSONALIZE_SMBIOS_RANDOM_GENERATE_USING_THIS_MODEL: ['随机生成 SMBIOS 信息', 'Randomly generate SMBIOS'],
  PERSONALIZE_SMBIOS_READ_FROM_SYSTEM: ['读取当前系统 SMBIOS 信息 (仅macOS)', 'Read SMBIOS from system (macOS only)'],
  PERSONALIZE_SMBIOS_RANDOM_SMUUID: ['重置 SmUUID (慎用)', 'Reset SmUUID'],
  PERSONALIZE_SMBIOS_RANDOM_SMUUID_WARN: [
    '重置 SmUUID 可能会导致使用 OpenCore 引导 Windows 时激活丢失、macOS 下软件识别码重置等问题，请确认是否要重置 SmUUID.',
    'Reseting SmUUID may cause the activation lost on Windows and software identifier lost on macOS. Are you sure to reset SmUUID?',
  ],
  PERSONALIZE_SMBIOS_CURRENT_SOURCE: ['当前 SMBIOS 来源', 'Current SMBIOS source'],
  PERSONALIZE_SMBIOS_READ_FROM_CURRENT_SYSTEM: ['从当前系统读取', 'Read from system'],
  PERSONALIZE_SMBIOS_AUTO_GENERATED: ['随机生成', 'Randomly generated'],
  PERSONALIZE_SMBIOS_MANUALLY_MODIFIED: ['手动修改', 'Manual'],
  PERSONALIZE_SMBIOS_LAST_GENERATED: ['继承上次生成结果', 'Inherit last generated'],
  PERSONALIZE_CUSTOM_BACKGROUND: ['自定义引导背景', 'Custom Bootloader Background Image'],
  PERSONALIZE_USE_DEFAULT_BACKGROUND: ['使用默认背景', 'Disable'],
  PERSONALIZE_USE_CUSTOM_BACKGROUND: ['使用图片 ', 'Using image'],
  PERSONALIZE_CUSTOM_BACKGROUND_DESCRIPTION: [
    '选择一张图片作为 OpenCore 引导时的背景。为了保证效果，请选择 16:9、1920x1080 或以上分辨率的图片。仅支持 PNG 或 ICNS 格式文件。',
    'Choose an image as the background image of OpenCore. Prefers an image with 1080p or higher resolution and 16:9 ratio. Supports PNG or ICNS file only.',
  ],
  PERSONALIZE_DOWNLOAD_SOURCE: ['选择下载源', 'Choose Download Source'],
  PERSONALIZE_DOWNLOAD_FROM: ['从 :downloadSourceName 下载', 'Download from :downloadSourceName'],
  PERSONALIZE_SET_BOOT_ARGS: ['自定义引导参数', 'Custom Boot Args'],
  PERSONALIZE_SET_BOOT_ARGS_PLACEHOLDER: ['自定义 macOS 引导参数。如果你不知道这是什么，留空即可；这是一个高级选项，请不要乱选乱填。', 'Leave it blank if you don\'t know what is this.'],
  PERSONALIZE_ONLY_SMUUID_ON_WINDOWS: ['提示：Windows 环境仅能够获取 SMUUID，其它参数仍为随机生成或上次使用的值。', 'Note: Only SMUUID will be read on Windows.'],
  PERSONALIZE_SMBIOS_DESCRIPTION: [
    'SMBIOS 是设备的识别信息。一般地，我们尽量确保每台设备有全网唯一的 SMBIOS 信息，并且不和真正的 Mac 撞号。如果 macOS 提示你设备受到企业管理，则说明生成的序列号与真正的 Mac 冲突，请重新生成 SMBIOS 信息。',
    'SMBIOS information is used to identity a device. Formally, we should make this info unique all over the world, and avoid the conflict with a real Mac.',
  ],
  PERSONALIZE_SMBIOS_SHOULD_NOT_BE_EMPTY: ['SMBIOS 信息不允许为空，请重新生成或填写有效的 SMBIOS 信息。', 'SMBIOS fields should not be empty.'],

  GENERATE_ENSURE_OPTIONS: ['确认你的选择', 'Verify Your Choice'],
  GENERATE_CHOSEN_MODEL: ['你选择的机型（模具）：', 'Model (Barebone): '],
  GENERATE_MACOS_VERSION: ['你将安装的 macOS 版本：', 'Version of macOS to install: '],
  GENERATE_NETWORK_METHOD: ['你选择的联网方式：', 'Wireless adapter vendor: '],
  GENERATE_USE_TETHERING: ['，同时使用 Android USB 共享网络', ', with Android USB tethering support'],
  GENERATE_MONITOR_TYPE: ['你的内置显示器类型：', 'Internal monitor type: '],
  GENERATE_NVME_DISABLED: ['屏蔽了位于第 :slot 个 m.2 插槽的 NVMe 硬盘', 'Disabled NVMe SSD in slot :slot'],
  GENERATE_NVMEFIDX_ENABLED: ['启用了 NVMe 电源优化', 'Enabled NVMeFix'],
  GENERATE_LOAD_APPLE_GUC: ['加载了核显的 Apple GuC 固件', 'Loaded Apple GuC firmware for IGPU'],
  GENERATE_CPU_BEST_PERFORMANCE: ['CPU 模式设置为最佳性能模式', 'Enabled CPU best performace mode'],
  GENERATE_CUSTOM_BOOT_ARGS: ['将添加以下自定义引导参数到 config.plist: ', 'Will add the following boot args into config.plist'],
  GENERATE_NOT_USE_AIRPORTITLWM: [
    '你勾选了不使用原生接口的 Intel 驱动 (AirportItlwm)，因此在 macOS 下使用 Wi-Fi 需要下载 HeliPort 程序管理网络。',
    'You have selected not to use AirportItlwm. You will need to download HeliPort to manage & connect Wi-Fi.',
  ],
  GENERATE_SIMPLIFY_CONFIG: [
    '开启了配置文件精简化，生成的 EFI 和 config.plist 将不包含未启用的 Kext 和 SSDT.',
    'Config simplification is enabled. EFI and config.plist generated by this tool will not include disabled kexts and ACPI patches.'
  ],
  GENERATE_INTEL_DRIVER_NOT_SPECIFIED: [
    '未下载 Intel 驱动包或未设置默认版本，',
    'Intel Wi-Fi/Bluetooth drivers are not downloaded or default version is not specified, ',
  ],
  GENERATE_CANNOT_NEXT: ['检测到无效选项', 'Invalid Options Detected'],
  GENERATE_CANNOT_NEXT_DESCRIPTION: ['在进行下一步之前，请先解决以下问题：', 'Please resolve the following issues before continue.'],
  GENERATE_INTEL_DRIVER_GO_MANAGE: ['前往下载与设置', 'go to settings'],

  PROCESSING_STEP_DOWNLOAD: ['正在下载 EFI 压缩文件 (:progress%)', 'Downloading EFI Archive (:progress%)'],
  PROCESSING_STEP_UNZIP: ['正在解压文件', 'Extracting Files'],
  PROCESSING_CHECK_BUILD_FILE_HASH: ['正在检查构建文件哈希值', 'Checking Makefile Hash'],
  PROCESSING_COPY_FILES: ['正在复制文件', 'Copying Files'],
  PROCESSING_PROCESS_CONFIG: ['正在处理引导配置文件', 'Processing Bootloader Config'],
  PROCESSING_PARSE_IMAGE: ['正在转换引导背景格式', 'Transforming Format for Background Image'],
  PROCESSING_CLEAN_UP: ['正在清理临时文件', 'Cleaning Up'],
  PROCESSING_EFI_FAILED: ['生成 EFI 文件失败', 'Critical Failure'],
  PROCESSING_PROCESS_ERROR: ['生成 EFI 文件失败，请重新下载无线与蓝牙驱动、重新生成，如果问题依旧，请与开发者联系。错误细节', 'Failed to generate config, unknown error occureed. Detail'],
  PROCESSING_DOWNLOAD_PROBLEMS: ['下载遇到问题？', 'Having trouble downloading?'],
  PROCESSING_DOWNLOAD_PROBLEMS_DESCRIPTION: [
    `
      <p>尝试以下方法解决下载问题：</p>
        <li>若下载速度过慢，或进度长时间为 0%，尝试<a>在设置中更换镜像服务器</a> (当前镜像服务器: $server)。</li>
        <li>若更换镜像服务器后进度条仍为 0%，尝试<a>在设置中设置其它下载路径</a>。</li>
        <li>
        若上述方法均无法正常下载，请自行下载 EFI 压缩包后，放置到 <a>&lt;配置文件下载位置&gt;/Tongfang_EFI/EFI.zip</a>，重启 Utility 并选择本地版本生成 EFI。
        </li>
      <p>复制以下地址使用浏览器或下载工具下载: <br> <a>$downloadUrl</a></p>
    `,
    `
      <p>Try:</p>
      <li>If EFI is downloaded with a very low speed, select another mirror server in <a>Preference</a> (Current mirror server: $server).</li>
      <li>If the download progress still stick at 0% after change the mirror server, specify another download path in <a>Preference</a>.</li>
      <li>If none of them solve the problem, you may need to download the EFI archive manually (from GitHub kirainmoe/tongfang-macos repository), and put the archive in <a>&lt;config download path&gt;/Tongfang_EFI/EFI.zip</a>. After that restart Tongfang Utility and generate EFI from local.</li>
      <p>Copy the following URL to download manually: <br> <a>$downloadUrl</a></p>
    `
  ],

  DONE_SUCCESS: ['成功', 'Success'],
  DONE_SUCCESS_TIPS: [
    '已将配置文件下载到 :<配置文件下载路径>/Tongfang_EFI: 目录中，请将目录下的 BOOT 和 OC 文件夹复制到硬盘或 U 盘 EFI 系统分区 (ESP) 的 EFI/BOOT 和 EFI/OC，然后使用 UEFI 引导 OpenCore.',
    'OpenCore config has been downloaded to :<config download path>/Tongfang_EFI: directory. Copy "BOOT" and "OC" sub-folders in this directory to EFI system partition of your drive, then boot OpenCore from the media.',
  ],
  DONE_TEXT_TUTORIAL: ['文字教学', 'Tutorial'],
  DONE_VIDEO_TUTORIAL: ['视频教学', 'Video'],
  DONE_EFI_AUTO_REPLACE: ['自动替换 EFI (macOS)', 'Replace EFI Automatically'],
  DONE_SELECT_TARGET_ESP: ['选择要替换引导文件的 EFI 系统分区', 'Choose Target EFI System Partition'],
  DONE_REPLACE_ESP_CONFIRM: [
    '确认要将配置文件 (EFI) 替换到分区 ":name" (标识符：:identifier) 中吗？若此分区中已有上一个版本的配置文件， 将会被备份到 EFI/OC_Backup 目录中。',
    'Are you sure to copy EFI files into ":name" (:identifier)? O ld EFI files will be backed up to "EFI/OC_Backup".',
  ],
  DONE_REPLACE_ESP_SUCCESS: [
    '复制 EFI 到分区成功，上一个版本的 EFI 文件已备份到 EFI/OC_Backup 下，如果更新 EFI 之后无法引导 macOS，请进入其它操作系统还原 EFI 。',
    'Successfully copied EFI to target ESP. Previous version of EFI has been moved to EFI/OC_Backup.',
  ],
  DONE_REPLACE_ESP_FAILED: [
    '自动替换 EFI 到 ESP 失败，请重试或手动替换。',
    'Failed to copy EFI to target ESP. Please try again or copy it manually.',
  ],
  DONE_BACK_TO_HOME: ['返回首页', 'Done'],

  CONNECTIVITY_CHECKER_TITLE: ['获取不到 EFI 列表？', 'No release is available?'],
  CONNECTIVITY_CHECKER: [
    '网络连通性检查',
    'Connectivity Checker'
  ],
  CONNECTIVITY_CHECKER_NO_EFI_SOLUTION: [
    '获取不到可用的 EFI 列表？点此查看解决方案...',
    'No release is available? Solution here...',
  ],
  CONNECTIVITY_CHECKER_SWITCH_MIRROR_SERVER: [
    '切换镜像服务器',
    'Switch Mirror Server'
  ],
  CONNECTIVITY_CHECKER_CURRENT_SERVER: [
    '当前镜像服务器',
    'Current Mirror Server'
  ],
  CONNECTIVITY_CHECKER_SERVER_CHECKING: ['检测中...', 'Communicating...'],
  CONNECTIVITY_CHECKER_SERVER_ONLINE: ['在线', 'Online'],
  CONNECTIVITY_CHECKER_SERVER_OFFLINE: ['离线', 'Offline'],
  CONNECTIVITY_CHECKER_MIRROR_SWITCHED: [
    '已将镜像服务器切换到 $1 .',
    'Mirror server switched to $1.',
  ],
  CONNECTIVITY_CHECKER_LOCAL_GENERATE: [
    '本地生成 EFI',
    'Generate From Localhost',
  ],
};

export default configPageTranslation;
