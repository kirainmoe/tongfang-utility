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
            "在此电脑上没有找到兼容设备。请确认你的笔记本是 **同方模具**，且系统能识别到：制造商 ID 为 0x048d, 产品 ID 为 0xce00 的 ITE Devices(8291)。",
        hidCommFailedRevisionNotMatch:
            "另一个 Tongfang Hackintosh Utility 的实例正在运行。",
        hidCommFailedLinuxUnauthorized:
            "Tongfang Hackintosh Utility 正在 Linux 下运行，但未能获取 root 权限，无权访问 HID 设备。",
        iteSupport: "* ITE 0.03 版本的键盘灯控制代码来自 rodgomesc 的项目 AUCC.",
        monoColor: "固定颜色",
        breathing: "呼吸",
        wave: "波浪",
        rainbow: "彩虹",
        flash: "闪烁",
        mix: "渐变",
        brightness: "键盘灯亮度",
        speed: "变换速度",
        keyboardSwitch: "键盘灯开关",

        toolsDescription: "部分功能需要授权。",
        fixSleep: "调节睡眠参数",
        fixSleepDescription: "调节睡眠参数，修复睡眠睡死、自动唤醒等问题。",
        hiDPI: "启用/禁用 HiDPI",
        hiDPIEnabled: '检测到当前系统已经启用了 HiDPI，若继续操作将恢复未启用 HiDPI 的状态。你想关闭 HiDPI 吗？操作完成后需要重启系统。',
        hiDPIDescription:
            "在笔记本内建屏幕中启用缩放 (HiDPI) 功能，降低可视分辨率使得文字渲染更清晰(需要重启)。",
        kextCache: "重建 Kext 缓存",
        kextCacheDescription: "重建内核拓展缓存，以使某些对 Kext 的更改生效。",
        installTongfangFnDaemon: "安装快捷键守护程序",
        installTongfangFnDaemonDescription:
            "安装同方 Fn 快捷键守护程序，以使 Fn+F1~F7 和双击开关触摸板功能正常使用。",
        pleaseWait: "操作正在执行中，这可能需要几十秒或更长时间，请等待操作完成...",
        success: "成功",
        state: "状态",
        installed: "已安装",
        notInstalled: "未安装",
        successDescription: "所执行的操作已完成。",
        ToolboxCannotRunningOnWinDescription:
            "工具箱中的功能仅用于优化在 macOS 系统下的使用体验，无法在 Windows / Linux 平台上使用。",
        onlyForBOE0747: "提示：一键开启 HiDPI 功能仅适用于搭载京东方 BOE0747 15.6' 屏幕的设备，如果你手动更换过屏幕或你的原厂屏幕不是此型号，那么可能会开启失败。命令执行完成后请重启电脑，并在显示器设置中调节分辨率为 1424x802.",

        configure: "配置文件",
        configureDescription: "管理、更新和定制 OpenCore 配置文件。",
        laptopModel: "笔记本机型",
        selectModel: "选择机型/模具",
        injectOption: "驱动/补丁注入选项",
        injectAirport: "添加博通无线网卡驱动",
        injectIntelWiFi: "添加 Intel 无线网卡驱动",
        injectIntelWiFiAX200: "添加 Intel 无线网卡驱动 (AX200)",
        injectIntelBluetooth: "添加因特尔蓝牙驱动",
        injectBrcmBluetooth: "添加博通蓝牙驱动",
        injectHoRNDIS: "添加 USB 网络共享驱动",
        inject4KSupport: "添加 4K 内屏补丁",
        disablePM981: "屏蔽不兼容的 NVMe 硬盘",
        useFakeSMC: '使用传统 SMC 驱动(不推荐)',
        useBigSur: 'macOS 11.0 测试版支持',
        nvmefix: '加载 NVMe 电源管理',
        loadguc: '加载 Apple GuC 核显固件',
        smbiosInfo: "硬件识别信息",
        getSMBIOSFromGeneration: "随机生成",
        getSMBIOSFromSystem: "从系统读取",
        smbiosModel: "型号",
        smbiosSN: "序列号",
        smbiosMLB: "主板序列号",
        smbiosSmUUID: "系统 UUID",
        regenerate: "重新生成 SMBIOS 信息",
        versionInfo: "版本信息",
        localVersion: "当前引导版本",
        latestVersion: "最新版本",
        getLatest: "获取最新配置文件",
        downloadWait: "正在下载，请等待",
        generating: "正在生成 EFI...",
        cannotDownload: "点此查看无法正常下载的解决方案",
        cannotDownloadSolution: `
        <p>如果由于各种原因无法下载配置文件，请尝试以下解决方案：</p>
        <ul>
            <li>点击<a onclick="window.location.reload()">这里重载 App</a>，然后重试下载。</li>
            <li>前往以下链接下载配置文件模板压缩包，<b>改名为 OpenCore.zip 并放置到桌面的 Tongfang_EFI 文件夹下</b>，然后重新运行本程序，勾选你需要的选项，然后点击"从本地生成 EFI"。</li>
        </ul>
        `,
        generateEFI: "从本地文件生成 EFI",
        successInfo:
            "已将最新 OpenCore 配置文件下载到当前用户桌面的 `Tongfang_EFI` 文件夹中。请将桌面的 Tongfang_EFI/BOOT 和 Tongfang_EFI/OC 复制到 U 盘或硬盘中。",
        successInstructionUSB:
            "对于 U 盘引导用户：请将 BOOT 和 OC 文件夹复制到 U 盘 ESP 分区的 EFI/BOOT 和 EFI/OC 下。",
        successInstructionHD:
            "对于硬盘引导用户：请将 BOOT 内的 BOOTx64.efi 改名为 OpenCore.efi，然后将 BOOT 和 OC 复制到硬盘 ESP 分区的 EFI/BOOT 和 EFI/OC 下，在 Windows 中使用 DiskGenius ，添加 UEFI 启动项指向 EFI/BOOT/OpenCore.efi （请注意不是指向 EFI/OC/OpenCore.efi）。",
        deleteBeforeReplace: "如果 ESP 分区中已存在 OC 文件夹，请先将其删除之后再替换。如果你正在使用 macOS, 点击下面的图标可以快速复制到硬盘 / U 盘上的 ESP 分区。",
        backward: "我知道了，这就去和苹果对线",
        requirement4k:
            "请注意：同方 GJ5CN64 / GI5CN54 模具，需要解锁 BIOS 或使用 UEFI Shell 修改 DVMT Pre-allocated 大小为 64M 后方可支持 4K 内屏，否则会导致内核崩溃.",
        dontUseDefault: '请注意：程序检测到你正在使用配置文件模板默认的 SMBIOS 信息（序列号为 C02X3088KGYG 或 C02WM0Q0KGYG）。<br><br>使用配置文件模板中的默认序列号是不被推荐的行为，可能会导致你无法使用与 Apple ID 关联的服务，建议重新生成 SMBIOS 信息。<br><br>你想要重新生成吗？第一次使用新的 SMBIOS 信息引导 macOS 时，可能会要求你重新登录与 Apple ID 关联的服务 (iCloud, 随航等)。',
        failedToGetSN: '无法从系统获取 SMBIOS 信息，请确认当前系统的 SMBIOS 有效。软件将自动生成一组 SMBIOS 信息。',
        youAreUsing: "你正在使用",
        officialLatest: "官方最新版本是",
        updateRemind:
            "为了防止发生兼容性问题，请前往 https://tongfang.kirainmoe.com 更新 Tongfang Hackintosh Utility 后再管理配置文件。",
        downloadSource: "请选择下载源（若下载过慢可以尝试换一个源，如果你不知道这是什么，保持默认即可）",
        recommend: '推荐',
        downloadFailed: '下载失败，请重启程序尝试重新下载。如果你在 Windows 下，可能会遇到 operation not permitted 问题，请多试几次。',
        whatShouldIChoose: '我该如何选择？',
        chooseGuide: 
