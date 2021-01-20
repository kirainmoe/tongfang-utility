import React, { Component } from "react";
import { createHashHistory } from "history";
import { Progress, Input, Modal, Button } from "antd";

import config from "../config";
import str from "../resource/string";
import "../styles/Dashboard.styl";

import { getNVRAMValue } from "../utils/env";
import isNumeric from "../utils/isNumeric";

const macImage = require("../resource/macbook.jpg");
const defaultAvatar = require("../resource/defaultAvatar.jpg");

export default class Dashboard extends Component {
  cp = null;
  macstat = null;
  interval = null;
  models = [];
  themes = {
    default: "#91d5ff",
    green: "#b7eb8f",
    pink: "#ff85c0",
    purple: "#d3adf7",
    h1f1e33: "#1f1e33",
  };
  count = 0;
  usageRecord = [];

  constructor(props) {
    super(props);
    this.cp = window.require("child_process");
    try {
      this.macstat = window.require("macstats");
    } catch (err) {
      this.macstat = null;
    }

    let smbios = window.electron.getMacSerial();
    this.prepareLaptopsList();

    this.state = {
      computerName: this.exec("scutil --get ComputerName"),
      ...smbios,

      cpuTemp: 0,
      cpuUtil: 0,
      memoryUsed: 0,
      memoryTotal: 1024,
      storage: 0,
      percentage: 0,
      charging: false,
      installed: false,

      owner: localStorage.getItem("owner"),
      avatar: this.getAvatar(localStorage.getItem("avatar")),
      changeModal: false,
      ownerPlaceholder: localStorage.getItem("owner"),
      avatarPlaceholder: localStorage.getItem("avatar"),
    };
  }

  getAvatar(item) {
    if (!item) return defaultAvatar;
    if (isNumeric(item)) return `http://q1.qlogo.cn/g?b=qq&nk=${item}&s=5`;
    return item;
  }

