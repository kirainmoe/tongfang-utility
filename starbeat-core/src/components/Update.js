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

  getRemoteVersion() {
    fetch('https://api.kirainmoe.com/starbeatVersion')
    .then(res => res.json())
    .then(res => {
      this.setState({
        latest: res.version,
        build: res.build,
        isForceUpdate: res.forceUpdate >= config.build
      });
    });
  }

  componentDidMount() {
    this.getRemoteVersion();
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

    window.electron.selfUpdate(proc, success, error);
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