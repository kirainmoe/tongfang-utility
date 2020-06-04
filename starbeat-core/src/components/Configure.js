import React, { Component } from "react";
import { createHashHistory } from "history";
import { Select, Checkbox, Input, Button } from "antd";

import "../styles/Configure.styl";

import str from "../resource/string";
import config from "../config";
import Plist from "../utils/plist";
import Success from "../icons/Success";

const { Option, OptGroup } = Select;

export default class Configure extends Component {
  barebones = [];
  brandTag = [];
  options = {
    airport: false,
    intel: false,
    brcm: false,
    rndis: false,
    support4k: false,
    pm981: false,
    fixhibernate: false,
    usefakesmc: false,
    loadguc: false,
    nvmefix: false
  };
  kextstatRes = "";
  nvramRes = "";
  defaultOpts = [
    { label: str("injectAirport"), value: "airport", defaultVal: this.isKextLoaded("Airport") },
    { label: str("injectIntelBluetooth"), value: "intel", defaultVal: this.isKextLoaded("IntelBluetooth") },
    { label: str("injectBrcmBluetooth"), value: "brcm", defaultVal: this.isKextLoaded("BrcmBluetooth") },
    { label: str("injectHoRNDIS"), value: "rndis", defaultVal: false },
    { label: str("inject4KSupport"), value: "support4k", defaultVal: this.hasParam('igfxmlr') },
    { label: str("disablePM981"), value: "pm981", defaultVal: false },
    { label: str("fixhibernate"), value: "fixhibernate", defaultVal: this.isKextLoaded('Hibernation') },
    { label: str("useFakeSMC"), value: "usefakesmc", defaultVal: this.isKextLoaded('FakeSMC') },
    { label: str("nvmefix"), value: "nvmefix", defaultVal: this.isKextLoaded('NVMeFix') },
    { label: str("loadguc"), value: "loadguc", defaultVal: this.hasParam('igfxfw') }
  ];

  constructor(props) {
    super(props);

    if (window.electron.isWin() && window.location.search.indexOf("reloaded") < 0) {
      window.location.href = window.location.href = "?reloaded=true";
    }

    /* 获取 & 生成 SMBIOS 信息 */
    let smbios = null, smbiosGenerated = null;
    try {
      smbios = window.electron.getMacSerial();
      smbiosGenerated = false;
    } catch (err) {
      alert(str('failedToGetSN'));
    }
    /* 如果 SMBIOS 信息为空，说明程序无法获取 SMBIOS 信息，使用 macserial 随机生成 */
    if (!smbios) {
      smbios = window.electron.generateMacSerial();
      smbiosGenerated = true;
    }

    this.state = {
      latestDev: "Unknown",
      downloading: false,
      workStatus: str("getLatest"),
      ...smbios,
      laptop: navigator.language === 'zh-CN' ? 8 : 0,
      smbiosGenerated,
      success: false,
      percent: 0,
      speed: 0,
      modal_visible: false,
      modal_content: '',
      download_url: navigator.language === 'zh-CN'
        ? config.download_url.buildbot
        : config.download_url.bitbucket
    };

    this.checkVersion();
  }

  componentWillMount() {
    /* 防止使用默认序列号，提示更换 */
    if (this.state.sn === "C02X3088KGYG" || this.state.sn === "C02WM0Q0KGYG") {
      // eslint-disable-next-line
      if (confirm(str('dontUseDefault'))) {
        const smbios = window.electron.generateMacSerial();
        this.setState({
          ...smbios,
          smbiosGenerated: true
        });
      }
    }
  }

  /* 检查版本更新 */
  checkVersion() {
    const versionUrl = "https://api.kirainmoe.com/starbeatVersion";
    fetch(versionUrl)
      .then(res => res.json())
      .then(data => {
        if (data.build > config.build || window.location.href.indexOf('github') >= 0) {
          alert(str('updateRequired'));
          createHashHistory().push('/update');
        } else
          this.setState({  latestDev: data.latestDev  });
      });
  }

  /* 获取模具、机型列表，写在 config.js 中 */
  getModelList() {
    const res = [];
    let index = 0, brand = 0;
    config.supported_machine.forEach((s) => {
      const models = [];
      s.models.forEach((mach) => {
        this.barebones[index] = mach.barebone;
        this.brandTag[index] = s.vendorTag;
        models.push(
          <Option key={index} value={index++}>
            {mach.model}
          </Option>
        );
      });

      res.push(
        <OptGroup key={brand++} label={s.brand}>
          {models}
        </OptGroup>
      );
    });
    return res;
  }

  /* 渲染下载源；大陆默认使用 Aya Buildbot，海外默认使用 bitbucket */
  getDownloadSource() {
    const res = [];
    let index = 0;
    res.push(
      <Option key={index++} value={config.download_url.buildbot}>
        Aya BuildBot ({str("recommend")})
      </Option>
    );    
    res.push(
      <Option key={index++} value={config.download_url.bitbucket}>
        BitBucket
      </Option>
    );
    res.push(
      <Option key={index++} value={config.download_url.github}>
        GitHub
      </Option>
    );
    res.push(
      <Option key={index++} value={config.download_url.github_mirror}>
        GitHub 非官方镜像
      </Option>
    );
    res.push(
      <Option key={index++} value={config.download_url.cloudflare}>
        CloudFlare CDN
      </Option>
    );
    return res;
  }