`如果你更换了博通无线网卡（DW1830, DW1560, DW1820A..），建议你勾选 “添加博通无线网卡驱动” 和 “添加博通蓝牙驱动”。<br><br>
如果你更换了白果拆机卡 (BCM94360CS2, BCM943602CS..)，建议你勾选 “添加博通无线网卡驱动”，不必勾选 “添加博通蓝牙驱动”。<br><br>
如果你使用 Intel 原装无线网卡 (AC9462, AC9560, AX200)，可以勾选 “添加因特尔蓝牙驱动”，和 “添加 Intel 无线网卡驱动”，并在 macOS 下使用 HeliPort 客户端连接无线网络。<br><br>
如果你需要使用 Android 设备通过 USB 共享网络，可以勾选 “添加 USB 网络共享驱动”。请注意并不是所有的 Android 手机都兼容此驱动。<br><br>
如果你更换了笔记本内屏为 4K 分辨率或换屏后开机卡在 IOConsoleUsers，建议你勾选 “添加 4K 内屏补丁”；若内屏为普通 1080p 屏幕请不要勾选，否则会遇到睡眠唤醒问题！<br><br>
如果你要安装 macOS 11.0 Big Sur，请勾选“macOS 11.0 测试版支持”。需要注意的是 macOS 11.0 暂时不支持 4K 内屏。<br><br>
如果你正在使用三星 PM981(a)，镁光 2200s 等 macOS 不兼容的 NVMe 硬盘，请将其插到指定的 m.2 插槽，然后勾选 “屏蔽不兼容的 NVMe 硬盘”。<br><br>
如果你遇到睡眠无法唤醒的问题：没有更换 4K 内屏的用户请不要勾选“添加 4K 内屏补丁”，8 代 CPU 用户请尝试不要勾选“加载 Apple GuC” 固件。<br><br>`,
        dontCheck4kIfNotRequire: '如果你的笔记本 *内屏* 不是 4K 分辨率，请不要勾选此选项，否则在睡眠后你将无法正常唤醒设备。',
        unknown: "未知",
        assistPackageNotDownloaded: "Intel 蓝牙驱动和 itlwm Wi-Fi 驱动需要下载后方可使用，请手动前往更新页面下载拓展包。",
        goDownloadAssistPackage: "第一次运行程序或清除缓存后，需要下载拓展包才能注入 Intel 蓝牙固件上传驱动和 WiFi 驱动，或开启无障碍支持。<br><br>是否前往更新页面下载拓展包？",
        needHeliport: "在配置文件中注入 Intel Wi-Fi 驱动，需要配合 macOS 下的 HeliPort 客户端管理网络。<br><br>请自行前往 macOS 版本的 Tongfang Hackintosh Utility 的实验室或其它渠道下载 HeliPort 客户端。",
        itlwmUnique: "只能注入 itlwm.kext (适用于 AC9462, AC9560...) 或 itlwmx.kext (适用于 AX200) 其中之一，否则可能会有无法预料的问题发生。",
        accessibility: "引导时开启无障碍支持(旁白)",
        voiceOverNotDownloaded: "引导时启用无障碍支持（旁白）需要额外下载语音包，是否前往更新页面下载？",
        accessibilityDescription: "【无障碍支持模式】是为方便阅读屏幕内容有困难的用户使用电脑而产生的模式。开启此模式后，将会在 OpenCore 引导时使用语音提示启动项，同时会关闭 OpenCore 图形界面。",
        bootChime: "启用模拟白果开机声音",
        bestPerformance: "CPU 最佳性能模式",
        bestPerformanceTips: "提醒：开启 CPU 最佳性能模式将会显著提升 CPU 的性能，但同时也会显著降低使用电池时的续航。",

        about: '关于 Tongfang Hackintosh Utility',

        update: '更新',
        currentVersion: '当前版本',
        fetchingLatest: '正在获取远端版本...',
        thisIsAForceUpdate: ' 这是一个强制更新版本，App 无法自动完成更新，你需要到 https://tongfang.kirainmoe.com/ 手动下载最新版本。',
        newVersionAvailable: `Tongfang Hackintosh Utility 有新版本 $1 可用，App 将在 $2 秒后开始更新；期间请不要退出程序。`,
        usingLatest: '你正在使用最新版本的 Tongfang Hackintosh Utility.',
        downloadRemoteVersion: '正在更新 Tongfang Hackintosh Utility，请稍等……',
        updateSuccess: '程序更新成功，请重启程序应用更改。',
        updateFailed: '程序更新时出现错误，请尝试手动从 https://tongfang.kirainmoe.com 下载最新版本。',
        updateRequired: '为防止出现兼容性问题，Tongfang Hackintosh Utility 需要更新，即将为你跳转到更新页面。',

        labRemind: '提醒：实验室的功能可能是不稳定的，仅供尝鲜使用，并且后期可能会删除部分功能。',
        intelWifi: '智能驱动 Intel WiFi',
        intelWifiDescription: '下载并自动生成来自 @zxystd 的 Intel WiFi 驱动。',
        intelWifiRemind: '请注意，此驱动仅能够连接 WEP/WPA2 加密的网络，且需要预先写入 SSID 和密码（目前支持最多4组网络名和密码）；并且暂时不支持隔空投送等基于 IO80211 的功能。' +
          '加载完成后，请查看设置 => 网络中是否出现新的"以太网"接口。如果没有出现，说明固件上传失败，请先关机断电几分钟后再试。',
        downloadStatus: '下载状态',
        undownloaded: '未下载，前往下载',
        downloaded: '已下载',
        clickToDownload: '点击下载 itlwm.kext',
        successAndRefersh: '下载成功',
        loadStatus: '加载状态',
        loaded: '已加载',
        unloaded: '未加载',
        loadSuccess: '加载成功，请查看设置 => 网络中是否出现新的"以太网"接口。如果没有出现，说明固件上传失败，请先关机断电几分钟后再试。',
        unloadSuccess: '卸载成功。',
        unsuccess: '未成功',
        notDownloaded: '未找到 itlwm.kext，请先点击上面的下载按钮。',
        loadKext: '加载驱动',
        unloadKext: '卸载驱动（更换网络前需要先卸载）',
        useHeliport: '若要使用 Intel Wi-Fi，推荐在下载配置文件时勾选 “添加 Intel 无线网卡驱动”，并在 macOS 下使用 HeliPort 客户端管理无线网络。',
        downloadHeliport: '点击下面的图标可以下载 HeliPort 客户端；如果使用 HeliPort 无法联网，请尝试将电脑断电几分钟后，重新启动尝试联网。',
        continueUse: '新版 itlwm 不再支持填写 SSID 和密码驱动，请下载 HeliPort 使用。',
        continue: '继续使用',
        downloadingAssistPackage: "正在下载驱动拓展包，请稍等，视网络环境不同，这可能需要几分钟的时间...",
        downloadDone: '拓展包下载完成。',
        downloadingVoiceOver: "正在下载无障碍语音包，请稍等。由于语音包体积较大，视网络环境不同，这可能需要几分钟的时间...",
        voiceOverDone: "语音包下载完成。",

        compatCheck: '兼容检查',
        compatCheckDescription: '检查在这台电脑上是否能正常安装 macOS。',
        compatCheckForReference: 'Tips: 检查结果仅供解决问题的参考，不代表你的电脑一定能安装或一定不能安装 macOS。如果上面的检测结果有红色的内容，请先解决相应的问题。',
        cannotGetHardwareInfo: '获取硬件信息时发生错误。',

        failedToConnectServer: "连接更新服务器失败。部分功能和下载源可能无法使用。",
        discontinued: "【公告】同方机型 EFI 和黑苹果助手将于 macOS Big Sur 正式版发布后停止更新，并停止社区支持。若您有意参与后续维护，仍然可以前往 GitHub 发起 pull request; 感谢所有用户的支持。",
        
        exit: "退出程序",
        minimize: "最小化程序",
        maximize: "最大化程序",
        logo: "图标",
        downloadFromBitbucket: "从 BitBucket 下载",
        downloadFromGitHub: "从 GitHub 下载",
        downloadFromJSDelivr: "从 JSDelivr 下载",
        selectOtherModel: "选择其它机型",
        filterModel: "搜索机型..",
        approve: "确定",
        cancel: "取消",
        approveLicense: "我同意",
        dontApproveLicense: "我不同意",

        // guidance
        stepIndicate: "$1 / $2",
        getReady: "欢迎",
        customizeHardware: "定制配置文件",
        setSMBIOS: "设置识别信息",
        generate: "生成配置文件",
        finish: "完成",

        checkComponentVersion: "检查组件版本",
        readLicense: "阅读许可协议",
        pleaseReadLicense: "在开始使用 hasee-tongfang-macos 仓库提供的配置文件（以下简称 EFI）之前，请先阅读以下许可协议：",
        license:
