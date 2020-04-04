export const strings = {
    "zh-CN": {
        config: "配置文件",
        keyboardLight: "键盘灯",
        tools: "工具",
        lab: "实验室",

        keyboardStyle: "键盘灯设置",
        cannotRunningOnWindows: "不兼容的平台",
        cannotRunningOnWinDescription:
            "由于 Microsoft Windows 系统对 HID 设备的限制，Tongfang Hackintosh Utility 的键盘灯控制功能无法在 Windows 平台上使用。",
        useOfficialControlCenter: "请使用官方软件调节键盘灯；你仍然可以使用 Tongfang Hackintosh Utility 的其它功能。",
        hidCommFailed: "无法与 HID 设备通信",
        hidCommFailedReason:
            "Tongfang Hackintosh Utility 在与 HID 设备通信的时候遇到了错误，导致无法加载必要组件。造成此问题的原因可能是：",
        hidCommFailedNotFound:
            "在此电脑上没有找到兼容设备。请确认你的系统能识别到：制造商 ID 为 0x048d, 产品 ID 为 0xce00 的 ITE Devices(8291)。",
        hidCommFailedRevisionNotMatch:
            "在此电脑上找到了兼容设备，但 ITE 版本 (revision) 不为 0.02。",
        hidCommFailedLinuxUnauthorized:
            "Tongfang Hackintosh Utility 正在 Linux 下运行，但未能获取 root 权限，无权访问 HID 设备。",
        monoColor: "固定颜色",
        breathing: "呼吸",
        wave: "波浪",
        rainbow: "彩虹",
        flash: "闪烁",
        mix: "渐变",
        brightness: "键盘灯亮度",
        speed: "变换速度",

        toolsDescription: "部分功能需要授权。",
        fixSleep: "调节睡眠参数",
        fixSleepDescription: "调节睡眠参数，修复睡眠睡死、自动唤醒等问题。",
        hiDPI: "开启 HiDPI",
        hiDPIDescription:
            "在笔记本内建屏幕中启用缩放 (HiDPI) 功能，降低可视分辨率使得文字渲染更清晰(需要重启)。",
        kextCache: "重建 Kext 缓存",
        kextCacheDescription: "重建内核拓展缓存，以使某些对 Kext 的更改生效。",
        installTongfangFnDaemon: "安装快捷键守护程序",
        installTongfangFnDaemonDescription:
            "安装同方 Fn 快捷键守护程序，以便使 Fn+F1~F7 的功能正常使用。",
        pleaseWait: "操作正在执行中，这可能需要几十秒或更长时间，请等待操作完成...",
        success: "成功",
        state: "状态",
        installed: "已安装",
        notInstalled: "未安装",
        successDescription: "所执行的操作已完成。",
        ToolboxCannotRunningOnWinDescription:
            "工具箱中的功能仅用于优化在 macOS 系统下的使用体验，无法在 Windows / Linux 平台上使用。",
        onlyForBOE0747: "提示：一键开启 HiDPI 功能仅适用于搭载京东方 BOE0747 15.6' 屏幕的设备，如果你手动更换过屏幕或你的原厂屏幕不是此型号，那么可能会开启失败。",

        configure: "配置文件",
        configureDescription: "管理、更新和定制 OpenCore 配置文件。",
        laptopModel: "笔记本机型",
        selectModel: "选择机型或模具型号",
        injectOption: "驱动/补丁注入选项（如无需要或无硬件请不要勾选）",
        injectAirport: "添加博通无线网卡驱动",
        injectIntelBluetooth: "添加因特尔蓝牙驱动",
        injectBrcmBluetooth: "添加博通蓝牙驱动",
        injectHoRNDIS: "添加 USB 网络共享驱动",
        inject4KSupport: "添加 4K 内屏补丁",
        disablePM981: "添加 PM981 屏蔽补丁",
        smbiosInfo: "硬件识别信息",
        getSMBIOSFromGeneration: "已随机生成",
        getSMBIOSFromSystem: "已从系统读取",
        smbiosModel: "型号",
        smbiosSN: "序列号",
        smbiosMLB: "主板序列号",
        smbiosSmUUID: "系统 UUID",
        versionInfo: "版本信息",
        localVersion: "当前引导版本",
        latestVersion: "最新版本",
        getLatest: "获取最新配置文件",
        downloadWait: "正在下载，请等待",
        successInfo:
            "已将最新 OpenCore 配置文件下载到当前用户桌面的 `Tongfang_EFI` 文件夹中。请将桌面的 Tongfang_EFI/BOOT 和 Tongfang_EFI/OC 复制到 U 盘或硬盘中。",
        successInstructionUSB:
            "对于 U 盘引导用户：请将 BOOT 和 OC 文件夹复制到 U 盘 ESP 分区的 EFI/BOOT 和 EFI/OC 下。如果 ESP 分区中已存在 OC 文件夹，请先将其删除之后再粘贴。",
        successInstructionHD:
            "对于硬盘引导用户：请将 BOOT 内的 BOOTx64.efi 改名为 OpenCore.efi，然后将 BOOT 和 OC 复制到硬盘 ESP 分区的 EFI/BOOT 和 EFI/OC 下，添加 UEFI 启动项指向 EFI/BOOT/OpenCore.efi （而不是指向 EFI/OC/OpenCore.efi !）。如果 ESP 分区中已存在 OC 文件夹，请先将其删除之后再替换。",
        backward: "我知道了，这就去和苹果对线",
        requirement4k:
            "请注意：同方 GJ5CN64 / GI5CN54 模具，需要解锁 BIOS 或使用 UEFI Shell 修改 DVMT Pre-allocated 大小为 64M 后方可支持 4K 内屏，否则会导致内核崩溃.",
        dontUseDefault: '请注意：程序检测到你正在使用配置文件模板默认的 SMBIOS 信息（序列号为 C02X3088KGYG 或 C02WM0Q0KGYG）。\n\n使用配置文件模板中的默认序列号是不被推荐的行为，可能会导致你无法使用与 Apple ID 关联的服务，建议重新生成 SMBIOS 信息。\n\n你想要重新生成吗？第一次使用新的 SMBIOS 信息引导 macOS 时，可能会要求你重新登录与 Apple ID 关联的服务 (iCloud, 随航等)。',
        failedToGetSN: '无法从系统获取 SMBIOS 信息，请确认当前系统的 SMBIOS 有效。软件将自动生成一组 SMBIOS 信息。',
        youAreUsing: "你正在使用",
        officialLatest: "官方最新版本是",
        updateRemind:
            "为了防止发生兼容性问题，请前往 https://starbeat.kirainmoe.com 更新 Tongfang Hackintosh Utility 后再管理配置文件。",
        downloadSource: "更新源",
        recommend: '推荐',
        downloadFailed: '下载失败，请重启程序尝试重新下载。',

        about: '关于 Tongfang Hackintosh Utility',

        update: '更新',
        currentVersion: '当前版本',
        fetchingLatest: '正在获取远端版本...',
        thisIsAForceUpdate: '这是一个强制更新版本，App 无法自动完成更新，你需要到 https://starbeat.kirainmoe.com/ 手动下载最新版本。',
        newVersionAvailable: `Tongfang Hackintosh Utility 有新版本 $1 可用，App 将在 $2 秒后开始更新；期间请不要退出程序。`,
        usingLatest: '你正在使用最新版本的 Tongfang Hackintosh Utility.',
        downloadRemoteVersion: '正在更新 Tongfang Hackintosh Utility，请稍等……',
        updateSuccess: '程序更新成功，请重启程序应用更改。',
        updateFailed: '程序更新时出现错误，请尝试手动从 https://starbeat.kirainmoe.com 下载最新版本。',
        updateRequired: '为防止出现兼容性问题，Tongfang Hackintosh Utility 需要更新，即将为你跳转到更新页面。'
    },
    en: {
        config: "Configuration",
        keyboardLight: "Keyboard",
        tools: "Tools",
        lab: "Laboratory",

        keyboardStyle: "Keyboard Light Style",
        cannotRunningOnWindows: "Incompatible Platform",
        cannotRunningOnWinDescription:
            "Due to the limitation of Microsoft Windows on accessing HID devices，the keyboard light controlling function cannot work on Windows.",
        useOfficialControlCenter:
            "Please use the official Control Center to set the keyboard light. You can still use other functions of Tongfang Hackintosh Utility.",
        hidCommFailed: "Unable to communicate with HID device",
        hidCommFailedReason:
            "Error occurred when Tongfang Hackintosh Utility was communicating with HID device, which caused the failure of loading the component. The reason may be:",
        hidCommFailedNotFound:
            'No compatible device was found on this computer. Please ensure that your system recognizes "ITE Devices (8291)" (vendorID 0x048d, productID 0xce00).',
        hidCommFailedRevisionNotMatch:
            "Compatible device was found on this computer, but its revision isn't 0.02.",
        hidCommFailedLinuxUnauthorized:
            "You are running this program on Linux without without root permission.",
        monoColor: "Fixed Color",
        breathing: "Breathing",
        wave: "Wave",
        rainbow: "Rainbow",
        flash: "Flash",
        mix: "Mix",
        brightness: "Brightness",
        speed: "Speed",

        toolsDescription: "Some operation requires to be done as superuser.",
        fixSleep: "Fix sleep",
        fixSleepDescription: 'Run "pmset" command to fix broken sleep.',
        hiDPI: "Enable HiDPI",
        hiDPIDescription: "Make the font more clear.",
        kextCache: "Rebuild kextcache",
        kextCacheDescription: 'Run "kextcache -i /" command to refresh the kernel extension cache.',
        installTongfangFnDaemon: "Install Fn Daemon",
        installTongfangFnDaemonDescription:
            "Install Tongfang Fn-shortcut Daemon to fix function keys.",
        pleaseWait: "Please wait, it will take several seconds to perform the operation...",
        success: "Success",
        state: "Status ",
        installed: "Installed",
        notInstalled: "Uninstalled",
        successDescription: "Done.",
        ToolboxCannotRunningOnWinDescription: "Toolbox can only be used on macOS.",
        onlyForBOE0747: "Warning: This option is for the BOE0747 15.6' monitor. If your laptop does not have this model of monitor, this function may not work properly.",

        configure: "Configuration",
        configureDescription: "Manage, update and customize OpenCore config.",
        laptopModel: "Laptop Model",
        selectModel: "Select a model or barebone...",
        injectOption: "Kext/Patch Injection（Do not check the options that you don't need）",
        injectAirport: "Broadcom Airport Fix",
        injectIntelBluetooth: "Intel Bluetooth",
        injectBrcmBluetooth: "Broadcom Bluetooth",
        injectHoRNDIS: "USB Network Tethering",
        inject4KSupport: "4K Resolution Screen",
        disablePM981: "Disable Incompatible NVMe",
        smbiosInfo: "SMBIOS",
        getSMBIOSFromGeneration: "Randomly generated",
        getSMBIOSFromSystem: "Read from system",
        smbiosModel: "Model",
        smbiosSN: "SerialNumber",
        smbiosMLB: "Motherboard SerialNumber",
        smbiosSmUUID: "System UUID",
        versionInfo: "Version Info",
        localVersion: "Current version",
        latestVersion: "Latest version",
        getLatest: "Get the latest config",
        downloadWait: "Downloading, please wait..",
        successInfo:
            "Successfully downloaded the latest OC config to ~/Desktop/Tongfang_EFI. Please copy `BOOT` and `OC` folder to ESP.",
        successInstructionUSB:
            "For users booting from USB flash: Copy `BOOT` and `OC` folder to `EFI/BOOT` and `EFI/OC` in your ESP. If `EFI/OC` has already existed in your ESP, please delete it before copy.",
        successInstructionHD:
            "For users booting from hard disk: Rename `BOOT/BOOTx64.efi` to `BOOT/OpenCore.efi`, and copy `BOOT` and `OC` folder to `EFI/BOOT` and `EFI/OC` in your ESP, then add a boot entry pointing to `BOOT/OpenCore.efi`. If `EFI/OC` has already existed in your ESP, please delete it before copy.",
        backward: "Having fun hackintoshing!",
        youAreUsing: "You are using ",
        officialLatest: "The latest version is ",
        updateRemind:
            "Please consider update Tongfang Hackintosh Utility from https://starbeat.kirainmoe.com to avoid compatibility problems.",
        requirement4k:
            'Warning: For Tongfang GJ5CN64 / GI5CN54 barebones\' user, you need to set "DVMT Pre-allocated" to 64MB by unlocking BIOS or using a UEFI shell, or you will meet with a kernel panic。',
        downloadSource: "Download From",
        recommend: 'Recommend',
        failedToGetSN: 'Failed to read SMBIOS info from current system. Tongfang Hackintosh Utility will generate new SMBIOS info.',
        downloadFailed: 'Errors occurred while downloading config. Please restart App and try again.',

        update: '更新'
    }
};

export const str = name => {
    const defaultLanguage = "en",
        userLang = navigator.language;
    if (strings[userLang] && strings[userLang][name]) return strings[userLang][name];
    else return strings[defaultLanguage][name];
};

export default str;