  handleOptionChange(v, opts) {
    let selected = {};
    opts.forEach(opt => (selected[opt.value] = 0));
    v.forEach(item => (selected[item] = 1));

    // 勾选 4K 时显示警告
    if (!this.options.support4k && selected["support4k"]) {
      alert(str("dontCheck4kIfNotRequire"));
    }

    // 对 GI5CN54 / GJ5CN64 的用户勾选 4K 时提示警告
    if (!this.options.support4k && selected["support4k"] &&
      (this.barebones[this.state.laptop] === "GJ5CN64" ||
        this.barebones[this.state.laptop] === "GI5CN54")) {
      alert(str("requirement4k"));
    }

    for (const i in selected) {
      if (!selected.hasOwnProperty(i))
        continue;
      this.options[i] = selected[i];
    }
  }

  isKextLoaded(kextName) {
    if (!window.electron.isMac())
      return false;
    if (this.kextstatRes !== "") {
      return this.kextstatRes.indexOf(kextName) >= 0;
    }
    try {
      const proc = window.require('child_process');
      const stdout = proc.execSync(`kextstat`).toString();
      this.kextstatRes = stdout;
    } catch (err) {
      return false;
    }
    return this.kextstatRes.indexOf(kextName) >= 0;
  }

  hasParam(param) {
    if (!window.electron.isMac())
      return false;
    try {
      const proc = window.require('child_process');
      const stdout = proc.execSync(`nvram -p | grep "${param}"`).toString();
      return (stdout !== '');    
    } catch (err) {
      return false;
    }
  }

  /* 显示选项 */
  getOptions() {
    const opts = this.defaultOpts;

    let nextState = {}, defaultValues = [];
    opts.forEach(opt => {
      nextState[opt.value] = opt.defaultVal;

      if (opt.defaultVal)
        defaultValues.push(opt.value);
    });

    return (
      <Checkbox.Group
        options={opts}
        defaultValue={defaultValues}
        onChange={v => this.handleOptionChange(v, opts)}
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

  /* 渲染 SMBIOS 信息 */
  getSMBIOSInfo() {
    return (
      <div className="smbios-input">
        <div>
          <label>{str("smbiosModel")}</label>
          <Input
            onChange={v => this.setOpt("model", v.target.value)}
            defaultValue={this.state.model}
          />
        </div>
        <div>
          <label>{str("smbiosSN")}</label>
          <Input onChange={v => this.setOpt("sn", v.target.value)} defaultValue={this.state.sn} />
        </div>
        <div>
          <label>{str("smbiosMLB")}</label>
          <Input onChange={v => this.setOpt("mlb", v.target.value)} defaultValue={this.state.mlb} />
        </div>
        <div>
          <label>{str("smbiosSmUUID")}</label>
          <Input
            onChange={v => this.setOpt("smuuid", v.target.value)}
            defaultValue={this.state.smuuid}
          />
        </div>
      </div>
    );
  }

  updatePercent = (percent, speed) => this.setState({ percent, speed })

  showChooseGuide = () => alert(str('chooseGuide'))

  sleep(time = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    })
  };

  openPage(url) {
    window.electron.openPage(url);
  }

