import React, { Component } from "react";
import { Alert, Button } from "antd";

import str from "../resource/string";
import config from "../config";
import makeAlert from "../utils/makeAlert";

import { isAssistDownloaded } from "../utils/env";

import "../styles/Update.styl";

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latest: "Unknown",
      build: 233333,
      isForceUpdate: false,
      second: 5,
      status: 0,
      log: "",
    };
  }

  sleep(time = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  getRemoteVersion() {
    fetch("https://api-aliyun.kirainmoe.com:2333/tongfang/version")
      .then((res) => res.json())
      .then(async (res) => {
        this.setState({
          latest: res.version,
          build: res.build,
          isForceUpdate: res.forceUpdate >= config.build,
        });

        // message.info(str("discontinued"));

        if (res.build <= config.build) {
          if (!isAssistDownloaded() || !(await this.checkAssistUpdate()))
            this.downloadAssistPackage();
          if (window.location.href.includes("voiceover")) this.downloadVoiceOverPackage();
        }
      });
  }

  componentDidMount() {
    this.getRemoteVersion();
  }

  async cleanTongfangUserDir() {
    const userDir = localStorage.getItem("tfu-app-path");
    if (window.electron.isMac()) {
      window.electron.sudoExec(`rm -rf ${userDir}`, async () => {
        await makeAlert(str("appDirCleared"));
        window.close();
      });
    } else {
      window.electron.rmdir(userDir);
      await makeAlert(str("appDirCleared"));
      window.close();
    }
  }

  async checkAssistUpdate() {
    const fs = window.require("fs");
    const userDir = localStorage.getItem("tfu-app-path"),
      separator = window.electron.isWin() ? "\\" : "/",
      versionFile = `${userDir}${separator}version.json`;
    if (!fs.existsSync(versionFile)) return false;
    const version = fs.readFileSync(versionFile).toString();
    let remote = null;
    await fetch("https://cdn.jsdelivr.net/gh/kirainmoe/jsdelivr/version.json", {
      cache: "no-cache",
    })
      .then((res) => res.text())
      .then((res) => (remote = res));
    return remote === version;
  }

  async downloadVoiceOverPackage() {
    const path = window.require("path");
    const separator = window.electron.isWin() ? "\\" : "/",
      savePath = localStorage.getItem("tfu-app-path");

    try {
      window.electron.rmdir(`${savePath}${separator}Audio`);
    } catch (err) {}

    await this.setState({
      status: 6,
      log: this.state.log + "Downloading file Audio.zip ...\n",
    });
    const downloadUrl = "https://cdn.jsdelivr.net/gh/kirainmoe/jsdelivr-2/OCAudio.zip",
      saveFile = path.join(savePath, "Audio.zip");
    await window.electron.normalDownload(downloadUrl, saveFile);
    await this.sleep(500);
    await this.sleep(500);
    window.electron.unzip(saveFile, savePath);

    this.setState({ status: 7 });
  }

  async downloadAssistPackage() {
    const path = window.require("path"),
      fs = window.require("fs");
    const separator = window.electron.isWin() ? "\\" : "/",
      savePath = localStorage.getItem("tfu-app-path");

    try {
      window.electron.rmdir(`${savePath}${separator}itlwm.kext`);
      window.electron.rmdir(`${savePath}${separator}AirportItlwm-Catalina.kext`);
      window.electron.rmdir(`${savePath}${separator}AirportItlwm-BigSur.kext`);
      window.electron.rmdir(`${savePath}${separator}IntelBluetoothFirmware.kext`);
      window.electron.rmdir(`${savePath}${separator}IntelBluetoothInjector.kext`);
      fs.unlinkSync(`${savePath}${separator}version.json`);
    } catch (err) {}

    if (!fs.existsSync(savePath)) fs.mkdirSync(savePath);
    const filenames = [
      "itlwm.kext",
      "AirportItlwm-Catalina.kext",
      "AirportItlwm-BigSur.kext",
      "IntelBluetoothFirmware",
    ];

    for (let index = 0; index < filenames.length; index++) {
      const file = filenames[index];
      await this.setState({
        status: 4,
        log: this.state.log + "Downloading file " + file + " ...\n",
      });

      const downloadUrl = "https://cdn.jsdelivr.net/gh/kirainmoe/jsdelivr/" + file + ".zip",
        saveFile = path.join(savePath, file + ".zip");

      await window.electron.normalDownload(downloadUrl, saveFile);
      await this.sleep(500);
      window.electron.unzip(saveFile, savePath);
    }

    const downloadUrl = "https://cdn.jsdelivr.net/gh/kirainmoe/jsdelivr/version.json",
      saveFile = path.join(savePath, "version.json");
    try {
      fs.unlinkSync(saveFile);
    } catch(err) {}
    await window.electron.normalDownload(downloadUrl, saveFile);

    this.setState({ status: 5 });
  }

  showMessage() {
    if (this.state.status === 1) {
      return <Alert message={str("downloadRemoteVersion")} type="info" showIcon />;
    } else if (this.state.status === 2) {
      setTimeout(async () => {
        await makeAlert(str("updateSuccess"));
        window.close();
      }, 0);
      return <Alert message={str("updateSuccess")} type="success" showIcon />;
    } else if (this.state.status === 3) {
      return <Alert message={str("updateFailed")} type="error" showIcon />;
    } else if (this.state.status === 4) {
      return (
        <Alert
          message={
            <p style={{ margin: 0 }}>
              {str("downloadingAssistPackage")}
              <Button
                style={{ display: "inline" }}
                type={"link"}
                onClick={() => this.cleanTongfangUserDir()}
              >
                {str("cannotDownload")}
              </Button>
            </p>
          }
          type="info"
          showIcon
        />
      );
    } else if (this.state.status === 5) {
      return <Alert message={str("downloadDone")} type="success" showIcon />;
    } else if (this.state.status === 6) {
      return (
        <Alert
          message={
            <p style={{ margin: 0 }}>
              {str("downloadingVoiceOver")}
              <Button
                style={{ display: "inline" }}
                type={"link"}
                onClick={() => this.cleanTongfangUserDir()}
              >
                {str("cannotDownload")}
              </Button>
            </p>
          }
          type="info"
          showIcon
        />
      );
    } else if (this.state.status === 7) {
      return <Alert message={str("voiceOverDone")} type="success" showIcon />;
    } else if (this.state.latest === "Unknown")
      return <Alert message={str("fetchingLatest")} type="warning" showIcon />;
    else if (this.state.isForceUpdate) {
      const forceUpdate =
        `${str("youAreUsing")} Tongfang Hackintosh Utility v${config.version},` +
        `${str("officialLatest")} v${this.state.latest}.` +
        `${str("thisIsAForceUpdate")}`;

      return <Alert message={forceUpdate} type="error" showIcon />;
    } else if (this.state.build > config.build || window.location.href.indexOf("github") >= 0) {
      const requestUpdate = str("newVersionAvailable")
        .replace("$1", this.state.latest)
        .replace("$2", this.state.second);

      if (this.state.second === 5) {
        const nextSecond = () => {
          if (this.state.second <= 0) {
            this.updateApp();
            return;
          }
          this.setState({ second: this.state.second - 1 });
          setTimeout(() => nextSecond(), 1000);
        };
        setTimeout(() => nextSecond(), 1000);
      }

      return <Alert message={requestUpdate} type="warning" showIcon />;
    } else {
      return <Alert message={str("usingLatest")} type="success" showIcon />;
    }
  }

  updateApp() {
    this.setState({ status: 1 });

    const proc = (filename) => {
      this.setState({
        log: this.state.log + "Updating file " + filename + " ...\n",
      });
    };

    const success = () => {
      this.setState({
        log: this.state.log + "\nUpdate process done, no error occurred.",
        status: 2,
      });
    };

    const error = (err) => {
      this.setState({
        log: this.state.log + "\n" + err,
        status: 3,
      });
    };

    window.electron.selfUpdate(proc, "v" + this.state.latest, success, error);
  }

  render() {
    return (
      <div className="updater">
        <h3 className="page-title">{str("update")}</h3>

        <div className="version-info">
          <p className="current-version">
            {str("currentVersion")}: {config.version} (build {config.build})
          </p>

          <p className="latest-version">
            {str("latestVersion")}: {this.state.latest} (build {this.state.build})
          </p>
        </div>

        <div role="alert" aria-atomic="true">
          {this.showMessage()}
        </div>

        <pre className="update-log">{this.state.log}</pre>
      </div>
    );
  }
}