`<h3>禁止商业使用</h3>
<p><b>对于本配置文件的一切开发、维护旨在学习，请勿用于商业用途和非法用途</b>。hasee-tongfang-macos 仓库和本工具提供的所有配置文件是完全免费的。不允许任何人以任何形式、任何价格出售和重新分发此配置文件。</p>
<p>这意味着你不能：</p>
<ul>
    <li>针对仓库或本工具提供的 EFI，提供包括但不限于交易下载、付费下载、邀请下载等 “将下载与付费绑定” 的服务。</li>
</ul>

<h3>对衍生产品的规定</h3>
<p>若在此配置文件的基础上适配其它机型的配置文件，需要将成果向任何人开放，并保留对本项目的引用和鸣谢 (Credits) 信息。若在任何项目中，使用了从此仓库中获取的任何由其他人创作的内容，需要保留对本项目的引用和他人的版权信息。</p>
<p>这意味着你不能：</p>
<ul>
    <li>在此配置文件的基础上适配其他机型的 EFI 并提供上述付费下载服务。</li>
    <li>重新分发此 EFI 或适配其它机型 EFI 时，删除版权信息或鸣谢声明。</li>
</ul>

<h3>免责声明</h3>
<p>此配置文件已经过作者测试，但倘若您要使用此配置文件，仍需自行承担由此造成的直接或间接风险，包括但不限于软件损坏、数据丢失、硬件损坏等。作者和贡献者将不对这些风险承担任何形式的责任。</p>`,
        nextAndAgree: "点击\"下一步\"则表示您已阅读并同意上述协议。",
        latestConfigVersion: "最新配置文件版本",
        intelVersion: "Intel 驱动包状态",
        voiceoverVersion: "无障碍语音包状态",
        updateable: "建议更新",
        goDownload: "前往下载",
        optional: "（可选）",
        currentModel: "当前选择的机型",
        macOSversion: "选择你要安装的 macOS 版本",
        internetConnection: "选择你的网卡型号",
        appleWireless: "Mac 原装无线网卡",
        appleWirelessModels: "常见型号为 BCM94360CS2, BCM943602CS 等",
        broadcomWireless: "博通/戴尔兼容无线网卡",
        broadcomWirelessModels: "常见型号为 DW1830, DW1560, DW1820A 等",
        intelWireless: "Intel 无线网卡",
        intelWirelessModels: "常见型号为 Intel AC9462, AC9560, AX200 等",
        usbRNDIS: "Android USB 共享网络",
        innerScreenResolution: "选择笔记本内屏的分辨率",
        specialHardware: "配置特殊硬件",
        disableIncompatibleDescription: "如果你的笔记本中安装了三星 PM981(a), 镁光 2200s 等 macOS 不兼容的 NVMe 硬盘，请将其插到第一个 m.2 硬盘插槽并勾选此项；若没有上述硬盘请不要勾选。",
        nvmeFixDescription: "如果你发现 SSD 在 macOS 下的发热量很大，请尝试勾选此项。",
        gucDescription: "加载 GuC 固件能够提升核显在视频剪辑等高负载环境下的性能，但在部分机型上可能导致睡眠后无法唤醒。",
        bigSurNotSupport4K: "由于上游驱动 (WhateverGreen) 尚未兼容的原因，macOS Big Sur 下 4K 屏幕将无法驱动。",
        useAirportItlwm: "使用原生接口的 Intel 驱动",
        useAirportItlwmDescription: "可以使用系统原生 IO80211 接口联网（而不需要使用 HeliPort）和接力功能，但可能无法连接 iPhone 的共享热点。",
        setSMBIOSInfo: "SMBIOS 信息设置",
        SMBIOSInfoSource: "当前 SMBIOS 信息来源",
        leaveItAsIsIfYouDontKnow: "如果你不知道以下内容有什么作用，那么不修改保持默认值即可。",
        personalize: "个性化设置",
        readyToGenerate: "准备生成配置文件",
        confirmYourChoose: "确认你的选择",
        YourModel: "你选择的机型 / 模具是",
        YourOSToBeInstalled: "你将要安装的 macOS 版本是",
        YourWirelessCard: "你选择的联网方式是",
        YourResolution: "你的内屏分辨率是",
        addition: "同时使用",
        nativeItlwm: "使用原生接口，无需 HeliPort",
        heliportItlwm: "需要 HeliPort mac 客户端用于联网",
        YouDisabledNVMe: "屏蔽了位于第一个 m.2 插槽的 NVMe 硬盘",
        YouEnabledNVMeFix: "启用了 NVMe 电源管理驱动",
        YouEnabledGuC: "加载了核显的 Apple GuC 固件",
        YouEnabledCPUBestPerformance: "CPU 模式设置为性能模式",
        YouEnabledAccessibility: "开启了引导时的无障碍语音提示并关闭了图形界面",
        clickToGenerate: "确认上述选项无误后，请点击\"生成\"来下载或生成当前机型的配置文件。如果下载配置文件时遇到问题，请",
        cannotDownloadTitle: "无法完成下载？",
        diskName: "分区名称",
        diskIndex: "分区描述符",
        diskSize: "分区大小",
        confirmToReplace: "确定要将 EFI 文件复制到 $1 (描述符：$2) 上吗？",
        copyComplete: "EFI 文件复制完成！<br>*上一个版本的 EFI 文件已经备份到 EFI/OC-Backup 下。",
        intelNotDownloaded: "Intel 驱动包尚未下载，需要先下载 Intel 无线驱动包才可以注入无线网卡驱动。",
        accessibilityNotDownloaded: "无障碍语音包尚未下载，需要先下载才可以启用引导语音提醒。",
        conflictDetected: "检测到无效的选项",
        resolveConflict: "看起来您似乎选择了某些无效的选项。在生成 EFI 之前，请解决以下问题：",
        prevStep: "上一步",
        nextStep: "下一步",

        dashboard: "仪表盘",
        deviceInfo: "设备信息",
        resourceUsage: "资源占用",
        cpuTemperature: "CPU 温度",
        cpuUtilization: "CPU 占用率",
        memoryUtilization: "内存占用率",
        storageUtilization: "存储使用率",
        realModel: "真实设备型号",
        computerName: "设备名称",
        osVersion: "系统版本",
        batteryInfo: "电池信息",
        batteryNotInstalled: "电池未安装",
        charging: "正在充电",
        setOwnerInfo: "设置机主信息",
        ownerName: "机主昵称",
        ownerAvatar: "机主头像链接（可直接填写 QQ 号）",
        morning: "早上好",
        noon: "中午好",
        afternoon: "下午好",
        evening: "晚上好"
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
        iteSupport: "* Controlling of ITE revision 0.03 is supported by @rodgomesc.",

        toolsDescription: "Some operation requires to be done as superuser.",
        fixSleep: "Fix sleep",
        fixSleepDescription: 'Run "pmset" command to fix broken sleep.',
        hiDPI: "Enable HiDPI",
        hiDPIEnabled: 'Tongfang Hackintosh Utility has found that HiDPI has already been enabled. Do you want to disable HiDPI?',
        hiDPIDescription: "Make the font more clear (only supports BOE0747).",
        kextCache: "Rebuild kextcache",
        kextCacheDescription: 'Run "kextcache -i /" command to refresh the kernel extension cache.',
        installTongfangFnDaemon: "Install Fn Daemon",
        installTongfangFnDaemonDescription:
            "Install Tongfang Fn-shortcut Daemon to fix function keys and double-tap switch touchpad.",
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
        injectOption: "Kext/Patch Injection",
        injectAirport: "Broadcom WiFi support",
        injectIntelWiFi: "Intel WiFi support",
        injectIntelWiFiAX200: "Intel WiFi support (AX200)",
        injectIntelBluetooth: "Intel Bluetooth support",
        injectBrcmBluetooth: "Broadcom bluetooth support",
        injectHoRNDIS: "Android USB network tethering",
        inject4KSupport: "4K resolution monitor",
        disablePM981: "Disable incompatible NVMe",
        useBigSur: 'Preliminary support for macOS 11.0',
        nvmefix: 'Load NVMeFix.kext',
        loadguc: 'Load Apple GuC Firmware',
        smbiosInfo: "SMBIOS",
        getSMBIOSFromGeneration: "Randomly generated",
        getSMBIOSFromSystem: "Read from system",
        smbiosModel: "Model",
        smbiosSN: "SerialNumber",
        smbiosMLB: "Motherboard SerialNumber",
        smbiosSmUUID: "System UUID",
        regenerate: "Generate New",
        versionInfo: "Version Info",
        localVersion: "Current boot",
        latestVersion: "Latest version",
        getLatest: "Get the latest config",
        downloadWait: "Downloading, please wait..",
        generating: "Generating EFI...",
        cannotDownload: "Having trouble downloading?",
        cannotDownloadSolution: `
        <p>If you have failed to download the config file, please try to:</p>
        <ul>
            <li><a onclick="window.location.reload()">Reload App</a> and retry.</li>
            <li>Download the config template archive from the following links, <b>rename the zip you download to "OpenCore.zip", and put it into "Tongfang_EFI" directory in your desktop</b>. Restart this App and click "Generate from local file".</li>
        </ul>
        `,
        generateEFI: "Generate from local file",
        successInfo:
            "Successfully downloaded the latest OC config to ~/Desktop/Tongfang_EFI. Please copy `BOOT` and `OC` folder to ESP.",
        successInstructionUSB:
            "For users booting from USB flash: Copy `BOOT` and `OC` folder to `EFI/BOOT` and `EFI/OC` in your ESP. ",
        successInstructionHD:
            "For users booting from hard disk: Rename `BOOT/BOOTx64.efi` to `BOOT/OpenCore.efi`, and copy `BOOT` and `OC` folder to `EFI/BOOT` and `EFI/OC` in your ESP, then add a boot entry pointing to `BOOT/OpenCore.efi`. ",
        deleteBeforeReplace: "If `EFI/OC` has already existed in your ESP, please delete it before copy. If you are using macOS, you can quickly copy EFI files to ESP by clicking the following icons.",
        backward: "Having fun hackintoshing!",
        youAreUsing: "You are using ",
        officialLatest: "The latest version is ",
        updateRemind:
            "Please consider update Tongfang Hackintosh Utility from https://tongfang.kirainmoe.com to avoid compatibility problems.",
        requirement4k:
            'Warning: For Tongfang GJ5CN64 / GI5CN54 barebones\' user, you need to set "DVMT Pre-allocated" to 64MB by unlocking BIOS or using a UEFI shell, or you will meet with a kernel panic。',
        downloadSource: "Download From",
        recommend: 'Recommend',
        failedToGetSN: 'Failed to read SMBIOS info from current system. Tongfang Hackintosh Utility will generate new SMBIOS info.',
        downloadFailed: 'Errors occurred while downloading config. Please restart App and try again.',
        dontCheck4kIfNotRequire: 'Don\'t check this option unless you have a 4K built-in monitor, or you will meet problems of sleep/hibernation.',
        whatShouldIChoose: 'Which should I choose?',
        chooseGuide: 