  async downloadLatest() {
    if (navigator.language === 'zh-CN') {
      alert(str('license'));
    }

    this.setState({
      workStatus: str("downloadWait"),
      downloading: true
    });

    const savePath = window.electron.getUserDir() + "/Desktop/Tongfang_EFI";
    try {
      window.electron.rmdir(savePath);
    } catch (e) {}
    window.electron.mkdir(savePath);
    const saveFile = savePath + "/OpenCore.zip";

    setTimeout(() => {
      window.electron.downloadFile(this.state.download_url, saveFile, () => {
        this.setState({ workStatus: str("generating") });
        setTimeout(async() => {
          try {
            window.electron.unzip(saveFile, savePath + "/OpenCore");

            const fs = window.electron.fs();
            window.electron.rmdir(`${savePath}/BOOT`);

            let extractPath;
            fs.readdirSync(`${savePath}/OpenCore`).forEach(path => {
              if (path.indexOf("ayamita") >= 0 || path.indexOf("hasee-tongfang-macos") >= 0)
                extractPath = path;
            });

            // sleep() for fixing Windows sync thread error
            window.electron.rmdir(`${savePath}/BOOT`);
            await fs.rename(`${savePath}/OpenCore/${extractPath}/BOOT`, `${savePath}/BOOT`, () => {});
            await this.sleep(500);
            window.electron.rmdir(`${savePath}/OC`);
            await this.sleep(500);
            await fs.rename(`${savePath}/OpenCore/${extractPath}/OC`, `${savePath}/OC`, () => {});
            await this.sleep(500);
            await fs.rename(`${savePath}/OpenCore/${extractPath}/Docs/Credits.md`, `${savePath}/OC/Credits.md`, () => {});
            await this.sleep(500);
            window.electron.rmdir(`${savePath}/OpenCore`);
            await this.sleep(500);
            await fs.unlink(`${savePath}/OC/Icons/Background.png`, () => {});
            await this.sleep(500);
            await fs.rename(`${savePath}/OC/Icons/Background-${this.brandTag[this.state.laptop]}.png`,
                            `${savePath}/OC/Icons/Background.png`, () => {});


            const content = window.electron.readFile(savePath + "/OC/config.plist");
            const plist = new Plist(content);
            window.p = plist;

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
                fs.renameSync(ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml", ACPIdir + "/SSDT-UIAC.aml");              break;
              case "GJ5CN64":
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml");
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml");
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                fs.renameSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml", ACPIdir + "/SSDT-UIAC.aml");
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
                fs.renameSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml", ACPIdir + "/SSDT-UIAC.aml");
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
                fs.renameSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml", ACPIdir + "/SSDT-UIAC.aml");
                this.options.loadguc = true;
                break;
              case "GK5CP6X":
              case "GK5CP6Z":
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK7CP6R.aml");
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GJ5CN64.aml");
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GI5CN54.aml");
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC-GK5CN6Z.aml");
                fs.unlinkSync(ACPIdir + "/SSDT-UIAC.aml");
                fs.renameSync(ACPIdir + "/SSDT-UIAC-GK5CP6X.aml", ACPIdir + "/SSDT-UIAC.aml");
                this.options.loadguc = true;
                break;
            }

            if (this.options.airport) {
              plist.setKext("AirportBrcmFixup", true);
              plist.setBootArg("brcmfx-country=#a");
            }
            if (this.options.intel)
              plist.setKext("IntelBluetooth", true);
            if (this.options.brcm) {
              plist.setKext("BrcmBluetoothInjector", true);
              plist.setKext("BrcmFirmwareData", true);
              plist.setKext("BrcmPatchRAM3", true);
            }
            if (this.options.rndis)
              plist.setKext("HoRNDIS", true);
            if (this.options.pm981)
              plist.setSSDT("SSDT-DNVME", true);
            if (this.options.fixhibernate)
              plist.setKext("HibernationFixup", true);
            if (this.options.usefakesmc) {
              plist.setKext("VirtualSMC", false);
              plist.setKext("SMCBatteryManager", false);
              plist.setKext("SMCLightSensor", false);
              plist.setKext("SMCProcessor", false);
              plist.setKext("SMCSuperIO", false);

              plist.setKext("FakeSMC", true);
              plist.setKext("ACPIBattery", true);
              plist.setSSDT("SSDT-SMCD", true);
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
            if (this.options.loadguc)
              plist.setBootArg("igfxfw=2");
            if (this.options.nvmefix)
              plist.setKext("NVMeFix", true);

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
            alert(str('downloadFailed') + '\n' + err);
            console.error(err);
          }
        }, 1000);
      }, (p, s) => this.updatePercent(p, s));
    }, 50);
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
                {(() => {
                  if (navigator.language === 'zh-CN') {
                    return (
                      <li className="success-item">
                        仍然不知道如何安装/替换？请参考
                        <Button
                          onClick={() => this.openPage('https://www.bilibili.com/video/BV1uJ411Y77y')}
                          type="link">
                            教学视频
                        </Button>
                        的演示。
                      </li>
                    )
                  }
                })()}
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
              defaultValue={config.supported_machine[0].models.length}
              style={{
                width: "100%"
              }}
              onChange={val => this.setState({ ...this.state, laptop: val })}
            >
              {this.getModelList()}
            </Select>

            <p>
              {str("injectOption")} 
              （<Button type="link" onClick={this.showChooseGuide} style={{ padding:0 }}>
                {str('whatShouldIChoose')}
                </Button>）
            </p>
            <div className="inject-options">{this.getOptions()}</div>

            <p>
              {str("smbiosInfo")}(
              {this.state.smbiosGenerated
                ? str("getSMBIOSFromGeneration")
                : str("getSMBIOSFromSystem")}
              )
            </p>
            <div className="smbios-info">{this.getSMBIOSInfo()}</div>
            <div className="flex">
              <div className="half">
                <p>{str("downloadSource")}</p>
                <Select
                  showSearch
                  optionFilterProp="children"
                  defaultValue={navigator.language === 'zh-CN' ? config.download_url.buildbot : config.download_url.bitbucket}
                  style={{
                    width: "100%"
                  }}
                  onChange={val => 
                    this.setState({ ...this.state, download_url: val })
                  }
                >
                  {this.getDownloadSource()}
                </Select>
              </div>

              <div className="half">
                <p>{str("versionInfo")}</p>
                <div className="version-info">
                  <p className="version-tag">
                    {str("latestVersion")}: {this.state.latestDev}
                  </p>
                </div>
              </div>
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
                {this.state.downloading ? " (" + this.state.percent + "% " + Math.ceil(this.state.speed / 1024) +  "K/s)" : ""}
              </Button>
            </div>
          </div>
        </div>
      );
  }
}
