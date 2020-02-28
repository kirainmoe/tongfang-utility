import React, { Component, version } from "react";
import { Select, Checkbox, Input, Button } from "antd";

import "../styles/Configure.styl";

import str from "../resource/string";
import config from "../config";
import Plist from "../utils/plist";
import Success from "../icons/Success";

const { Option } = Select;

export default class Configure extends Component {
    constructor(props) {
        super(props);

        let smbios = window.electron.getMacSerial(),
            smbiosGenerated = false;
        if (!smbios) {
            smbios = window.electron.generateMacSerial();
            smbiosGenerated = true;
        }

        this.state = {
            latestStable: "Unknown",
            latestDev: "Unknown",
            downloading: false,
            workStatus: str("getLatest"),
            ...smbios,
            laptop: 0,
            airport: false,
            intel: false,
            brcm: false,
            rndis: false,
            support4k: false,
            pm981: false,
            smbiosGenerated,
            success: false
        };

        this.checkVersion();
    }

    checkVersion() {
        const versionUrl = "https://api.kirainmoe.com/starbeatVersion";
        fetch(versionUrl)
            .then(res => res.json())
            .then(data => {
                if (data.forceUpdate >= config.build) {
                    alert(`你正在使用 Tongfang Hackintosh Utility v${config.version}，官方最新版本是 v${data.version}。\n
为了防止发生兼容性问题，请前往 https://starbeat.kirainmoe.com 更新 Tongfang Hackintosh Utility 后再管理配置文件。`);

                    window.location.href = "/";
                }
            });
    }

    getModelList() {
        const res = [];
        config.supported_machine.forEach((mach, index) => {
            res.push(
                <Option key={index} value={index}>
                    {mach.model}
                </Option>
            );
        });
        return res;
    }

    getOptions() {
        const opts = [
            { label: str("injectAirport"), value: "airport" },
            { label: str("injectIntelBluetooth"), value: "intel" },
            { label: str("injectBrcmBluetooth"), value: "brcm" },
            { label: str("injectHoRNDIS"), value: "rndis" },
            { label: str("inject4KSupport"), value: "support4k" },
            { label: str("disablePM981"), value: "pm981" }
        ];

        return (
            <Checkbox.Group
                options={opts}
                onChange={v => {
                    let todo = {};
                    opts.forEach(opt => (todo[opt.value] = 0));
                    v.forEach(item => (todo[item] = 1));
                    this.setState({
                        ...this.state,
                        ...todo
                    });
                }}
            />
        );
    }

    setOpt(key, value) {
        const state = {
            ...this.state
        };
        state[key] = value;
        this.setState(state);
    }

    getSMBIOSInfo() {
        return (
            <div className="smbios-input">
                <div>
                    <label>{str("smbiosModel")}</label>
                    <Input
                        onChange={v => this.setOpt("model", v)}
                        defaultValue={this.state.model}
                    />
                </div>
                <div>
                    <label>{str("smbiosSN")}</label>
                    <Input onChange={v => this.setOpt("sn", v)} defaultValue={this.state.sn} />
                </div>
                <div>
                    <label>{str("smbiosMLB")}</label>
                    <Input onChange={v => this.setOpt("mlb", v)} defaultValue={this.state.mlb} />
                </div>
                <div>
                    <label>{str("smbiosSmUUID")}</label>
                    <Input
                        onChange={v => this.setOpt("smuuid", v)}
                        defaultValue={this.state.smuuid}
                    />
                </div>
            </div>
        );
    }