`If you installed Broadcom Wi-Fi card (DW1830, DW1860, DW1820A..), check "Broadcom WiFi support" and "Broadcom bluetooth support".<br><br>
If you installed Apple Wi-Fi card (BCM94360CS2, BCM943602CS..), check "Broadcom WiFi support".<br><br>
If you had Intel Wi-Fi card (AC9462, AC9560, AX200), check "Intel bluetooth support".<br><br>
If you want to try Intel Wi-Fi supported by @OpenIntelWireless, check "Intel WiFi support" pair with HeliPort client on macOS.<br><br>
If you want to tether network via an Android device, check "USB network tethering". <br><br>
If you replaced the monitor of 4K resolution or stuck on "IOConsoleUsers" while booting macOS, check "4K resolution monitor".<br><br>
If you installed Samsung PM981(a), Micron 2200s or other NVMe drives that are not compatible with macOS, check "Disable incompatible NVMe", and plug the incompatible SSD in m.2 slot 1.`,
        unknown: 'Unknown',
        assistPackageNotDownloaded: "Intel bluetooth driver and itlwm Wi-Fi driver require to download extension package. Please go to \"Update\" page and download it.",
        goDownloadAssistPackage: "You are running the app for the first time. We recommend you to download extension package to enable Intel bluetooth and Wi-Fi injecting.<br><br>Do you want to download it?",
        downloadingAssistPackage: "Downloading, please wait...",
        downloadDone: 'Download success.',
        needHeliport: "To make Intel Wi-Fi work, you will require \"HeliPort\" client on macOS to manage networks. <br><br>You can download the \"HeliPort.app\" from \"Tongfang Hackintosh Utility for mac\" or any other channel.",
        itlwmUnique: "You can only select one of itlwm.kext (for AC9462, AC9560...) and itlwmx.kext (for AX200) ",
        bestPerformance: "CPU Best Performance Mode",
        bestPerformanceTips: "Enabling CPU best performance mode will remarkably promote the CPU performance, but in the meanwhile it will reduce battery endurance.",


        update: 'Update',
        currentVersion: 'Current version',
        fetchingLatest: 'Fetching remote version...',
        thisIsAForceUpdate: ' This is a force-update version, you need to go to https://tongfang.kirainmoe.com/ and download the latest version manually.',
        newVersionAvailable: `New version $1 is available. App will update in $2 seconds. Don't quit the app before update is done.`,
        usingLatest: 'You are running the latest version of Tongfang Hackintosh Utility.',
        downloadRemoteVersion: 'Updating Tongfang Hackintosh Utility, please wait……',
        updateSuccess: 'App updated. Please restart the app.',
        updateFailed: 'Error occurred while updating. Please go to https://tongfang.kirainmoe.com and download the latest version manually.',
        updateRequired: 'Tongfang Hackintosh Utility requests an update to avoid compatibility problems. I\'m taking you to the update page.',

        labRemind: 'Warning: Features in this lab can be unstable, use at your own risk. Some features may be removed in the future release.',
        intelWifi: 'Intel WiFi',
        intelWifiDescription: 'Download and generate Intel WiFi kexts by @zxystd.',
        intelWifiRemind: 'Notes: This kext can only connect to WEP/WPA2 encrypted network and requires to predict SSID/password (at most 4 pairs). And the features based on IO80211 like Airdrop are not available.',
        downloadStatus: 'Download status',
        undownloaded: 'Not downloaded',
        downloaded: 'Downloaded',
        clickToDownload: 'Click to download itlwm.kext',
        successAndRefersh: 'Download success',
        loadStatus: 'Load status',
        loaded: 'Loaded',
        unloaded: 'Unloaded',
        loadSuccess: 'Loading itlwm.kext successfully, please check if a new Ethernet interface appears in System Preference Setting. If it doesn\'t appear, please completely showdown your laptop, reboot in a few minutes and try again.',
        unloadSuccess: 'itlwm.kext unloaded',
        unsuccess: 'Failed',
        notDownloaded: 'itlwm.kext not found, please download it first.',
        loadKext: 'Load Kext',
        unloadKext: 'Unload Kext (before switching network)',
        useHeliport: 'If you want to connect to network via an Intel Wi-Fi card, it is recommended to inject driver to config directly by checking "Intel Wi-Fi support" in "Configuration" page, and use "HeliPort.app" client to manage wireless networks on macOS.',
        downloadHeliport: 'Click the following icon to download "HeliPort.app" client. If HeliPort is not working, please completely shut down the laptop and try again.',
        continueUse: '',
        continue: 'Continue',

        failedToConnectServer: "Failed to connect to the update server, some download sources will be unavailable.",
        discontinued: "Tongfang Hackintosh Project will be discontinued after the release of macOS Big Sur due to personal reasons. Community support will be stopped in the meanwhile. Thanks for the support of all users.",

        exit: "Exit",
        minimize: "Minimize Window",
        maximize: "Maximize Window",
        logo: "Logo",
        downloadFromBitbucket: "Download from BitBucket",
        downloadFromGitHub: "Download from GitHub",
        downloadFromJSDelivr: "Download from JSDelivr",
        selectOtherModel: "Other..",
        filterModel: "Type and search your model...",
        approve: "OK",
        cancel: "Cancel",
        approveLicense: "Approve",
        dontApproveLicense: "Disapprove",
        downloadingVoiceOver: "Downloading VoiceOver package...",
        voiceOverDone: "VoiceOver package downloaded.",
        accessibility: "Accessibility Mode(VoiceOver)",
        bootChime: "Enable Boot Chime",
        accessibilityDescription: "【Accessiblity Mode】 is designed for those who have trouble reading the screen text. Enable Accessibility Mode will instruct you with voice when you boot OpenCore, and disable OpenCore GUI.",

        // guidance
        stepIndicate: "$1 / $2",
        getReady: "Welcome",
        customizeHardware: "Hardware",
        setSMBIOS: "Set SMBIOS",
        generate: "Generate Config",
        finish: "Done",

        checkComponentVersion: "Check Component Version",
        readLicense: "Read License",
        pleaseReadLicense: "Before using the config provided by 'hasee-tongfang-macos', please read the following statement:",
        license:
`<h3>No Commercial Use</h3>
<p><b>Commercial use of the config and its *derivatives* is prohibited. </b>This includes but not limited to:
</p>
<ul>
    <li>Sell the config provided by this repo at any price. </li>
    <li>Redistribute the config provided by this repo and provide paid download service.</li>
</ul>

<h3>About Derivatives</h3>
<p>If you are creating a new config which is based on this config, your product must also be free for all users.</p>
<p>You should reserve the copyright and credit statement when you create a new config which is based on this config for other model.</p>

<h3>Free of any Responsibilities</h3>
<p>Authors and contributors are not guaranteed for any damage of your device.</p>`,
        nextAndAgree: "If you have read and agreed the license, click \"Next\".",
        latestConfigVersion: "Latest config version",
        intelVersion: "Intel driver package",
        voiceoverVersion: "VoiceOver package",
        updateable: "Require update",
        goDownload: "Go to download",
        optional: "(Optional)",
        currentModel: "Current selected model / barebone",
        macOSversion: "Choose a macOS version you want to install:",
        internetConnection: "Choose wireless card vendor:",
        appleWireless: "Apple Wireless Card",
        appleWirelessModels: "e.g. BCM94360CS2, BCM943602CS...",
        broadcomWireless: "Dell Wireless Card",
        broadcomWirelessModels: "e.g. DW1830, DW1560, DW1820A...",
        intelWireless: "Intel Wireless Card",
        intelWirelessModels: "e.g. Intel AC9462, AC9560, AX200 ...",
        usbRNDIS: "Android USB Tethering",
        innerScreenResolution: "Choose laptop resolution:",
        specialHardware: "Make settings for special hardwares:",
        disableIncompatibleDescription: "Enable this option if you have a NVMe that is not compatible with macOS (e.g. Samsung PM981(a) / Micron 2200s). Leave this option unchecked if you don't have one of them.",
        nvmeFixDescription: "Enable this option if your NVMe SSD temperature is abnormal in macOS.",
        gucDescription: "Loading Apple GuC firmware can promote the performance of Intel UHD Graphics, but will cause sleep wake failure on some devices.",
        bigSurNotSupport4K: "4K display is currently unavailable in macOS 11.0 Big Sur.",
        useAirportItlwm: "Use AirportItlwm",
        useAirportItlwmDescription: "Use macOS IO80211 interface rather than HeliPort to connect to network and bring location and Hand-off feature. Note that AirportItlwm does not support iPhone/iPad hotspot now.",
        setSMBIOSInfo: "Set SMBIOS information",
        SMBIOSInfoSource: "Current SMBIOS information source",
        leaveItAsIsIfYouDontKnow: "leave them as is if you don't know their functions.",
        personalize: "Personalize",
        readyToGenerate: "Ready to generate config",
        confirmYourChoose: "Confirm your choice",
        YourModel: "Your model / barebone is",
        YourOSToBeInstalled: "You are going to install",
        YourWirelessCard: "Your wireless network card vendor is",
        YourResolution: "Your laptop screen resolution is",
        addition: "with ",
        nativeItlwm: "using AirportItlwm",
        heliportItlwm: "you will need HeliPort client to manage network",
        YouDisabledNVMe: "disabled the NVMe SSD in m.2 slot 1",
        YouEnabledNVMeFix: "enabled NVMeFix",
        YouEnabledGuC: "loaded Apple GuC firmware",
        YouEnabledCPUBestPerformance: "CPU mode is best performance mode",
        YouEnabledAccessibility: "enabled VoiceOver picker assist",
        clickToGenerate: "Is this OK? If yes, select a download source and click \"Get the latest config\"! ",
        cannotDownloadTitle: "Having trouble?",
        diskName: "Disk Name",
        diskIndex: "Disk ID",
        diskSize: "Disk Size",
        confirmToReplace: "Are you sure to copy EFI files to $1 (Disk ID: $2)?",
        copyComplete: "EFI copied！<br>*Previous version of EFI has been backed up to EFI/OC-Backup.",
        intelNotDownloaded: "Intel driver package not downloaded, you need to downad Intel drivers before generate EFI.",
        accessibilityNotDownloaded: "VoiceOver package not downloaded.",
        conflictDetected: "Invalid options detected",
        resolveConflict: "It looks like we have some problems. We need to resolve them before generate config:",
        prevStep: "Previous",
        nextStep: "Next",

        dashboard: "Dashboard",
        deviceInfo: "Device Info",
        resourceUsage: "System Resource Usage",
        cpuTemperature: "CPU Temperature",
        cpuUtilization: "CPU Utilization",
        memoryUtilization: "Memory Utilization",
        storageUtilization: "Storage Utilization",
        realModel: "Real Model",
        computerName: "Computer Name",
        osVersion: "macOS Version",
        batteryInfo: "Battery",
        batteryNotInstalled: "Battery not installed",
        charging: "Charging",
        setOwnerInfo: "Set owner info",
        ownerName: "Owner name",
        ownerAvatar: "Owner avatar url",
        morning: "Good morning",
        noon: "Hello",
        afternoon: "Good afternoon",
        evening: "Good evening"        
    }
};

export const str = name => {
    const defaultLanguage = "en",
        userLang = navigator.language;
    if (strings[userLang] && strings[userLang][name]) return strings[userLang][name];
    else return strings[defaultLanguage][name];
};

export default str;
