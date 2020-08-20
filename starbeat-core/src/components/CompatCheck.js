import React, { Component } from "react";
import { message } from "antd";

import str from "../resource/string";
import "../styles/CompatCheck.styl";

import SSD from "../icons/SSD";
import Capacity from "../icons/Capacity";
import Laptop from "../icons/Laptop";
import BootMode from "../icons/BootMode";
import WirelessCard from "../icons/WirelessCard";

export default class CompatCheck extends Component {
    infos = {
        diskInfo: null,
        espInfo: null,
        networkInfo: null,
        biosInfo: null,
        uefiInfo: null
    }

    ssdEvaluateInfo = [
        { evaluation: "此电脑上的所有硬盘都可以正常安装和使用各版本 macOS 系统。", rank: 'success' },
        { evaluation: "该硬盘可以正常安装和使用 macOS 10.15 系统，但 OEM 型号和非零售版将无法安装 macOS 11.0 系统。", rank: 'warning' },
        { evaluation: "该硬盘可以正常安装 macOS 系统，但在使用过程中可能会遇到部分未知的问题。", rank: 'info' },
        { evaluation: "该硬盘可能需要更新固件后才能正常安装 macOS 系统，且在使用过程中可能遇到部分未知的问题。", rank: 'warning' },
        { evaluation: "该硬盘无法正常安装 macOS 系统，请将其插到第一个 m.2. 插槽后屏蔽，或将该硬盘取下后，再安装 macOS 系统到其它硬盘。", rank: 'error' },
        { evaluation: "App 无法检测硬盘信息。", rank: 'error' }        
    ]

    espEvaluateInfo = [
        { evaluation: "这台电脑上所有硬盘的的 ESP 分区均大于 200MB。", rank: 'success' },
        { evaluation: "这台电脑上有部分硬盘没有 ESP 分区或 ESP 分区小于 200MB，你将无法在这些硬盘上安装 macOS。", rank: "warning" },
        { evaluation: "这台电脑上的每块硬盘上均没有容量 >= 200MB 的 ESP 分区，若要安装 macOS 必须调整或重建一个 >= 200MB 的 ESP 分区。", rank: "error" },
        { evaluation: "App 无法检测 ESP 分区信息。", rank: "error" }
    ]

    networkEvaluateInfo = [
        { evaluation: "在此电脑上检测到了 Broadcom 的免驱白果网卡。", rank: 'success' },
        { evaluation: "在此电脑上检测到了 Intel Wireless AC9462 / AC9560. 你需要使用 itlwm 驱动才能够在 macOS 下使用 WiFi.", rank: 'info' },
        { evaluation: "在此电脑上检测到了 Intel Wireless AX200. 你需要使用 itlwmx 驱动才能够在 macOS 下使用 WiFi.", rank: 'info' },
        { evaluation: "检测到了 DW1820A 无线网卡，该设备有部分型号可能与同方机型不兼容；需要注入博通网卡、蓝牙驱动才能正常使用。", rank: "warning" },
        { evaluation: "在此电脑上检测到了 Dell Wireless 无线网卡，该设备需要注入博通网卡、蓝牙驱动才能正常使用。", rank: "info" },
        { evaluation: "App 无法检测网卡信息。", rank: "error" }
    ]

    biosEvaluateInfo = [
        { evaluation: "此电脑为同方机型，可以正常使用 App 提供的 EFI 安装 macOS.", rank: "success" },
        { evaluation: "此电脑正在使用 OpenCore 引导 Windows。", rank: "info" },
        { evaluation: "此电脑似乎不是同方机型，或不在 App 的支持列表中，不能使用该 App 提供的 EFI 安装 macOS.", rank: "error" },
        { evaluation: "App 无法检测主板型号信息。", rank: "error" }
    ]

    uefiEvaluateInfo = [
        { evaluation: "此电脑正在使用传统 BIOS 模式 (Legacy) 引导 Windows. 若要安装双系统或单独安装 macOS，需要使用 UEFI 模式引导系统。", rank: "error" },
        { evaluation: "此电脑正在使用 UEFI 模式引导 Windows。", rank: "success" }
    ]

    constructor(props) {
        super(props);
        this.state = this.checkCompat();
    }

    checkCompat() {
        this.getHardwareInfo();
        const ssdStatus = this.getSSDModel();
        const espStatus = this.getESPInfo();
        const wirelessStatus = this.getWirelessCardModel();
        const boardStatus = this.getBoardModel();
        const uefiStatus = this.getUEFIBootStatus();
        return {
            ssdStatus,
            espStatus,
            wirelessStatus,
            boardStatus,
            uefiStatus
        };
    }

    getHardwareInfo() {
        if (!window.electron.isWin())
            return;
        try {
            this.infos.espInfo = window.electron.parseWMIC("volume get 'file system',capacity");
            this.infos.diskInfo = window.electron.parseWMIC("diskdrive get model");
            this.infos.networkInfo = window.electron.parseWMIC("nicconfig get caption");
            this.infos.biosInfo = window.electron.parseWMIC("bios get serialnumber");
        } catch (err) {
            message.error(str("cannotGetHardwareInfo"));
        }
    }

