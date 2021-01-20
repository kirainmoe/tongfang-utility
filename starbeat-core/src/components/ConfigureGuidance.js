import React, { Component } from "react";
import { createHashHistory } from "history";
import {
  Popover,
  Steps,
  Progress,
  Input,
  Button,
  message,
  Modal,
  Switch,
} from "antd";
import {
  CloudDownloadOutlined,
  FormatPainterOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import str from "../resource/string";
import config from "../config";
import makeAlert from "../utils/makeAlert";
import Success from "../icons/Success";

import {
  isKextLoaded,
  hasParam,
  getNVRAMValue,
  isAssistDownloaded,
  isVoiceOverDownloaded,
  getCurrentVersionFromNVRAM,
} from "../utils/env";
import processConfig from "../utils/processConfig";

import Bitbucket from "../icons/Bitbucket";
import GitHub from "../icons/GitHub";
import JSDelivr from "../icons/JSDelivr";
import Apple from "../icons/Apple";
import Broadcom from "../icons/Broadcom";
import Intel from "../icons/Intel";
import USB from "../icons/USB";
import FHD from "../icons/FHD";
import UHD from "../icons/UHD";
import Hz from "../icons/144Hz";
import Disable from "../icons/Disable";
import Chipset from "../icons/Chipset";
import SSD from "../icons/SSD";
import Bootchime from "../icons/Bootchime";
import Accessibility from "../icons/Accessibility";
import Graphics from "../icons/Graphics";
import Shortcut from "../icons/Shortcut";
import Laptop from "../icons/Laptop";
import Disk from "../icons/Disk";

import "../styles/Guidance.styl";

const opencore = require("../resource/opencore.png"),
  catalina = require("../resource/macOS/catalina.jpg"),
  bigsur = require("../resource/macOS/bigsur.jpg");

const biliPageLink = "https://www.bilibili.com/video/BV1uJ411Y77y";

const { Step } = Steps;

export default class Configure extends Component {
  barebones = [];
  brandTag = [];
  models = [];
  steps = [
    { title: str("getReady") },
    { title: str("selectModel") },
    { title: str("customizeHardware") },
    { title: str("setSMBIOS") },
    { title: str("generate") },
    { title: str("finish") },
  ];

  constructor(props) {
    super(props);

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

    let laptop = getNVRAMValue("efi-model");
    if (laptop && laptop.indexOf("model-") >= 0) {
      laptop = laptop.replace("model-", "").trim();
    }

    this.state = {
      currentStep: 0,
      operation: "choose",
      generateStep: "download",

      // step 1
      latestVersion: "Unknown",
      localIntelVersion: isAssistDownloaded(),
      voiceoverStatus: isVoiceOverDownloaded(),
      updateLog: "",
      remoteIntelVersion: false,

      // step 2
      laptop:
        laptop === null
          ? navigator.language === "zh-CN"
            ? 9
            : 0
          : Number(laptop),
      selectingModel: false,

      // step 3
      osVersion: this.determineOSVersion(),
      wirelessCard: this.determineWirelessCardType(),
      rndis: false,
      resolution: "1080p",
      NVMeFix: isKextLoaded("NVMeFix"),
      cpuBestPerformance: false,
      bootChime: false,
      accessibility: false,
      disableNVMe: hasParam("-nvme-disabled"),
      appleGuC: hasParam("igfxfw=2"),
      useAirportItlwm: false,

      // step 4
      ...smbios,
      smbiosGenerated,
      customBackground: false,
      backgroundFile: null,

      // step 5
      jsdelivrUrl: false,
      downloadSource: "bitbucket",

      // download
      progress: 0,
      downloadSpeed: 0,
      showCannotDownloadSolution: false,

      // done
      generateStatus: true,
    };

    this.prepareLaptopsList();
  }

  componentDidMount() {
    this.getRemoteVersion();
  }

  // 获取当前系统版本
  determineOSVersion() {
    if (!window.electron.isMac()) return "catalina";
    const cp = window.require("child_process"),
      output = cp.execSync("sw_vers").toString();
    if (output.indexOf("11.0") >= 0) return "bigsur";
    return "catalina";
  }

  // 获取网卡类型
  determineWirelessCardType() {
    if (isKextLoaded("AirportBrcmFixup")) {
      if (isKextLoaded("BrcmBluetooth")) return "broadcom";
      return "apple";
    }
    if (isKextLoaded("itlwm")) return "intel";
    return "intel";
  }

  // 获取远程 EFI 版本和 Tongfang Hackintosh Utility 版本
  getRemoteVersion() {
    const versionUrl = "https://api-aliyun.kirainmoe.com:2333/tongfang/version";
    fetch(versionUrl)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.build > config.build) {
          await makeAlert(str("updateRequired"));
          createHashHistory().push("/update");
        } else
          this.setState({
            latestVersion: data.latestDev,
            updateLog:
              navigator.language === "zh-CN"
                ? data.updateLog
                : data.updateLogEn,
            jsdelivrUrl: `${config.download_url.jsdelivr}-${data.latestDev}.zip`,
            downloadSource: "jsdelivr",
          });
      })
      .catch((err) => {
        message.error(str("failedToConnectServer"));
      });
    fetch("https://cdn.jsdelivr.net/gh/kirainmoe/jsdelivr/version.json", {
      cache: "no-cache",
    })
      .then((res) => res.text())
      .then((res) => this.setState({ remoteIntelVersion: res }));
  }

  // 获取 Intel 网卡驱动版本
  getIntelStatus() {
    if (
      !this.state.localIntelVersion ||
      (this.state.remoteIntelVersion &&
        this.state.remoteIntelVersion !== this.state.localIntelVersion)
    ) {
      return (
        <Button
          type={"link"}
          onClick={() => createHashHistory().push("/update?target=assist")}
        >
          {this.state.localIntelVersion
            ? str("updateable")
            : str("undownloaded")}
        </Button>
      );
    }
    return str("downloaded");
  }

  // 获取无障碍语音包版本
  getVoiceoverStatus() {
    if (!this.state.voiceoverStatus)
      return (
        <Button
          type="link"
          onClick={() => createHashHistory().push("/update?voiceover")}
        >
          {str("goDownload")} {str("optional")}
        </Button>
      );
    return str("downloaded");
  }

  // 检查选项冲突性
  checkOptions() {
    const checkResult = [];
    if (
      this.state.wirelessCard === "intel" &&
      (!this.state.localIntelVersion ||
        (this.state.remoteIntelVersion &&
          this.state.remoteIntelVersion !== this.state.localIntelVersion))
    ) {
      checkResult.push(
        <li className="conflict-item" key={"intel"}>
          {str("intelNotDownloaded")}
          <Button
            type={"link"}
            onClick={() => createHashHistory().push("/update?assist")}
          >
            {str("goDownload")}
          </Button>
        </li>
      );
    }

    if (this.state.accessibility && !this.state.voiceoverStatus) {
      checkResult.push(
        <li className="conflict-item" key={"voiceOver"}>
          {str("accessibilityNotDownloaded")}
          <Button
            type={"link"}
            onClick={() => createHashHistory().push("/update?voiceover")}
          >
            {str("goDownload")}
          </Button>
        </li>
      );
    }

    return checkResult;
  }

  // 预处理机型列表
  prepareLaptopsList() {
    let index = 0;
    config.supported_machine.forEach((s) => {
      s.models.forEach((mach) => {
        this.barebones[index] = mach.barebone;
        this.models[index] = mach.model;
        this.brandTag[index++] = s.vendorTag;
      });
    });
  }

  // 展示机型列表
  renderModels() {
    const res = [];
    let index = 0,
      brand = 0;
    config.supported_machine.forEach((s) => {
      const models = [];
      s.models.forEach((mach) => {
        const tmp = index;

        let img = null;
        if (mach.image) img = require("../resource/models/" + mach.image);

        models.push(
          <div
            className={`model-select-item ${this.state.laptop === index}`}
            data-index={mach.model.toLowerCase()}
            aria-label={mach.model}
            key={index}
            value={index}
            onClick={() => {
              let nextState = {
                laptop: tmp,
                selectingModel: false,
              };
              this.setState(nextState);
              if (
                this.barebones[tmp] === "GJ5KN64" &&
                this.state.smbiosGenerated
              )
                this.reGenerateSMBIOS(40);
            }}
          >
            {mach.image !== undefined ? (
              <div
                className="model-image"
                style={{ background: `url(${img}) no-repeat center / cover` }}
              />
            ) : null}
            <div className="model-tag">{mach.model}</div>
          </div>
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

  setOpt(key, value) {
    const state = {
      ...this.state,
    };
    state[key] = value;
    this.setState(state);
  }

  // 渲染 SMBIOS 修改界面
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

  // 自动复制 EFI 到 ESP 分区
  async replaceEFI(index, name) {
    const info = str("confirmToReplace")
      .replace("$1", name)
      .replace("$2", index);

    const path = window.require("path"),
      fs = window.require("fs"),
      mountPoint = "/tmp/tongfang-efi",
      downloadPath = localStorage.getItem("tfu-download-path"),
      separator = window.electron.isWin() ? "\\" : "/";
    const savePath = downloadPath + `${separator}Tongfang_EFI`;

    await makeAlert(`${info}`, true).then(() => {
      window.electron.mountESP(index, mountPoint, async () => {
        const EFIFolderPath = path.join(mountPoint, "EFI"),
          bootFolderPath = path.join(EFIFolderPath, "BOOT"),
          OCFolderPath = path.join(EFIFolderPath, "OC"),
          OCBackupFolderPath = path.join(EFIFolderPath, "OC_Backup");

        const hasEFIFolder = fs.existsSync(EFIFolderPath);
        if (!hasEFIFolder) {
          fs.mkdirSync(EFIFolderPath);
          fs.mkdirSync(bootFolderPath);
        }

        const hasWindows =
          fs.existsSync(path.join(EFIFolderPath, "Microsoft")) ||
          fs.existsSync(path.join(bootFolderPath, "OpenCore.efi"));
        if (hasWindows) {
          fs.copyFileSync(
            `${savePath}/BOOT/BOOTx64.efi`,
            path.join(bootFolderPath, "OpenCore.efi")
          );
        } else {
          fs.copyFileSync(
            `${savePath}/BOOT/BOOTx64.efi`,
            path.join(bootFolderPath, "BOOTx64.efi")
          );
        }

        if (fs.existsSync(OCBackupFolderPath))
          window.electron.rmdir(OCBackupFolderPath);
        if (fs.existsSync(OCFolderPath))
          fs.renameSync(OCFolderPath, OCBackupFolderPath);

        window.electron.copyDir(`${savePath}/OC`, OCFolderPath);

        makeAlert(str("copyComplete"));
      });
    });
  }

  // 获取当前电脑上的 EFI 分区
  getESP() {
    if (!window.electron.isMac()) return null;
    const esp = window.electron.listESP();
    if (!esp || !esp.length) return null;

    const items = [];
    esp.forEach((part, index) => {
      const name = part.name.length > 2 ? part.name : "Untitled";
      const partInfo = `${str("diskName")}: ${name}，${str("diskSize")}: ${
        part.size
      }，${str("diskIndex")}: ${part.index}`;
      items.push(
        <Popover content={partInfo} key={index}>
          <div
            className="esp-item"
            onClick={() => this.replaceEFI(part.index, name)}
          >
            <Disk />
            <p className="esp-tag">{name}</p>
          </div>
        </Popover>
      );
    });

    return <div className="esp-lists">{items}</div>;
  }

  // 处理搜索
  handleSearch(e) {
    const val = e.target.value.toLowerCase();
    if (val === "") this.stylesheet.innerHTML = "";
    else
      this.stylesheet.innerHTML = `.model-select-item:not([data-index*="${val}"]) { display: none!important }`;
  }

  // 重新生成 SMBIOS
  reGenerateSMBIOS(r = undefined) {
    try {
      const model = r
        ? r
        : this.barebones[this.state.laptop] === "GJ5KN64"
        ? 40
        : 43;
      let smbios = window.electron.generateMacSerial(model);
      this.setState({
        ...smbios,
        smbiosGenerated: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // 是否已存在文件
  configExists() {
    try {
      const fs = window.require("fs");
      const downloadPath = localStorage.getItem("tfu-download-path"),
        separator = window.electron.isWin() ? "\\" : "/";
      const savePath = downloadPath + `${separator}Tongfang_EFI`;
      const saveFile = savePath + "/OpenCore.zip";

      return fs.existsSync(saveFile);
    } catch (err) {
      return false;
    }
  }

  // 生成 EFI
  async generateEFI() {
    await this.setState({
      operation: "generating",
      generateStep: "download",
      progress: 0,
      downloadSpeed: 0,
    });

    const downloadPath = localStorage.getItem("tfu-download-path"),
      separator = window.electron.isWin() ? "\\" : "/";
    const savePath = downloadPath + `${separator}Tongfang_EFI`;
    const saveFile = savePath + "/OpenCore.zip";

    if (this.state.downloadSource !== "local") await this.downloadLatest();
    else await this.processEFI(saveFile, savePath);
  }

  updatePercent(progress, downloadSpeed) {
    this.setState({ progress, downloadSpeed });
  }

  // 下载
  async downloadLatest() {
    const downloadPath = localStorage.getItem("tfu-download-path"),
      separator = window.electron.isWin() ? "\\" : "/";
    const savePath = downloadPath + `${separator}Tongfang_EFI`;
    const saveFile = savePath + "/OpenCore.zip";
    const fs = window.electron.fs();

    const downloadUrl =
      this.state.downloadSource === "bitbucket"
        ? config.download_url.bitbucket
        : this.state.downloadSource === "github"
        ? config.download_url.github
        : this.state.jsdelivrUrl;

    if (fs.existsSync(saveFile)) {
      fs.unlinkSync(saveFile);
    }
    try {
      window.electron.rmdir(savePath);
    } catch (err) {}

    window.electron.mkdir(savePath);
    setTimeout(() => {
      window.electron.downloadFile(
        downloadUrl,
        saveFile,
        () => this.processEFI(saveFile, savePath),
        (p, s) => this.updatePercent(p, Math.ceil(s / 1024))
      );
    }, 50);
  }

  async processEFI(saveFile, savePath) {
    await this.setState({
      generateStep: "processing",
      progress: 100,
    });

    const result = await processConfig(
      savePath,
      saveFile,
      this.barebones,
      this.state
    );
    await this.setState({
      generateStatus: result,
      currentStep: this.state.currentStep + 1,
      operation: "success",
    });
  }

  showUpdateLog() {
    makeAlert(this.state.updateLog);
  }

  nextPage() {
    this.setState(
      {
        currentStep: this.state.currentStep + 1,
      },
      () => this.handlePageChange()
    );
  }

  openPage(url) {
    window.electron.openPage(url);
  }

  handlePageChange() {
    if (this.state.currentStep === 1) {
      const current = this.selectModel.querySelector(".true");
      const lists = this.selectModel.querySelector(".model-lists");
      if (current && lists)
        lists.scrollTop = Math.max(0, current.offsetTop - lists.offsetTop - 20);
    }
  }

  handleFileSelect(e) {
    if (e.target.files.length === 0) return;
    console.log(e.target.files[0]);
    this.setState({
      backgroundFile: e.target.files[0],
    });
  }

  setOSVersion = (v) => this.setState({ osVersion: v });
  setWirelessCard = (v) => this.setState({ wirelessCard: v });
  setResolution = (v) => this.setState({ resolution: v });
  setDownloadSource = (v) => this.setState({ downloadSource: v });
  toggleOption(key) {
    const nextState = this.state;
    nextState[key] = !nextState[key];
    this.setState(nextState);
  }

  render() {
    return (
      <div className="configure">
        <Modal
          title={str("cannotDownloadTitle")}
          visible={this.state.showCannotDownloadSolution}
          footer={null}
          onCancel={() => this.setState({ showCannotDownloadSolution: false })}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: str("cannotDownloadSolution"),
            }}
          />
          <div
            className="download-lists"
            style={{ fontSize: 12, color: "#999" }}
          >
            {this.state.latestDev !== "Unknown" && (
              <li style={{ width: "100%" }}>
                JSDelivr: <br />
                <Button
                  type="link"
                  onClick={() => this.openPage(`${this.state.jsdelivrUrl}`)}
                >
                  {`${this.state.jsdelivrUrl}`}
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

        <style ref={(ref) => (this.stylesheet = ref)}></style>
        <h3 className="page-title">{str("configure")}</h3>
        <p className="page-description">{str("configureDescription")}</p>
        <img className="oc-logo" src={opencore} alt="opencore" />

        <div className="configure-guidance">
          <Steps size="small" current={this.state.currentStep}>
            {this.steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <div className="guidance-content">
            {this.state.currentStep === 0 && (
              <div className="prepare">
                <h1 className="content-title">
                  {str("checkComponentVersion")}
                </h1>
                <div className="version-info content-container">
                  <p className="version-item">
                    <span className="version-title">
                      {str("latestConfigVersion")}
                    </span>
                    ： {this.state.latestVersion} (
                    <Button type="link" onClick={() => this.showUpdateLog()}>
                      {str("updateLog")}
                    </Button>
                    )
                  </p>
                  <p className="version-item">
                    <span className="version-title">{str("localVersion")}</span>
                    ： {getCurrentVersionFromNVRAM()}
                  </p>
                  <p className="version-item">
                    <span className="version-title">{str("intelVersion")}</span>
                    ：{this.getIntelStatus()}
                  </p>
                  <p className="version-item">
                    <span className="version-title">
                      {str("voiceoverVersion")}
                    </span>
                    ：{this.getVoiceoverStatus()}
                  </p>
                </div>

                <h1 className="content-title">{str("readLicense")}</h1>
                <div className="license content-container">
                  <p className="step-tips">{str("pleaseReadLicense")}</p>
                  <div
                    className="license-content"
                    dangerouslySetInnerHTML={{ __html: str("license") }}
                  />
                  <p className="step-tips">{str("nextAndAgree")}</p>
                </div>
              </div>
            )}

            {this.state.currentStep === 1 && (
              <div
                className="select-model"
                ref={(ref) => (this.selectModel = ref)}
              >
                <h1 className="content-title">{str("selectModel")}</h1>
                <div className="model-filter">
                  <h4>
                    {str("currentModel")}：
                    <span className="model-name">
                      {this.models[this.state.laptop]}
                    </span>
                  </h4>
                  <Input
                    onChange={(v) => this.handleSearch(v)}
                    placeholder={str("filterModel")}
                    type={"search"}
                  />
                </div>
                <div className="model-lists">{this.renderModels()}</div>
              </div>
            )}

            {this.state.currentStep === 2 && (
              <div className="customize">
                <h1 className="content-title">{str("macOSversion")}</h1>
                <div className="os-select">
                  <div
                    onClick={() => this.setOSVersion("catalina")}
                    className={
                      "os-item catalina " +
                      (this.state.osVersion === "catalina")
                    }
                    aria-label={`macOS 10.15 Catalina ${
                      this.state.osVersion === "catalina" ? "已选中" : ""
                    }`}
                  >
                    <img src={catalina} alt="Catalina Logo" />
                    <span>macOS 10.15 Catalina</span>
                  </div>
                  <div
                    onClick={() => {
                      this.setOSVersion("bigsur");
                      this.setResolution("1080p");
                    }}
                    className={
                      "os-item bigsur " + (this.state.osVersion === "bigsur")
                    }
                    aria-label={`macOS 11.0 Big Sur ${
                      this.state.osVersion === "bigsur" ? "已选中" : ""
                    }`}
                  >
                    <img src={bigsur} alt="Big Sur Logo" />
                    <span>macOS 11.0 Big Sur</span>
                  </div>
                </div>

                <h1 className="content-title">{str("internetConnection")}</h1>
                <div className="internet-select">
                  <Popover content={str("appleWirelessModels")}>
                    <div
                      onClick={() => this.setWirelessCard("apple")}
                      className={`wcard-item apple ${
                        this.state.wirelessCard === "apple"
                      }`}
                      aria-label={`${str("appleWireless")} ${
                        this.state.wirelessCard === "apple" ? "已选中" : ""
                      }`}
                    >
                      <Apple />
                      <span>{str("appleWireless")}</span>
                    </div>
                  </Popover>
                  <Popover content={str("broadcomWirelessModels")}>
                    <div
                      onClick={() => this.setWirelessCard("broadcom")}
                      className={`wcard-item broadcom ${
                        this.state.wirelessCard === "broadcom"
                      }`}
                      aria-label={`${str("broadcomWireless")} ${
                        this.state.wirelessCard === "broadcom" ? "已选中" : ""
                      }`}
                    >
                      <Broadcom />
                      <span>{str("broadcomWireless")}</span>
                    </div>
                  </Popover>
                  <Popover content={str("intelWirelessModels")}>
                    <div
                      onClick={() => this.setWirelessCard("intel")}
                      className={`wcard-item intel ${
                        this.state.wirelessCard === "intel"
                      }`}
                      aria-label={`${str("intelWireless")} ${
                        this.state.wirelessCard === "intel" ? "已选中" : ""
                      }`}
                    >
                      <Intel />
                      <span>{str("intelWireless")}</span>
                    </div>
                  </Popover>
                  <div
                    onClick={() => this.toggleOption("rndis")}
                    className={`wcard-item usb ${this.state.rndis}`}
                    aria-label={`${str("usbRNDIS")} ${
                      this.state.rndis ? "已选中" : ""
                    }`}
                  >
                    <USB />
                    <span>{str("usbRNDIS")}</span>
                  </div>
                </div>

                <h1 className="content-title">
                  {str("innerScreenResolution")}
                </h1>
                <div className="resolution-select">
                  <div
                    className={`resolution-item ${
                      this.state.resolution === "1080p"
                    }`}
                    onClick={() => this.setResolution("1080p")}
                    aria-label={`1920 × 1080, 60Hz ${
                      this.state.resolution === "1080p" ? "已选中" : ""
                    }`}
                  >
                    <FHD />
                    <span>1920 × 1080 (60Hz)</span>
                  </div>
                  <Popover content={str("screen144Hz")}>
                    <div
                      className={`resolution-item ${
                        this.state.resolution === "1080p144"
                      }`}
                      onClick={() => this.setResolution("1080p144")}
                      aria-label={`1920 × 1080, 144Hz ${
                        this.state.resolution === "1080p144" ? "已选中" : ""
                      }`}
                    >
                      <Hz />
                      <span>1920 × 1080 (144Hz)</span>
                    </div>
                  </Popover>
                  <Popover
                    content={[
                      <p key={1}>{str("dontCheck4kIfNotRequire")}</p>,
                      (this.barebones[this.state.laptop] === "GJ5CN64" ||
                        this.barebones[this.state.laptop] === "GI5CN54") && (
                        <p key={2}>{str("requirement4k")}</p>
                      ),
                    ]}
                  >
                    <div
                      className={`resolution-item ${
                        this.state.resolution === "4k"
                      }`}
                      onClick={() => this.setResolution("4k")}
                    >
                      <UHD />
                      <span>3840 × 2160 (4K, UHD)</span>
                    </div>
                  </Popover>
                </div>

                <h1 className="content-title">{str("specialHardware")}</h1>
                <div className="special-hardware">
                  <Popover content={str("disableIncompatibleDescription")}>
                    <div
                      onClick={() => this.toggleOption("disableNVMe")}
                      className={`hardware-item ${this.state.disableNVMe}`}
                    >
                      <Disable />
                      <span>{str("disablePM981")}</span>
                    </div>
                  </Popover>

                  <Popover content={str("nvmeFixDescription")}>
                    <div
                      onClick={() => this.toggleOption("NVMeFix")}
                      className={`hardware-item nvmefix ${this.state.NVMeFix}`}
                    >
                      <SSD />
                      <span>{str("nvmefix")}</span>
                    </div>
                  </Popover>

                  {this.barebones[this.state.laptop] !== "GJ5KN64" && (
                    <Popover content={str("gucDescription")}>
                      <div
                        onClick={() => this.toggleOption("appleGuC")}
                        className={`hardware-item ${this.state.appleGuC}`}
                      >
                        <Graphics />
                        <span>{str("loadguc")}</span>
                      </div>
                    </Popover>
                  )}

                  <Popover content={str("bestPerformanceTips")}>
                    <div
                      onClick={() => this.toggleOption("cpuBestPerformance")}
                      className={`hardware-item ${this.state.cpuBestPerformance}`}
                    >
                      <Chipset />
                      <span>{str("bestPerformance")}</span>
                    </div>
                  </Popover>
                </div>

                <h1 className="content-title">{str("personalize")}</h1>
                <div className="personalize-settings">
                  <div
                    onClick={() => this.toggleOption("bootChime")}
                    className={`ps-item ${this.state.bootChime}`}
                  >
                    <Bootchime />
                    <span>{str("bootChime")}</span>
                  </div>
                  <Popover content={str("accessibilityDescription")}>
                    <div
                      onClick={() => this.toggleOption("accessibility")}
                      className={`ps-item ${this.state.accessibility}`}
                    >
                      <Accessibility />
                      <span>{str("accessibility")}</span>
                    </div>
                  </Popover>
                  {this.state.wirelessCard === "intel" && (
                    <Popover content={str("useAirportItlwmDescription")}>
                      <div
                        onClick={() => this.toggleOption("useAirportItlwm")}
                        className={`ps-item ${this.state.useAirportItlwm}`}
                      >
                        <Shortcut />
                        <span>{str("useAirportItlwm")}</span>
                      </div>
                    </Popover>
                  )}
                </div>
              </div>
            )}

            {this.state.currentStep === 3 && (
              <div className="personalize">
                <div className="smbios-set">
                  <h1 className="content-title">{str("setSMBIOSInfo")}</h1>
                  <div className="smbios-regen-button">
                    <Popover placement="left" content={str("regenerate")}>
                      <Button
                        aria-label={str("regenerate")}
                        size="large"
                        type="primary"
                        className="regenerate"
                        shape="circle"
                        onClick={() => this.reGenerateSMBIOS()}
                      >
                        <FormatPainterOutlined />
                      </Button>
                    </Popover>
                  </div>
                  <p className="step-tips">
                    {str("SMBIOSInfoSource")}：
                    {this.state.smbiosGenerated
                      ? str("getSMBIOSFromGeneration")
                      : str("getSMBIOSFromSystem")}
                    ，{str("leaveItAsIsIfYouDontKnow")}
                  </p>
                  <div className="smbios-container">{this.getSMBIOSInfo()}</div>
                </div>

                <div className="set-background">
                  <h1 className="content-title">{str("setBackground")}</h1>
                  <p className="step-tips">{str("setBackgroundDescription")}</p>
                  <div className="custom-bg-button">
                    <label>{str("useCustomBackground")}</label>
                    <Switch
                      defaultChecked={this.state.customBackground}
                      onChange={(v) => this.setState({ customBackground: v })}
                    />
                  </div>
                  {this.state.customBackground && (
                    <div className="custom-bg-input">
                      <input
                        type="file"
                        ref={(ref) => (this.fileInput = ref)}
                        style={{ display: "none" }}
                        onChange={(e) => this.handleFileSelect(e)}
                        accept=".png,.icns"
                      />
                      <Button
                        onClick={() => this.fileInput.click()}
                        shape="round"
                      >
                        {str("selectBackgroundImage")}
                      </Button>
                      {this.state.backgroundFile !== null && (
                        <p className="selected-file-name">
                          {str("selectedImage")}:{" "}
                          {this.state.backgroundFile.path}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {this.state.operation === "choose" && this.state.currentStep === 4 && (
              <div className="generate-efi">
                <h1 className="content-title">{str("confirmYourChoose")}</h1>
                <ul className="confirm-info">
                  <li>
                    <span className="confirm-item">{str("YourModel")}: </span>
                    <span className="confirm-value">
                      {this.models[this.state.laptop]}
                    </span>
                  </li>
                  <li>
                    <span className="confirm-item">
                      {str("YourOSToBeInstalled")}:{" "}
                    </span>
                    <span className="confirm-value">
                      {this.state.osVersion === "catalina"
                        ? "macOS 10.15 Catalina"
                        : "macOS 11.0 Big Sur"}
                    </span>
                  </li>
                  {(this.barebones[this.state.laptop] === "GJ5CN64" ||
                    this.barebones[this.state.laptop] === "GI5CN54") &&
                    this.state.resolution === "4k" && (
                      <p className="step-tips small-text">
                        {str("requirement4k")}
                      </p>
                    )}
                  <li>
                    <span className="confirm-item">
                      {str("YourWirelessCard")}:{" "}
                    </span>
                    <span className="confirm-value">
                      {(() => {
                        let display = "";
                        if (this.state.wirelessCard === "apple")
                          display += str("appleWireless");
                        else if (this.state.wirelessCard === "broadcom")
                          display += str("broadcomWireless");
                        else if (this.state.wirelessCard === "intel")
                          display +=
                            str("intelWireless") +
                            "(" +
                            (this.state.useAirportItlwm
                              ? str("nativeItlwm")
                              : str("heliportItlwm")) +
                            ")";

                        if (this.state.rndis)
                          display +=
                            ", " + str("addition") + " " + str("usbRNDIS");
                        return display;
                      })()}
                    </span>
                  </li>
                  <li>
                    <span className="confirm-item">
                      {str("YourResolution")}:{" "}
                    </span>
                    <span className="confirm-value">
                      {this.state.resolution === "1080p"
                        ? "1920 x 1080 (1080p)"
                        : this.state.resolution === "1080p144"
                        ? "1920 x 1080 (1080p, 144Hz)"
                        : "3840 x 2160 (4K)"}
                    </span>
                  </li>

                  {(() => {
                    if (!this.state.disableNVMe && !this.state.NVMeFix)
                      return null;
                    let display = "",
                      flag = false;
                    if (this.state.disableNVMe) {
                      display += str("YouDisabledNVMe");
                      flag = true;
                    }
                    if (this.state.NVMeFix)
                      display += (flag ? ", " : "") + str("YouEnabledNVMeFix");
                    return (
                      <li>
                        <span className="confirm-value">{display}</span>
                      </li>
                    );
                  })()}

                  {(() => {
                    if (!this.state.appleGuC && !this.state.cpuBestPerformance)
                      return null;
                    let display = "",
                      flag = false;
                    if (this.state.appleGuC) {
                      display += str("YouEnabledGuC");
                      flag = true;
                    }
                    if (this.state.cpuBestPerformance)
                      display +=
                        (flag ? ", " : "") +
                        str("YouEnabledCPUBestPerformance");
                    return (
                      <li>
                        <span className="confirm-value">{display}</span>
                      </li>
                    );
                  })()}

                  {this.state.accessibility && (
                    <li>
                      <span className="confirm-value">
                        {str("YouEnabledAccessibility")}
                      </span>
                    </li>
                  )}
                </ul>

                {(() => {
                  const conflict = this.checkOptions();
                  return conflict.length ? (
                    <div className="resolve-conflict">
                      <h1 className="content-title">
                        {str("conflictDetected")}
                      </h1>
                      <p className="step-tips">{str("resolveConflict")}</p>
                      <ul>{conflict}</ul>
                    </div>
                  ) : (
                    <React.Fragment>
                      <h1 className="content-title">
                        {str("readyToGenerate")}
                      </h1>
                      <p className="step-tips">{str("downloadSource")}</p>
                      <div className="select-source">
                        <div
                          onClick={() => this.setDownloadSource("bitbucket")}
                          className={`source-item bitbucket ${
                            this.state.downloadSource === "bitbucket"
                          }`}
                        >
                          <Bitbucket />
                          {str("downloadFromBitbucket")}
                        </div>
                        <div
                          onClick={() => this.setDownloadSource("github")}
                          className={`source-item github ${
                            this.state.downloadSource === "github"
                          }`}
                        >
                          <GitHub />
                          {str("downloadFromGitHub")}
                        </div>
                        {this.state.jsdelivrUrl && (
                          <div
                            onClick={() => this.setDownloadSource("jsdelivr")}
                            className={`source-item jsdelivr ${
                              this.state.downloadSource === "jsdelivr"
                            }`}
                          >
                            <JSDelivr />
                            {str("downloadFromJSDelivr")} ({str("recommend")})
                          </div>
                        )}
                        {this.configExists() && (
                          <div
                            onClick={() => this.setDownloadSource("local")}
                            className={`source-item local ${
                              this.state.downloadSource === "local"
                            }`}
                          >
                            <Laptop />
                            {str("generateEFI")}
                          </div>
                        )}
                      </div>
                      <p className="step-tips" style={{ marginTop: 10 }}>
                        {str("clickToGenerate")}
                      </p>
                    </React.Fragment>
                  );
                })()}
              </div>
            )}

            {this.state.operation === "generating" &&
              this.state.currentStep === 4 && (
                <div className="generate-page">
                  <Progress
                    type="circle"
                    percent={this.state.progress}
                    status="active"
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                    style={{
                      margin: "0 auto",
                    }}
                  />
                  <p style={{ fontSize: 18 }}>
                    <LoadingOutlined />
                    <span style={{ marginLeft: 10 }}>
                      {this.state.generateStep === "download"
                        ? str("downloadWait") +
                          ` (${this.state.downloadSpeed} KB/s)`
                        : str("generating")}
                      ...
                    </span>
                  </p>
                  <p>
                    <Button
                      onClick={() =>
                        this.toggleOption("showCannotDownloadSolution")
                      }
                      type="link"
                    >
                      {str("cannotDownload")}
                    </Button>
                  </p>
                </div>
              )}

            {this.state.currentStep === 5 && this.state.generateStatus && (
              <div className="result-success">
                <h1 className="content-title">{str("success")}</h1>
                <div className="result-content">
                  <div className="result-logo">
                    <Success />
                  </div>

                  <div
                    className="success-instruction"
                    role={"alert"}
                    aria-atomic={true}
                  >
                    <p>{str("successInfo")}</p>
                    <ul>
                      <li className="success-item">
                        {str("successInstructionUSB")}
                      </li>
                      <li className="success-item">
                        {str("successInstructionHD")}
                      </li>
                      <li className="success-item">
                        {str("deleteBeforeReplace")}
                      </li>
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
                  </div>
                </div>

                {window.electron.isMac() && this.getESP()}
              </div>
            )}

            {(this.state.operation === "choose" ||
              this.state.operation === "success") && (
              <div className="actions-button">
                {this.state.currentStep > 0 && this.state.currentStep < 5 && (
                  <Button
                    shape="round"
                    onClick={() =>
                      this.setState(
                        { currentStep: this.state.currentStep - 1 },
                        () => this.handlePageChange()
                      )
                    }
                  >
                    {str("prevStep")}
                  </Button>
                )}
                {this.state.currentStep === 4 && (
                  <Button
                    disabled={this.checkOptions().length !== 0}
                    shape="round"
                    type="primary"
                    onClick={() => this.generateEFI()}
                  >
                    <CloudDownloadOutlined />
                    {this.state.downloadSource === "local"
                      ? str("generateEFI")
                      : str("getLatest")}
                  </Button>
                )}
                {this.state.currentStep < this.steps.length - 2 && (
                  <Button
                    shape="round"
                    type="primary"
                    onClick={() => this.nextPage()}
                  >
                    {str("nextStep")}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
