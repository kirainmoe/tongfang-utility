import React, { Component } from "react";
import { Alert } from 'antd';

import str from "../resource/string";
import config from "../config";

import '../styles/Update.styl';

export default class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latest: 'Unknown',
      build: 233333,
      isForceUpdate: false,
      second: 5,
      status: 0,
      log: ''
    };
  }

  sleep(time = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    })
  };

  getRemoteVersion() {
    fetch('https://api-aliyun.kirainmoe.com:2333/tongfang/version')
    .then(res => res.json())
    .then(res => {
      this.setState({
        latest: res.version,
        build: res.build,
        isForceUpdate: res.forceUpdate >= config.build
      });

      if (res.build <= config.build && !this.isAssistDownloaded())
        this.downloadAssistPackage();
    });
  }

  componentDidMount() {
    this.getRemoteVersion();
  }

  isAssistDownloaded() {
    const fs = window.electron.fs();
    const userDir = window.electron.getUserDir();

    if (fs.existsSync(`${userDir}/.tfu/itlwm.kext`)
      && fs.existsSync(`${userDir}/.tfu/itlwmx.kext`)
      && fs.existsSync(`${userDir}/.tfu/IntelBluetoothFirmware.kext`)) {
        return true;
    }
    return false;
  }

  async downloadAssistPackage() {
    const path = window.require("path"),
      fs = window.require("fs");
    const userDir = window.electron.getUserDir(),
      savePath = path.join(userDir, ".tfu");

    if (!fs.existsSync(savePath))
      fs.mkdirSync(savePath);      
    const filenames = ["itlwm.kext", "itlwmx.kext", "IntelBluetoothFirmware"];

    for (let index = 0; index < filenames.length; index++) {
      const file = filenames[index];
      await this.setState({
        status: 4,
        log: this.state.log + 'Downloading file ' + file + ' ...\n'      
      });

      const downloadUrl = "https://cdn.jsdelivr.net/gh/kirainmoe/jsdelivr/" + file + '.zip',
        saveFile = path.join(savePath, file + '.zip');
      
      await window.electron.normalDownload(downloadUrl, saveFile);
      await this.sleep(500);
      window.electron.unzip(saveFile, savePath);
    }

    this.setState({ status: 5 });
  }

  showMessage() {
    if (this.state.status === 1) {
      return (
        <Alert message={str('downloadRemoteVersion')} type="info" showIcon />
      );
    }
    else if (this.state.status === 2) {
      setTimeout(() => {
        alert(str('updateSuccess'));
        window.close();
      }, 0);
      return (
        <Alert message={str('updateSuccess')} type="success" showIcon />
      );
    }
    else if (this.state.status === 3) {
      return (
        <Alert message={str('updateFailed')} type="error" showIcon />
      );
    }
    else if (this.state.status === 4) {
      return (
        <Alert message={str('downloadingAssistPackage')} type="info" showIcon />
      );
    }
    else if (this.state.status === 5) {
      return <Alert message={str('downloadDone')} type="success" showIcon />;
    }
    else if (this.state.latest === 'Unknown')
      return (
        <Alert message={str('fetchingLatest')} type="warning" showIcon />
      );
    else if (this.state.isForceUpdate) {
      const forceUpdate = `${str('youAreUsing')} Tongfang Hackintosh Utility v${config.version},`
        + `${str('officialLatest')} v${this.state.latest}.`
        + `${str('thisIsAForceUpdate')}`;

      return (
        <Alert message={forceUpdate} type="error" showIcon />
      );
    }
    else if (this.state.build > config.build || window.location.href.indexOf('github') >= 0) {
      const requestUpdate = str('newVersionAvailable')
        .replace('$1', this.state.latest)
        .replace('$2', this.state.second);

      if (this.state.second === 5) {
        const nextSecond = () => {
          if (this.state.second <= 0) {
            this.updateApp();
            return;
          }
          this.setState({ second: this.state.second - 1 });
          setTimeout(() => nextSecond(), 1000);
        }
        setTimeout(() => nextSecond(), 1000);
      }

      return (
       <Alert message={requestUpdate} type="warning" showIcon />
      )
    }
    else {
      return <Alert message={str('usingLatest')} type="success" showIcon />;
    }
  }

  updateApp() {
    this.setState({ status: 1 });

    const proc = (filename) => {
      this.setState({
        log: this.state.log + 'Updating file ' + filename + ' ...\n'
      });
    }

    const success = () => {
      this.setState({
        log: this.state.log + '\nUpdate process done, no error occurred.',
        status: 2
      });
    }

    const error = (err) => {
      this.setState({
        log: this.state.log + '\n' + err,
        status: 3
      });
    };

    window.electron.selfUpdate(proc, 'v' + this.state.latest, success, error);
  }

  render() {
    return (
      <div className="updater">
        <h3 className="page-title">
          {str("update")}
        </h3>

        <div className="version-info">
          <p className="current-version">
            {str('currentVersion')}: {config.version} (build {config.build})
          </p>

          <p className="latest-version">
            {str('latestVersion')}: {this.state.latest} (build {this.state.build})
          </p>
        </div>

        {this.showMessage()}

        <pre className="update-log">
          {this.state.log}
        </pre>

      </div>
    )
  }
}