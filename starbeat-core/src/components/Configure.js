import React, { Component } from "react";
import { createHashHistory } from "history";
import { Popover, Checkbox, Input, Button, message, Modal, Spin } from "antd";
import { CloudDownloadOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";

import "../styles/Configure.styl";

import str from "../resource/string";
import config from "../config";
import Plist from "../utils/plist";
import makeAlert from "../utils/makeAlert";
import Success from "../icons/Success";

import Bitbucket from "../icons/Bitbucket";
import GitHub from "../icons/GitHub";
import JSDelivr from "../icons/JSDelivr";

export default class Configure extends Component {
    barebones = [];
    models = [];
    brandTag = [];
    options = {
        airport: false,
        intel: false,
        brcm: false,
        rndis: false,
        support4k: false,
        pm981: false,
        supportBigSur: false,
        loadguc: false,
        nvmefix: false,
        intelwifi: false,
        intelwifiax200: false,
        accessibility: false,
        bootchime: false,
        bestperformance: false
    };
    kextstatRes = "";
    nvramRes = "";
    defaultOpts = [
        { label: str("injectAirport"), value: "airport", defaultVal: this.isKextLoaded("Airport") },
        { label: str("injectHoRNDIS"), value: "rndis", defaultVal: false },
        {
            label: str("injectIntelWiFi"),
            value: "intelwifi",
            defaultVal: this.isKextLoaded("itlwm"),
        },
        {
            label: str("injectIntelWiFiAX200"),
            value: "intelwifiax200",
            defaultVal: this.isKextLoaded("itlwmx"),
        },
        {
            label: str("injectBrcmBluetooth"),
            value: "brcm",
            defaultVal: this.isKextLoaded("BrcmBluetooth"),
        },
        {
            label: str("injectIntelBluetooth"),
            value: "intel",
            defaultVal: this.isKextLoaded("IntelBluetooth"),
        },
        {
            label: str("useBigSur"),
            value: "supportBigSur",
            defaultVal: this.isKextLoaded("SmartBattery"),
        },
        { label: str("inject4KSupport"), value: "support4k", defaultVal: this.hasParam("igfxmlr") },
        { label: str("disablePM981"), value: "pm981", defaultVal: this.hasParam("nvme-disabled") },
        { label: str("nvmefix"), value: "nvmefix", defaultVal: this.isKextLoaded("NVMeFix") },
        { label: str("loadguc"), value: "loadguc", defaultVal: this.hasParam("igfxfw") },
        { label: str("accessibility"), value: "accessibility", defaultVal: false },
        { label: str("bootChime"), value: "bootchime", defaultVal: false },
        { label: str("bestPerformance"), value: "bestperformance", defaultVal: false }
    ];

    constructor(props) {
        super(props);

        if (window.electron.isWin() && window.location.search.indexOf("reloaded") < 0) {
            window.location.href = window.location.href + "?reloaded=true";
        }

        /* 获取 & 生成 SMBIOS 信息 */
        let smbios = null,
            smbiosGenerated = null;
        try {
            smbios = window.electron.getMacSerial();
            smbiosGenerated = false;
        } catch (err) {
            makeAlert(str("failedToGetSN"));
        }
        /* 如果 SMBIOS 信息为空，说明程序无法获取 SMBIOS 信息，使用 macserial 随机生成 */
        if (!smbios) {
            smbios = window.electron.generateMacSerial();
            smbiosGenerated = true;
        }

        this.state = {
            latestDev: "Unknown",
            supportVersion: [],
            downloading: false,
            workStatus: str("getLatest"),
            ...smbios,
            laptop: navigator.language === "zh-CN" ? 8 : 0,
            smbiosGenerated,
            success: false,
            percent: 0,
            speed: 0,
            modal_visible: false,
            modal_content: "",
            download_url: config.download_url.bitbucket,
            modal: false,
            selecting_model: false,
        };

        this.prepareModels();
        this.checkVersion();

        for (const opt of this.defaultOpts) {
            this.options[opt["value"]] = opt["defaultVal"];
        }
    }

    componentWillMount() {
        /* 防止使用默认序列号，提示更换 */
        if (this.state.sn === "C02X3088KGYG" || this.state.sn === "C02WM0Q0KGYG") {
            makeAlert(str("dontUseDefault"), true).then(() => {
                const smbios = window.electron.generateMacSerial();
                this.setState({
                    ...smbios,
                    smbiosGenerated: true,
                });
            });
        }
    }

    componentDidMount() {
        const savePath = window.electron.getUserDir() + "/Desktop/Tongfang_EFI";
        const saveFile = savePath + "/OpenCore.zip";
        const fs = window.electron.fs();

        if (fs.existsSync(saveFile)) {
            this.setState({ workStatus: str("generateEFI") });
        }

        if (!this.isAssistDownloaded()) {
            makeAlert(str("goDownloadAssistPackage"), true).then(() => {
                createHashHistory().push("/update?target=assist");
            });
        }
    }

    /* 检查版本更新 */
    checkVersion() {
        const versionUrl = "https://api-aliyun.kirainmoe.com:2333/tongfang/version";
        fetch(versionUrl)
            .then((res) => res.json())
            .then(async (data) => {
                if (data.build > config.build || window.location.href.indexOf("github") >= 0) {
                    await makeAlert(str("updateRequired"));
                    createHashHistory().push("/update");
                } else
                    this.setState({
                        latestDev: data.latestDev,
                        download_url: `${config.download_url.jsdelivr}-${data.latestDev}.zip`,
                    });
            })
            .catch((err) => {
                message.error(str("failedToConnectServer"));
            });
    }

    /* 获取模具、机型列表，写在 config.js 中 */
    prepareModels() {
        const res = [];
        let index = 0;
        config.supported_machine.forEach((s) => {
            s.models.forEach((mach) => {
                this.barebones[index] = mach.barebone;
                this.models[index] = mach.model;
                this.brandTag[index++] = s.vendorTag;
            });
        });
        return res;
    }

    getDownloadSource() {
        const res = [];
        let index = 0;
        res.push(
            <Popover content={str("downloadFromBitbucket")} key={index++}>
                <button
                    aria-label={str("downloadFromBitbucket")}
                    key={index++}
                    className={`download-button bitbucket ${
                        this.state.download_url === config.download_url.bitbucket
                    } `}
                    onClick={() => this.setState({ download_url: config.download_url.bitbucket })}
                >
                    <Bitbucket />
                </button>
            </Popover>
        );
        res.push(
            <Popover content={str("downloadFromGitHub")} key={index++}>
                <button
                    aria-label={str("downloadFromGitHub")}
                    key={index++}
                    className={`download-button github ${
                        this.state.download_url === config.download_url.github
                    } `}
                    onClick={() => this.setState({ download_url: config.download_url.github })}
                >
                    <GitHub />
                </button>
            </Popover>
        );

        if (this.state.latestDev !== "Unknown") {
            const jsdelivrUrl = `${config.download_url.jsdelivr}-${this.state.latestDev}.zip`;
            res.push(
                <Popover
                    content={str("downloadFromJSDelivr") + `(${str("recommend")})`}
                    key={index++}
                >
                    <button
                        aria-label={str("downloadFromJSDelivr") + `(${str("recommend")})`}
                        key={index++}
                        className={`download-button jsdelivr ${
                            this.state.download_url === jsdelivrUrl
                        } `}
                        onClick={() => this.setState({ download_url: jsdelivrUrl })}
                    >
                        <JSDelivr />
                    </button>
                </Popover>
            );
        }

        return res;
    }

    /* 处理选项提醒 */
    async handleOptionChange(v, opts) {
        let selected = {};
        opts.forEach((opt) => (selected[opt.value] = 0));
        v.forEach((item) => (selected[item] = 1));

        // 勾选 4K 时显示警告
        if (!this.options.support4k && selected["support4k"]) {
            makeAlert(str("dontCheck4kIfNotRequire"));
        }

        // 对 GI5CN54 / GJ5CN64 的用户勾选 4K 时提示警告
        if (
            !this.options.support4k &&
            selected["support4k"] &&
            (this.barebones[this.state.laptop] === "GJ5CN64" ||
                this.barebones[this.state.laptop] === "GI5CN54")
        ) {
            makeAlert(str("requirement4k"));
        }

        // Intel 驱动需要拓展包
        if (
            !this.isAssistDownloaded() &&
            ((!this.options.intel && selected["intel"]) ||
                (!this.options.intelwifi && selected["intelwifi"]) ||
                (!this.options.intelwifiax200 && selected["intelwifiax200"]))
        ) {
            makeAlert(str("assistPackageNotDownloaded"));

            selected["intel"] = false;
            selected["intelwifi"] = false;
            selected["intelwifiax200"] = false;
            createHashHistory().push("/update");
        }

        if (!this.options.accessibility && selected["accessibility"]) {
            if (!this.isVoiceOverDownloaded()) {
                const res = await makeAlert(str("voiceOverNotDownloaded"), true)
                    .then(() => {
                        createHashHistory().push("/update?voiceover");
                        return true;
                    })
                    .catch(() => false);
                if (res) return;
                else selected["accessibility"] = false;
            } else {
                const res = await makeAlert(str("accessibilityDescription"), true)
                    .then(() => true)
                    .catch(() => false);
                if (!res) selected["accessibility"] = false;
            }
        }

        if (
            (!this.options.intelwifi && selected["intelwifi"]) ||
            (!this.options.intelwifiax200 && selected["intelwifiax200"])
        ) {
            makeAlert(str("needHeliport"));
        }

        if (!this.options.bestperformance && selected["bestperformance"]) {
            makeAlert(str("bestPerformaceTips"));
        }

        if (
            (this.options.intelwifi && selected["intelwifi"] && selected["intelwifiax200"]) ||
            (this.options.intelwifiax200 && selected["intelwifi"] && selected["intelwifiax200"])
        ) {
            makeAlert(str("itlwmUnique"));
        }

        for (const i in selected) {
            if (!selected.hasOwnProperty(i)) continue;
            this.options[i] = selected[i];
        }
    }

    // 辅助工具包是否下载
    isAssistDownloaded() {
        const fs = window.electron.fs();
        const userDir = window.electron.getUserDir();

        if (
            fs.existsSync(`${userDir}/.tfu/itlwm.kext`) &&
            fs.existsSync(`${userDir}/.tfu/itlwmx.kext`) &&
            fs.existsSync(`${userDir}/.tfu/IntelBluetoothFirmware.kext`)
        ) {
            return true;
        }
        return false;
    }

    // VoiceOver 是否下载
    isVoiceOverDownloaded() {
        const fs = window.electron.fs();
        const userDir = window.electron.getUserDir();

        if (
            fs.existsSync(`${userDir}/.tfu/Audio`) &&
            fs.existsSync(`${userDir}/.tfu/Audio/AXEFIAudio_zh_CN_AccountLocked.wav`)
        ) {
            return true;
        }
        return false;
    }

    renderModels() {
        const res = [];
        let index = 0,
            brand = 0;
        config.supported_machine.forEach((s) => {
            const models = [];
            s.models.forEach((mach) => {
                const tmp = index;
                models.push(
                    <Button
                        className={`model-select-button ${this.state.laptop === index}`}
                        data-index={mach.model.toLowerCase()}
                        aria-label={mach.model}
                        key={index}
                        value={index}
                        onClick={() => {
                            this.setState({
                                laptop: tmp,
                                selecting_model: false,
                            });
                        }}
                    >
                        {mach.model}
                    </Button>
                );
                index++;
            });

            res.push(
                <div className="brand-title" key={brand++}>
                    <p>{s.brand}</p>
                    {models}
                </div>
            );
        });
        return res;
    }

    // 检查 Kext 是否加载
    isKextLoaded(kextName) {
        if (!window.electron.isMac()) return false;
        if (this.kextstatRes !== "") {
            return this.kextstatRes.indexOf(kextName) >= 0;
        }
        try {
            const proc = window.require("child_process");
            const stdout = proc.execSync(`kextstat`).toString();
            this.kextstatRes = stdout;
        } catch (err) {
            return false;
        }
        return this.kextstatRes.indexOf(kextName) >= 0;
    }

    // 检查 NVRAM 中是否存在参数
    hasParam(param) {
        if (!window.electron.isMac()) return false;
        try {
            const proc = window.require("child_process");
            const stdout = proc.execSync(`nvram -p | grep "${param}"`).toString();
            return stdout !== "";
        } catch (err) {
            return false;
        }
    }

    // 获取当前 EFI 版本
    getCurrentVersionFromNVRAM() {
        if (!window.electron.isMac()) return str("unknown");
        try {
            const proc = window.require("child_process");
            const stdout = proc.execSync(`nvram -p`).toString();
            let match = stdout.trim().match(/efi-version=([^\s]+)/);
            if (match && match.length) return match[1];

            match = stdout.trim().match(/efi-version\s*([^\s]+)%00/);
            if (match && match.length) return match[1];
            return str("unknown");
        } catch (err) {
            console.log(err);
            return str("unknown");
        }
    }

    /* 显示选项 */
    getOptions() {
        const opts = this.defaultOpts;

        let nextState = {},
            defaultValues = [];
        opts.forEach((opt) => {
            nextState[opt.value] = opt.defaultVal;

            if (opt.defaultVal) defaultValues.push(opt.value);
        });

        return (
            <Checkbox.Group
                options={opts}
                defaultValue={defaultValues}
                onChange={(v) => this.handleOptionChange(v, opts)}
            />
        );
    }

    setOpt(key, value) {
        const state = {
            ...this.state,
        };
        state[key] = value;
        this.setState(state);
    }

    handleSearch(e) {
        const val = e.target.value.toLowerCase();
        if (val === "") this.stylesheet.innerHTML = "";
        else
            this.stylesheet.innerHTML = `.model-select-button:not([data-index*="${val}"]) { display: none }`;
    }

    /* 渲染 SMBIOS 信息 */
    getSMBIOSInfo() {
        return (
            <div className="smbios-input">
                <div>
                    <label>{str("smbiosModel")}</label>
                    <Input
                        onChange={(v) => this.setOpt("model", v.target.value)}
                        value={this.state.model}
                    />
                </div>
                <div>
                    <label>{str("smbiosSN")}</label>
                    <Input
                        onChange={(v) => this.setOpt("sn", v.target.value)}
                        value={this.state.sn}
                    />
                </div>
                <div>
                    <label>{str("smbiosMLB")}</label>
                    <Input
                        onChange={(v) => this.setOpt("mlb", v.target.value)}
                        value={this.state.mlb}
                    />
                </div>
                <div>
                    <label>{str("smbiosSmUUID")}</label>
                    <Input
                        onChange={(v) => this.setOpt("smuuid", v.target.value)}
                        value={this.state.smuuid}
                    />
                </div>
            </div>
        );
    }

    updatePercent = (percent, speed) => this.setState({ percent, speed });

    showChooseGuide = () => makeAlert(str("chooseGuide"));

    sleep(time = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    openPage(url) {
        window.electron.openPage(url);
    }

    async downloadLatest() {
        if (navigator.language === "zh-CN") {
            const license = await makeAlert(
                str("license"),
                true,
                str("approveLicense"),
                str("dontApproveLicense")
            )
                .then(() => true)
                .catch(() => false);
            if (!license) return;
        }

        this.setState({
            workStatus: str("downloadWait"),
            downloading: true,
        });

        const savePath = window.electron.getUserDir() + "/Desktop/Tongfang_EFI";
        const saveFile = savePath + "/OpenCore.zip";
        const fs = window.electron.fs();

        if (fs.existsSync(saveFile)) {
            this.processEFI(saveFile, savePath);
        } else {
            try {
                window.electron.rmdir(savePath);
            } catch (err) {}
            window.electron.mkdir(savePath);
            setTimeout(() => {
                window.electron.downloadFile(
                    this.state.download_url,
                    saveFile,
                    () => {
                        this.processEFI(saveFile, savePath);
                    },
                    (p, s) => this.updatePercent(p, s)
                );
            }, 50);
        }
    }

    processEFI(saveFile, savePath) {
        this.setState({ workStatus: str("generating") });
        setTimeout(async () => {
            try {
                window.electron.unzip(saveFile, savePath + "/OpenCore");

                const fs = window.electron.fs();
                const path = window.require("path");
                const userDir = window.electron.getUserDir();
                const extPath = path.join(userDir, ".tfu");


                window.electron.rmdir(`${savePath}/BOOT`);

                let extractPath;
                fs.readdirSync(`${savePath}/OpenCore`).forEach((path) => {
                    if (path.indexOf("ayamita") >= 0 || path.indexOf("hasee-tongfang-macos") >= 0)
                        extractPath = path;
                    else extractPath = ``;
                });


                // sleep() for fixing Windows sync thread error
                window.electron.rmdir(`${savePath}/BOOT`);
                await fs.rename(
                    `${savePath}/OpenCore/${extractPath}/BOOT`,
                    `${savePath}/BOOT`,
                    () => {}
                );
                await this.sleep(500);
                window.electron.rmdir(`${savePath}/OC`);
                await this.sleep(500);
                await fs.rename(
                    `${savePath}/OpenCore/${extractPath}/OC`,
                    `${savePath}/OC`,
                    () => {}
                );
                await this.sleep(500);
                await fs.rename(
                    `${savePath}/OpenCore/${extractPath}/Docs/Credits.md`,
                    `${savePath}/OC/Credits.md`,
                    () => {}
                );
                await this.sleep(500);
                window.electron.rmdir(`${savePath}/OpenCore`);
                if (this.options.accessibility) {
                  window.electron.rmdir(`${savePath}/OC/Resources/Audio`);
                  await this.sleep(500);
                  window.electron.copyDir(
                    path.join(extPath, "Audio"),
                    `${savePath}/OC/Resources/Audio`
                  );
                }

                const content = window.electron.readFile(savePath + "/OC/config.plist");
                const plist = new Plist(content);

                const ACPIdir = `${savePath}/OC/ACPI`;
                switch (this.barebones[this.state.laptop]) {
                    case "GK5CN5X":
                    case "GK5CN6X":
                    case "GK7CN6S":
                    default:
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml");
                        break;
                    case "GK5CN6Z":
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                        fs.renameSync(
                            ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml",
                            ACPIdir + "/SSDT-UIAC.aml"
                        );
                        break;
                    case "GJ5CN64":
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                        fs.renameSync(
                            ACPIdir + "/SSDT-UIAC-GJ5CN64.aml",
                            ACPIdir + "/SSDT-UIAC.aml"
                        );
                        plist.setKext("VoodooPS2", false);
                        plist.setKext("VoodooI2C", false);
                        plist.setKext("VoodooGPIO", false);
                        plist.setKext("VoodooPS2Controller_Rehabman", true);
                        plist.setSSDT("SSDT-USTP", false);
                        break;
                    case "GI5CN54":
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                        fs.renameSync(
                            ACPIdir + "/SSDT-UIAC-GI5CN54.aml",
                            ACPIdir + "/SSDT-UIAC.aml"
                        );
                        plist.setKext("VoodooPS2", false);
                        plist.setKext("VoodooI2C", false);
                        plist.setKext("VoodooGPIO", false);
                        plist.setKext("VoodooPS2Controller_Rehabman", true);
                        plist.setSSDT("SSDT-USTP", false);
                        break;
                    case "GK7CP6R":
                    case "GK5CP6V":
                    case "GK5CP5V":
                    case "GK5CR0V":
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                        fs.renameSync(
                            ACPIdir + "/SSDT-UIAC-GK7CP6R.aml",
                            ACPIdir + "/SSDT-UIAC.aml"
                        );
                        this.options.loadguc = true;
                        break;
                    case "GK5CP6X":
                    case "GK5CP6Z":
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml");
                        fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                        fs.renameSync(
                            ACPIdir + "/SSDT-UIAC-GK5CP6X.aml",
                            ACPIdir + "/SSDT-UIAC.aml"
                        );
                        this.options.loadguc = true;
                        break;
                }
                if (this.options.airport) {
                    plist.setKext("AirportBrcmFixup", true);
                    plist.setBootArg("brcmfx-country=#a");
                    if (this.options.supportBigSur) plist.setBootArg("-brcmfxbeta");
                }
                if (this.options.intel) {
                    window.electron.copyDir(
                        path.join(extPath, "IntelBluetoothFirmware.kext"),
                        `${savePath}/OC/Kexts/IntelBluetoothFirmware.kext`
                    );
                    window.electron.copyDir(
                        path.join(extPath, "IntelBluetoothInjector.kext"),
                        `${savePath}/OC/Kexts/IntelBluetoothInjector.kext`
                    );
                    plist.setKext("IntelBluetooth", true);
                }
                if (this.options.intelwifi) {
                    window.electron.copyDir(
                        path.join(extPath, "itlwm.kext"),
                        `${savePath}/OC/Kexts/itlwm.kext`
                    );
                    plist.setKext("itlwm.kext", true);
                }
                if (this.options.intelwifiax200) {
                    window.electron.copyDir(
                        path.join(extPath, "itlwmx.kext"),
                        `${savePath}/OC/Kexts/itlwmx.kext`
                    );
                    plist.setKext("itlwmx.kext", true);
                }
                if (this.options.brcm) {
                    plist.setKext("BrcmBluetoothInjector", true);
                    plist.setKext("BrcmFirmwareData", true);
                    plist.setKext("BrcmPatchRAM3", true);
                }
                if (this.options.rndis) plist.setKext("HoRNDIS", true);
                if (this.options.pm981) {
                    plist.setSSDT("SSDT-DNVME", true);
                    plist.setBootArg("-nvme-disabled");
                }
                if (this.options.accessibility) {
                  plist.setValue("Misc/Boot/PickerMode", "Builtin");
                }
                if (!this.options.bootchime && !this.options.accessibility) {
                    plist.setValue("Misc/Boot/PickerAudioAssist", false);
                    plist.setValue("UEFI/Audio/PlayChime", false);
                    plist.setValue("UEFI/Audio/AudioSupport", false);
                    plist.deleteValue("UEFI/Drivers/4");
                }        
                if (this.options.supportBigSur) {
                    plist.setValue(
                        "NVRAM/Add/7C436110-AB2A-4BBB-A880-FE41995C9F82/csr-active-config",
                        new Uint8Array([119, 0, 0, 0])
                    );
                }
                if (this.options.bestperformance) {
                    plist.setKext("CPUFriendDataProvider.kext", false);
                    plist.setKext("CPUFriendDataProvider_Performance.kext", true);
                }
                if (this.options.support4k) {
                    plist.setProperties("PciRoot(0x0)/Pci(0x2,0x0)", "AAPL,slot-name", "Built-in");
                    plist.setProperties(
                        "PciRoot(0x0)/Pci(0x2,0x0)",
                        "device_type",
                        "Display Controller"
                    );
                    plist.setProperties(
                        "PciRoot(0x0)/Pci(0x2,0x0)",
                        "enable-dpcd-max-link-rate-fix",
                        new Uint8Array([1, 0, 0, 0])
                    );
                    plist.setProperties(
                        "PciRoot(0x0)/Pci(0x2,0x0)",
                        "framebuffer-con1-alldata",
                        new Uint8Array([1, 5, 9, 0, 0, 4, 0, 0, 135, 1, 0, 0])
                    );
                    plist.setProperties(
                        "PciRoot(0x0)/Pci(0x2,0x0)",
                        "framebuffer-unifiedmem",
                        new Uint8Array([0, 0, 0, 192])
                    );
                    plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-con0-enable");
                    plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-con0-pipe");
                    plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-con1-pipe");
                    plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-con2-enable");
                    plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-con2-pipe");
                    plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-stolenmem");
                    plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-fbmem");
                    plist.setValue(
                        "NVRAM/Add/4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14/UIScale",
                        new Uint8Array([2])
                    );
                    plist.setBootArg("-cdfon -igfxmlr");
                }
                if (this.options.loadguc) plist.setBootArg("igfxfw=2");
                if (this.options.nvmefix) plist.setKext("NVMeFix", true);

                plist.setValue("PlatformInfo/Generic/SystemProductName", this.state.model);
                plist.setValue("PlatformInfo/Generic/SystemSerialNumber", this.state.sn);
                plist.setValue("PlatformInfo/Generic/MLB", this.state.mlb);
                plist.setValue("PlatformInfo/Generic/SystemUUID", this.state.smuuid);

                if (navigator.language !== "zh-CN") {
                    plist.setValue(
                        "NVRAM/Add/7C436110-AB2A-4BBB-A880-FE41995C9F82/prev-lang:kbd",
                        "en-US:0"
                    );
                }

                window.electron.writeFile(savePath + "/OC/config.plist", plist.buildPlist());
                fs.unlinkSync(savePath + "/OpenCore.zip");
                this.setState({ downloading: false, success: true });
            } catch (err) {
                makeAlert(str("downloadFailed") + "\n" + err);
                console.error(err);
            }
        }, 1000);
    }

    showModal() {
        this.setState({ modal: true });
    }

    reGenerateSMBIOS() {
        try {
            let smbios = window.electron.generateMacSerial();
            this.setState({
                ...smbios,
            });
        } catch (err) {}
    }

    render() {
        const opencore = require("../resource/opencore.png"),
            biliPageLink = "https://www.bilibili.com/video/BV1uJ411Y77y";

        if (this.state.success)
            return (
                <div className="configure">
                    <h3 className="page-title">{str("success")}</h3>
                    <div className="configure-success">
                        <div className="success-image">
                            <Success />
                        </div>
                        <div className="success-instruction" role={"alert"} aria-atomic={true}>
                            <p>{str("successInfo")}</p>
                            <ul>
                                <li className="success-item">{str("successInstructionUSB")}</li>
                                <li className="success-item">{str("successInstructionHD")}</li>
                                {navigator.language === "zh-CN" && (
                                    <li className="success-item">
                                        仍然不知道如何安装/替换？请参考
                                        <Button
                                            onClick={() => this.openPage(biliPageLink)}
                                            type="link"
                                        >
                                            教学视频
                                        </Button>
                                        的演示。
                                    </li>
                                )}
                            </ul>
                            <div className="actions">
                                <Button
                                    type="primary"
                                    shape="round"
                                    icon={<LeftOutlined />}
                                    onClick={() =>
                                        this.setState({
                                            workStatus: str("getLatest"),
                                            downloading: false,
                                            success: false,
                                        })
                                    }
                                >
                                    {str("backward")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div className="configure">
                    <style ref={(ref) => (this.stylesheet = ref)}></style>
                    <div
                        className="spinning"
                        style={{ display: this.state.downloading ? "flex" : "none" }}
                    >
                        <Spin
                            tip={[
                                <p
                                    role={"alert"}
                                    aria-atomic={true}
                                    key={1}
                                    style={{ color: "#000" }}
                                >
                                    {this.state.workStatus}
                                    {this.state.downloading
                                        ? " (" +
                                          this.state.percent +
                                          "% " +
                                          Math.ceil(this.state.speed / 1024) +
                                          "K/s)"
                                        : ""}
                                </p>,
                                <p key={2}>
                                    {this.state.downloading && (
                                        <Button type="link" onClick={() => this.showModal()}>
                                            {str("cannotDownload")}
                                        </Button>
                                    )}
                                </p>,
                            ]}
                            indicator={<LoadingOutlined style={{ fontSize: 60, margin: 20 }} />}
                        />
                    </div>

                    <Modal
                        title={str("cannotDownload")}
                        visible={this.state.modal}
                        footer={null}
                        onCancel={() => this.setState({ modal: false })}
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: str("cannotDownloadSolution"),
                            }}
                        />
                        <div className="download-lists" style={{ fontSize: 12, color: "#999" }}>
                            {this.state.latestDev !== "Unknown" && (
                                <li style={{ width: "100%" }}>
                                    JSDelivr: <br />
                                    <Button
                                        type="link"
                                        onClick={() =>
                                            this.openPage(
                                                `${config.download_url.jsdelivr}-${this.state.latestDev}.zip`
                                            )
                                        }
                                    >
                                        {`${config.download_url.jsdelivr}-${this.state.latestDev}.zip`}
                                    </Button>
                                </li>
                            )}
                            <li>
                                GitHub: <br />
                                <Button
                                    type="link"
                                    onClick={() => this.openPage(config.download_url.github)}
                                >
                                    {config.download_url.github}
                                </Button>
                            </li>
                            <li>
                                BitBucket <br />
                                <Button
                                    type="link"
                                    onClick={() => this.openPage(config.download_url.bitbucket)}
                                >
                                    {config.download_url.bitbucket}
                                </Button>
                            </li>
                        </div>
                    </Modal>

                    <Modal
                        className={"select-model-modal"}
                        title={str("selectModel")}
                        visible={this.state.selecting_model}
                        footer={null}
                        onCancel={() => this.setState({ selecting_model: false })}
                    >
                        <Input
                            onChange={(v) => this.handleSearch(v)}
                            placeholder={str("filterModel")}
                            type={"search"}
                        />
                        {this.renderModels()}
                    </Modal>

                    <h3 className="page-title">{str("configure")}</h3>
                    <p className="page-description">{str("configureDescription")}</p>
                    <img className="oc-logo" src={opencore} alt="opencore" />
                    <div className="form-container">
                        <p>{str("laptopModel")}</p>
                        <div className="model-select">
                            <p>{this.models[this.state.laptop]}</p>
                            <Button
                                className="select-other"
                                aria-label={str("selectOtherModel")}
                                type={"link"}
                                onClick={() => this.setState({ selecting_model: true })}
                            >
                                {str("selectOtherModel")}
                            </Button>
                        </div>

                        <p>
                            {str("injectOption")}（
                            <Button
                                type="link"
                                onClick={this.showChooseGuide}
                                style={{ padding: 0, height: "auto" }}
                            >
                                {str("whatShouldIChoose")}
                            </Button>
                            ）
                        </p>
                        <div className="inject-options">{this.getOptions()}</div>

                        <p>
                            {str("smbiosInfo")} (
                            {this.state.smbiosGenerated ? (
                                str("getSMBIOSFromGeneration")
                            ) : (
                                <span>
                                    {str("getSMBIOSFromSystem")}，
                                    <Button
                                        style={{ height: "auto" }}
                                        type="link"
                                        onClick={() => this.reGenerateSMBIOS()}
                                    >
                                        {str("regenerate")}
                                    </Button>
                                </span>
                            )}
                            )
                        </p>
                        <div className="smbios-info">{this.getSMBIOSInfo()}</div>
                        <div className="flex">
                            <div className="half">
                                <p>{str("downloadSource")}</p>
                                <div className="download-source-cotainer">
                                    {this.getDownloadSource()}
                                </div>
                            </div>

                            <div className="half">
                                <p>{str("versionInfo")}</p>
                                <div className="version-info">
                                    <p className="version-tag">
                                        {str("latestVersion")}: {this.state.latestDev}
                                    </p>
                                    <p className="version-tag">
                                        {str("localVersion")}: {this.getCurrentVersionFromNVRAM()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="actions">
                            <Button
                                type="primary"
                                shape="round"
                                icon={<CloudDownloadOutlined />}
                                loading={this.state.downloading}
                                disable={(!this.state.downloading).toString()}
                                onClick={() => this.downloadLatest()}
                            >
                                {this.state.workStatus}
                            </Button>
                        </div>
                    </div>
                </div>
            );
    }
}