  prepareLaptopsList() {
    let index = 0;
    config.supported_machine.forEach((s) => {
      s.models.forEach((mach) => (this.models[index++] = mach.model));
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.updateRealtimeData.bind(this), 1000);
    this.updateRealtimeData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  exec(command) {
    return this.cp.execSync(command).toString();
  }

  updateRealtimeData() {
    const cpuTemp = this.getCPUTempature(),
      cpuUtil = this.getCPUUtilization();
    const mem = this.getMemoryUsage(),
      storage = this.getStorageUsage(),
      battery = this.getBatteryInfo();
    this.setState({
      cpuTemp,
      cpuUtil,
      ...mem,
      storage,
      ...battery,
    });
  }

  getSMBIOSModel(model) {
    switch (model) {
      case "MacBookPro14,3":
        return "MacBook Pro 15-inch, 2017";
      case "MacBookPro15,1":
        return "MacBook Pro 15-inch, 2018";
      case "MacBookPro15,2":
        return "MacBook Pro 13-inch, 2018";
      case "MacBookPro15,3":
        return "MacBook Pro 15-inch, 2019";
      case "MacBookPro15,4":
        return "MacBook Pro 13-inch, 2019";
      case "MacBookPro16,1":
        return "MacBook Pro 16-inch, 2019";
      default:
        return "MacBook";
    }
  }

  getRealModel() {
    let modelId = getNVRAMValue("efi-model");
    if (modelId === null) return str("unknown");
    if (modelId.indexOf("model-") === -1) return false;
    return this.models[Number(modelId.replace("model-", ""))];
  }

  getCPUTempature() {
    if (this.macstat) return this.macstat.getCpuDataSync().temperature;
    return null;
  }

  getBatteryInfo() {
    if (this.macstat) {
      const batteryData = this.macstat.getBatteryDataSync();
      this.count++;
      if (this.count % 10) {
        this.count = 0;
      }

      return {
        percentage: Math.round((batteryData.current_capacity / batteryData.max_capacity) * 100),
        charging: batteryData.is_charging,
        installed: batteryData.battery_installed,
      };
    }
    return {
      percentage: 0,
      charging: false,
      installed: false,
    };
  }

  getCPUUtilization() {
    try {
      const util = this.exec(`ps -A -o %cpu | awk '{s+=$1} END {print s}'`),
        thread = this.exec(`sysctl -n machdep.cpu.thread_count`);
      return Math.round(Number(util.trim()) / Number(thread.trim()), 2);
    } catch (e) {
      return 0;
    }
  }

  getMemoryUsage() {
    try {
      const ret = this.exec("vm_stat").split("\n"),
        results = {};
      for (let i = 1; i < ret.length - 1; i++) {
        const item = ret[i];
        const tmp = item.replace(/\s+/g, " ").replace(/\./g, "").split(": ");
        results[tmp[0]] = (Number(tmp[1]) * 4096) / 1024 / 1024;
      }
      const free = results["Pages free"] + results["Pages purgeable"] + results["Pages wired down"],
        total = results["Pages free"] + results["Pages active"] + results["Pages inactive"] + results["Pages wired down"];
      return {
        memoryUsed: total - free,
        memoryTotal: total,
      };
    } catch (e) {
      return {
        memoryUsed: 0,
        memoryTotal: 1024,
      };
    }
  }

  getStorageUsage() {
    try {
      const ret = this.exec("df -h ~").split("\n")[1].replace(/\s+/g, " ").split(" ")[4].replace("%", "");
      return ret;
    } catch (e) {
      return 0;
    }
  }

  getStrokeColor(percent) {
    if (percent <= 30) {
      return {
        "0%": "#108ee9",
        "30%": "#87d068",
      };
    }
    if (percent <= 70) {
      return {
        "0%": "#91d5ff",
        "70%": "#096dd9",
      };
    }
    return {
      "0%": "#cf1322",
      "100%": "#ffa940",
    };
  }

  getGreetInfo() {
    if (!this.state.owner || !this.state.owner.length) {
      return str("setOwnerInfo");
    }
    const currentTime = new Date().getHours(),
      time =
        currentTime >= 5 && currentTime < 12
          ? "morning"
          : currentTime >= 12 && currentTime < 13
          ? "noon"
          : currentTime < 18
          ? "afternoon"
          : "evening";
    return `${str(time)}, ${this.state.owner}`;
  }

  determineOSVersion() {
    if (!window.electron.isMac()) return "Unknown";
    const cp = window.require("child_process"),
      output = cp.execSync("sw_vers").toString();
    if (output.indexOf("11.") >= 0) return "macOS 11.0 Big Sur";
    if (output.indexOf("10.15") >= 0) return "macOS 10.15 Catalina";
    if (output.indexOf("10.14") >= 0) return "macOS 10.14 Mojave";
    return "Unknown";
  }

  setTheme(theme) {
    localStorage.setItem("theme", theme);
    window.location.reload();
  }

  renderPalettes() {
    const colors = [];
    for (const key in this.themes) {
      const theme = this.themes[key];
      colors.push(
        <div
          aria-label={"切换颜色：" + key}
          key={key}
          className="palette-item"
          style={{
            background: theme,
          }}
          onClick={() => this.setTheme(key)}
        ></div>
      );
    }
    return colors;
  }

  render() {
    const memPercent = Math.floor((this.state.memoryUsed / this.state.memoryTotal) * 100),
      realModel = this.getRealModel();
    return (
      <div className="dashboard">
        <Modal
          title={str("setOwnerInfo")}
          visible={this.state.changeModal}
          onOk={() => {
            this.setState({
              changeModal: false,
              owner: this.state.ownerPlaceholder,
              avatar: this.getAvatar(this.state.avatarPlaceholder),
            });
            localStorage.setItem("owner", this.state.ownerPlaceholder);
            localStorage.setItem("avatar", this.state.avatarPlaceholder);
          }}
          onCancel={() => this.setState({ changeModal: false })}
        >
          <Input
            placeholder={str("ownerName")}
            value={this.state.ownerPlaceholder}
            onChange={(v) => this.setState({ ownerPlaceholder: v.target.value })}
          />
          <Input
            ref={(ref) => (this.avatarField = ref)}
            placeholder={str("ownerAvatar")}
            value={this.state.avatarPlaceholder}
            onChange={(v) => this.setState({ avatarPlaceholder: v.target.value })}
          />
        </Modal>
        <h3 className="page-title">{str("dashboard")}</h3>

        <div className="device-info">
          <h3 className="content-title">{str("deviceInfo")}</h3>
          <div className="mac-image">
            <img src={macImage} alt="macbook" />
          </div>
          <div className="device-info-items">
            <p className="device-info-item">
              <span>{str("computerName")}：</span>
              {this.state.computerName}
            </p>
            <p className="device-info-item">
              <span>SMBIOS {str("smbiosModel")}：</span>
              {this.getSMBIOSModel(this.state.model)}
            </p>
            <p className="device-info-item">
              <span>{str("realModel")}：</span>
              {realModel ? (
                realModel
              ) : (
                <Button onClick={() => createHashHistory().push("/config")} style={{ padding: 0 }} type="link">
                  {str("requestEFIUpdate")}
                </Button>
              )}
            </p>
            <p className="device-info-item">
              <span>{str("osVersion")}：</span>
              {this.determineOSVersion()}
            </p>
          </div>
          <h3 className="content-title">{str("resourceUsage")}</h3>
          <div className="resource">
            <div className="cpu-temperature">
              <Progress
                type="dashboard"
                percent={this.state.cpuTemp}
                strokeColor={this.getStrokeColor(this.state.cpuTemp)}
                format={(percent) => `${percent}°C`}
              />
              <p>{str("cpuTemperature")}</p>
            </div>
            <div className="cpu-utilization">
              <Progress
                strokeColor={this.getStrokeColor(this.state.cpuUtil)}
                type="dashboard"
                percent={this.state.cpuUtil}
                format={(percent) => `${percent} %`}
              />
              <p>{str("cpuUtilization")}</p>
            </div>
            <div className="memory-utilization">
              <Progress
                type="dashboard"
                percent={memPercent}
                strokeColor={this.getStrokeColor(memPercent)}
                format={(percent) => `${percent} %`}
              />
              <p>{str("memoryUtilization")}</p>
            </div>
            <div className="stroage-utilization">
              <Progress
                type="dashboard"
                percent={this.state.storage}
                strokeColor={this.getStrokeColor(this.state.storage)}
                format={(percent) => `${percent} %`}
              />
              <p>{str("storageUtilization")}</p>
            </div>
          </div>

          <div className="battery-status">
            <h1 className="content-title">{str("batteryInfo")}</h1>

            <div className={`battery-shape ${this.state.charging}`}>
              <div className="battery-border"></div>
              <div
                className="battery-height"
                style={{
                  width: `calc(${this.state.percentage}% - 8px)`,
                }}
              ></div>
            </div>

            <p className="battery-percentage">
              {this.state.installed
                ? `${this.state.percentage}% ${this.state.charging ? " (" + str("charging") + ") " : ""}`
                : str("batteryNotInstalled")}
            </p>
          </div>

          <div className="owner-info" onClick={() => this.setState({ changeModal: true })}>
            <img src={this.state.avatar} alt="avatar" />
            <p className="greet">{this.getGreetInfo()}</p>
          </div>

          <div className="palettes">{this.renderPalettes()}</div>
        </div>
      </div>
    );
  }
}
