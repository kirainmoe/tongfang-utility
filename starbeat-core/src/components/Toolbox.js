import React, { Component } from "react";
import { Alert, Spin, Icon } from "antd";

import "../styles/Toolbox.styl";

import conf from "../config";
import str from "../resource/string";
import { Sleep, HIDPI, KextCache } from "../icons/Toolbox";
import { Shortcut } from "../icons/Shortcut";
import WindowsIcon from '../icons/Windows';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class ToolboxOnWin extends Component {
  render() {
    return (
      <div className="toolbox">
        <h3 className="page-title">{str("cannotRunningOnWindows")}</h3>
        <div className="toobox-win-unsupported">
          <div className="win-icon">
            <WindowsIcon />
          </div>
          <p>{str("ToolboxCannotRunningOnWinDescription")}</p>
        </div>
      </div>
    );
  }
}

export default class Toolbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "idle",
      operation: ""
    };
  }

  fixSleep() {
    this.setState(
      {
        status: "performing",
        operation: str("fixSleep")
      },
      () => {
        window.electron.sudoExec(
          'sh -c "$(curl -fsSL ' + conf.optimizeUrl + ')"',
          (err, stdout) => {
            this.setState(
              {
                status: "success",
                operation: "..."
              },
              () => {
                setTimeout(() => this.setState({ status: "idle" }), 5000);
              }
            );
          }
        );
      }
    );
  }

  enableHiDPI() {
    this.setState(
      {
        status: "performing",
        operation: str("hiDPI")
      },
      () => {
        alert(str('onlyForBOE0747'));
        window.electron.sudoExec(
          'sh -c "$(curl -fsSL ' + conf.HiDPIUrl + ')"',
          (err, stdout) => {
            this.setState(
              {
                status: "success",
                operation: "..."
              },
              () => {
                setTimeout(() => this.setState({ status: "idle" }), 5000);
              }
            );
          }
        );
      }
    );
  }

  rebuildKextCache() {
    this.setState(
      {
        status: "performing",
        operation: str("kextCache")
      },
      () => {
        window.electron.sudoExec("kextcache -i /", (err, stdout) => {
          this.setState(
            {
              status: "success",
              operation: "..."
            },
            () => {
              setTimeout(() => this.setState({ status: "idle" }), 5000);
            }
          );
        });
      }
    );
  }

  getFnDaemonState() {
    try {
      const haveBin = window.electron.exec('ls /usr/local | grep bin');
      if (!haveBin)
        return str('state') + ":" + str('notInstalled');
        
      const ouput = window.electron.exec('ls /usr/local/bin | grep Tongfang');
      if (ouput !== '') {
        return str('state') + ":" + str('installed');
      } else {
        return str('state') + ":" + str('notInstalled');
      }
    } catch (e) {
      return str('state') + ":" + str('notInstalled');
    }
  }

  installTongfangFnDaemon() {
    this.setState(
      {
        status: "performing",
        operation: str("installTongfangFnDaemon")
      },
      () => {
        window.electron.sudoExec(
          'sh -c "$(curl -fsSL ' + conf.fnDaemonUrl + ')"',
          (err, stdout) => {
            this.setState(
              {
                status: "success",
                operation: "..."
              },
              () => {
                setTimeout(() => this.setState({ status: "idle" }), 5000);
              }
            );
          }
        );
      }
    );        
  }

  render() {
    const isMac = window.electron.isMac;
    if (!isMac())
      return <ToolboxOnWin />
    else 
    return (
      <div className="toolbox">
        <h3 className="page-title">{str("tools")}</h3>
        <p className="tools-description">{str("toolsDescription")}</p>

        <div
          className="indicator"
          style={this.state.status !== "performing" ? { display: "none" } : null}
        >
          <Spin indicator={antIcon} />
        </div>

        <Alert
          message={str("success")}
          description={str("successDescription")}
          type="success"
          showIcon
          style={this.state.status !== "success" ? { display: "none" } : null}
        />

        <Alert
          message={this.state.operation}
          description={str("pleaseWait")}
          type="info"
          showIcon
          style={this.state.status !== "performing" ? { display: "none" } : null}
        />

        <div className="toolbox-actions">
          <div className="action-block" id="sleep" onClick={() => this.fixSleep()}>
            <div className="action-icon">
              <Sleep />
            </div>
            <div className="action-label">
              <h3>{str("fixSleep")}</h3>
              <p>{str("fixSleepDescription")}</p>
            </div>
          </div>

          <div className="action-block" id="hidpi" onClick={() => this.enableHiDPI()}>
            <div className="action-icon">
              <HIDPI />
            </div>
            <div className="action-label">
              <h3>{str("hiDPI")}</h3>
              <p>{str("hiDPIDescription")}</p>
            </div>
          </div>

          <div className="action-block" id="kextcache" onClick={() => this.rebuildKextCache()}>
            <div className="action-icon">
              <KextCache />
            </div>
            <div className="action-label">
              <h3>{str("kextCache")}</h3>
              <p>{str("kextCacheDescription")}</p>
            </div>
          </div>

          <div className="action-block" id="kextcache" onClick={() => this.installTongfangFnDaemon()}>
            <div className="action-icon">
              <Shortcut />
            </div>
            <div className="action-label">
              <h3>{str("installTongfangFnDaemon")}</h3>
              <p>
                {str("installTongfangFnDaemonDescription")}
                ({this.getFnDaemonState()})
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