    getESPInfo() {
        if (!this.infos.espInfo) {
            return 4;       // unknown
        }
        let fatCount = 0, capCount = 0;
        for (const item of this.infos.espInfo.result) {
            if ((item.FileSystem === "FAT" || item.FileSystem === "FAT32")) {
                fatCount++;

                let cap = Number(item.Capacity);
                if (cap / 1024 / 1024 >= 200)
                    capCount++;
            }
        }
        return !fatCount ? 3 : (!capCount ? 2 : Number(fatCount !== capCount));
    }

    getSSDModel() {
        if (!this.infos.diskInfo) {
            return {
                model: 'Unknown',
                rank: 5
            };
        }

        for (const item of this.infos.diskInfo.result) {
            if (item.Model.indexOf("MZVLB") >= 0) {
                return {
                    model: '三星 PM981(a)',
                    rank: 4
                };
            }
            else if (item.Model.indexOf("MTF") >= 0) {
                return {
                    model: "镁光 2200s",
                    rank: 4
                };
            }
            else if (item.Model.indexOf("MZVLW") >= 0) {
                return {
                    model: "三星 PM961",
                    rank: 1
                };
            }
            else if (item.Model.indexOf("MZVPW") >= 0) {
                return {
                    model: "三星 SM961",
                    rank: 1
                };
            }
            else if (item.Model.indexOf("EX920") >= 0) {
                return {
                    model: "HP EX920",
                    rank: 2
                };
            }
            else if (item.Model.indexOf("HS SSD C2000") >= 0) {
                return {
                    model: "海康威视 C2000 系列",
                    rank: 2
                };
            }
            else if (item.Model.indexOf("970 EVO") >= 0) {
                return {
                    model: "三星 970 Evo 系列",
                    rank: 3
                }
            }
        }
        return {
            model: "OK",
            rank: 0
        }
    }

    getWirelessCardModel() {
        if (!this.infos.networkInfo) {
            return 5;
        }
        for (const item of this.infos.networkInfo.result) {
            if (item.Caption.includes("Intel")) {
                if (item.Caption.includes("9462") || item.Caption.includes("9560"))
                    return 1;
                if (item.Caption.includes("AX200"))
                    return 2;
            }
            if (item.Caption.includes("Broadcom"))
                return 0;
            if (item.Caption.includes("Dell")) {
                if (item.Caption.includes("1820A"))
                    return 3;
                return 4;
            }
        }
    }

    getBoardModel() {
        if (!this.infos.biosInfo) {
            return 3;
        }
        for (const item of this.infos.biosInfo.result) {
            if (item.SerialNumber.startsWith("GK") || item.SerialNumber.startsWith("GJ5CN") || item.SerialNumber.startsWith("GI5"))
                return 0;
            if (item.SerialNumber.startsWith("C02"))
                return 1;
            return 2;
        }
    }

    getUEFIBootStatus() {
        const cp = window.require("child_process");
        const res = cp.execSync("bcdedit /enum").toString();
        
        if (!res)
            return 0;
        if (res.toLowerCase().includes("bootmgfw.efi") || res.toLowerCase().includes("winload.efi"))
            return 1;
        return 0;
    }

    render() {
        return (
            <div className="compat-check">
                <h3 className="page-title">{str("compatCheck")}</h3>
                <div className="description">
                    {str("compatCheckDescription")}
                </div>

                <div className="container">
                    <div className={`check-item ssd-check ${this.ssdEvaluateInfo[this.state.ssdStatus.rank].rank}`}>
                        <h1 className="check-title">固态硬盘</h1>
                        <div className="check-icon">
                            <SSD />
                        </div>
                        <div className="check-result">
                            {this.state.ssdStatus.rank ? `在这台电脑上检测到了 ${this.state.ssdStatus.model} 固态硬盘，` : ""}
                            {this.ssdEvaluateInfo[this.state.ssdStatus.rank].evaluation}
                        </div>
                    </div>

                    <div className={`check-item esp-check ${this.espEvaluateInfo[this.state.espStatus].rank}`}>
                        <h1 className="check-title">ESP 分区大小</h1>
                        <div className="check-icon">
                            <Capacity />
                        </div>
                        <div className="check-result">
                            {this.espEvaluateInfo[this.state.espStatus].evaluation}
                        </div>
                    </div>

                    <div className={`check-item board-check ${this.biosEvaluateInfo[this.state.boardStatus].rank}`}>
                        <h1 className="check-title">设备型号</h1>
                        <div className="check-icon">
                            <Laptop />
                        </div>
                        <div className="check-result">
                            {this.biosEvaluateInfo[this.state.boardStatus].evaluation}
                        </div>
                    </div>           

                    <div className={`check-item uefi-check ${this.uefiEvaluateInfo[this.state.uefiStatus].rank}`}>
                        <h1 className="check-title">系统引导状态</h1>
                        <div className="check-icon">
                            <BootMode />
                        </div>
                        <div className="check-result">
                            {this.uefiEvaluateInfo[this.state.uefiStatus].evaluation}
                        </div>
                    </div>               

                    <div className={`check-item wireless-check ${this.networkEvaluateInfo[this.state.wirelessStatus].rank}`}>
                        <h1 className="check-title">无线网卡</h1>
                        <div className="check-icon">
                            <WirelessCard />
                        </div>
                        <div className="check-result">
                            {this.networkEvaluateInfo[this.state.wirelessStatus].evaluation}
                        </div>
                    </div>                                              
                </div>
                <div className="for-reference">
                    {str("compatCheckForReference")}
                </div>
            </div>
        );
    }
}