    downloadLatest() {
        this.setState({
            ...this.state,
            workStatus: str("downloadWait"),
            downloading: true
        });

        const savePath = window.electron.getUserDir() + "/Desktop/starbeat";
        window.electron.mkdir(savePath);
        const saveFile = savePath + "/OpenCore.zip";
        // branch = "oc-general";
        window.electron.downloadFile(config.download_url, saveFile, () => {
            window.electron.unzip(saveFile, savePath + "/OpenCore");

            const fs = window.electron.fs();
            window.electron.rmdir(`${savePath}/BOOT`);

            let extractPath;
            fs.readdirSync(`${savePath}/OpenCore`).forEach(path => {
                if (path.indexOf("ayamita") >= 0) extractPath = path;
            });

            fs.renameSync(
                // `${savePath}/OpenCore/hasee-tongfang-macos-${branch}/BOOT`,
                `${savePath}/OpenCore/${extractPath}/BOOT`,
                `${savePath}/BOOT`
            );
            window.electron.rmdir(`${savePath}/OC`);
            fs.renameSync(
                // `${savePath}/OpenCore/hasee-tongfang-macos-${branch}/OC`,
                `${savePath}/OpenCore/${extractPath}/OC`,
                `${savePath}/OC`
            );
            window.electron.rmdir(`${savePath}/OpenCore`);

            const content = window.electron.readFile(savePath + "/OC/config.plist");
            const plist = new Plist(content);
            window.p = plist;

            const ACPIdir = `${savePath}/OC/ACPI`;
            // console.log(config.supported_machine[this.state.laptop].barebone);
            switch (config.supported_machine[this.state.laptop].barebone) {
                case "GK5CN5X":
                case "GK5CN6X":
                default:
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                    break;
                case "GJ5CN64":
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                    fs.renameSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml", ACPIdir + "/SSDT-UIAC.aml");
                    plist.setKext("VoodooPS2", false);
                    plist.setKext("VoodooI2C", false);
                    plist.setKext("VoodooGPIO", false);
                    plist.setKext("AppleSmartPS2Controller", true);
                    plist.setSSDT("SSDT-USTP", false);
                    break;
                case "GI5CN54":
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                    fs.renameSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml", ACPIdir + "/SSDT-UIAC.aml");
                    plist.setKext("VoodooPS2", false);
                    plist.setKext("VoodooI2C", false);
                    plist.setKext("VoodooGPIO", false);
                    plist.setKext("ApplePS2", true);
                    plist.setSSDT("SSDT-USTP", false);
                    break;
                case "GK7CP6R":
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                    fs.renameSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml", ACPIdir + "/SSDT-UIAC.aml");
                    break;
                case "GK5CP6X":
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                    fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                    fs.renameSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml", ACPIdir + "/SSDT-UIAC.aml");
                    break;
            }

            if (this.state.airport) plist.setKext("AirportBrcmFixup", true);
            if (this.state.intel) plist.setKext("IntelBluetooth", true);
            if (this.state.brcm) {
                plist.setKext("BrcmBluetoothInjector", true);
                plist.setKext("BrcmFirmwareData", true);
                plist.setKext("BrcmPatchRAM2", true);
            }
            if (this.state.rndis) {
                plist.setKext("HoRNDIS", true);
            }
            if (this.state.pm981) {
                plist.setSSDT("SSDT-DNVME", true);
            }
            if (this.state.support4k) {
                plist.setProperties(
                    "PciRoot(0x0)/Pci(0x2,0x0)",
                    "dpcd-max-link-rate",
                    new Uint8Array([14, 0, 0, 0])
                );
                plist.setProperties(
                    "PciRoot(0x0)/Pci(0x2,0x0)",
                    "enable-dpcd-max-link-rate-fix",
                    new Uint8Array([1, 0, 0, 0])
                );
                plist.setProperties(
                    "PciRoot(0x0)/Pci(0x2,0x0)",
                    "enable-hdmi20",
                    new Uint8Array([1, 0, 0, 0])
                );
                plist.setProperties(
                    "PciRoot(0x0)/Pci(0x2,0x0)",
                    "enable-lspcon-support",
                    new Uint8Array([1, 0, 0, 0])
                );
                plist.setBootArg("-cdfon");
            }

            plist.setValue("PlatformInfo/Generic/SystemProductName", this.state.model);
            plist.setValue("PlatformInfo/Generic/SystemSerialNumber", this.state.sn);
            plist.setValue("PlatformInfo/Generic/MLB", this.state.mlb);
            plist.setValue("PlatformInfo/Generic/SystemUUID", this.state.smuuid);
            // console.log(plist.json);

            window.electron.writeFile(savePath + "/OC/config.plist", plist.buildPlist());
            fs.unlinkSync(savePath + "/OpenCore.zip");
            this.setState({ downloading: false, success: true }, () => console.log(this.state));
        });
    }

    render() {
        const opencore = require("../resource/opencore.png");
        if (this.state.success)
            return (
                <div className="configure">
                    <h3 className="page-title">{str("success")}</h3>
                    <div className="configure-success">
                        <div className="success-image">
                            <Success />
                        </div>
                        <div className="success-instruction">
                            <p>{str("successInfo")}</p>
                            <ul>
                                <li className="success-item">{str("successInstructionUSB")}</li>
                                <li className="success-item">{str("successInstructionHD")}</li>
                            </ul>
                            <div className="actions">
                                <Button
                                    type="primary"
                                    shape="round"
                                    icon="left"
                                    onClick={() =>
                                        this.setState({
                                            workStatus: str("getLatest"),
                                            downloading: false,
                                            success: false
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
                    <h3 className="page-title">{str("configure")}</h3>
                    <p className="page-description">{str("configureDescription")}</p>
                    <img className="oc-logo" src={opencore} alt="opencore" />
                    <div className="form-container">
                        <p>{str("laptopModel")}</p>
                        <Select
                            showSearch
                            placeholder={str("selectModel")}
                            optionFilterProp="children"
                            defaultValue={0}
                            style={{
                                width: "100%"
                            }}
                            onChange={val => this.setState({ ...this.state, laptop: val })}
                        >
                            {this.getModelList()}
                        </Select>

                        <p>{str("injectOption")}</p>
                        <div className="inject-options">{this.getOptions()}</div>

                        <p>
                            {str("smbiosInfo")}(
                            {this.state.smbiosGenerated
                                ? str("getSMBIOSFromGeneration")
                                : str("getSMBIOSFromSystem")}
                            )
                        </p>
                        <div className="smbios-info">{this.getSMBIOSInfo()}</div>

                        <p>{str("versionInfo")}</p>
                        <div className="version-info">
                            <p className="version-tag">
                                {str("localVersion")}: {this.state.latestStable}
                            </p>
                            <p className="version-tag">
                                {str("latestVersion")}: {this.state.latestDev}
                            </p>
                        </div>

                        <div className="actions">
                            <Button
                                type="primary"
                                shape="round"
                                icon="download"
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
