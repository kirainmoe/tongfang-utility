import React, { Component } from "react";
import { Alert } from "antd";

import "../styles/Toolbox.styl";

import conf from "../config";
import str from "../resource/string";
import makeAlert from "../utils/makeAlert";
import { Sleep, HIDPI, KextCache } from "../icons/Toolbox";
import { Shortcut } from "../icons/Shortcut";
import WindowsIcon from "../icons/Windows";


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
      operation: "",
    };
  }

  async fixSleep() {
    await this.setState({
      status: "performing",
      operation: str("fixSleep"),
    });
    window.electron.sudoExec(
      'sh -c "$(curl -fsSL ' + conf.optimizeUrl + ')"',
      async (err, stdout) => {
        await this.setState({
          status: "success",
          operation: "...",
        });

        setTimeout(() => this.setState({ status: "idle" }), 5000);
      }
    );
  }

  async enableHiDPI() {
    await this.setState({
      status: "performing",
      operation: str("hiDPI"),
    });

    const fs = window.electron.fs();
    if (
      fs.existsSync("/Library/Displays/Contents/Resources/Overrides/backup")
    ) {
      await makeAlert(str("hiDPIEnabled"), true)
        .then(() => {
          window.electron.sudoExec(
            'echo 2 | sh -c "$(curl -fsSL ' + conf.HiDPIUrl + ')"',
            async (err, stdout) => {
              await this.setState({
                status: "success",
                operation: "...",
              });

              setTimeout(() => this.setState({ status: "idle" }), 5000);
            }
          );
        })
        .catch(() => {
          this.setState({ status: "idle" });
        });
      return;
    }

    await makeAlert(str("onlyForBOE0747"));

    window.electron.sudoExec(
      'echo 1 | sh -c "$(curl -fsSL ' + conf.HiDPIUrl + ')"',
      async (err, stdout) => {
        await this.setState({
          status: "success",
          operation: "...",
        });

        setTimeout(() => this.setState({ status: "idle" }), 5000);
      }
    );
  }

  rebuildKextCache() {
    this.setState(
      {
        status: "performing",
        operation: str("kextCache"),
      },
      () => {
        window.electron.sudoExec("kextcache -i /", (err, stdout) => {
          this.setState(
            {
              status: "success",
              operation: "...",
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
      const haveBin = window.electron.exec("ls /usr/local | grep bin");
      if (!haveBin) return str("state") + ":" + str("notInstalled");

      const ouput = window.electron.exec(
        "ls /Library/LaunchAgents | grep io.github"
      );
      if (ouput !== "") {
        return str("state") + ":" + str("installed");
      } else {
        return str("state") + ":" + str("notInstalled");
      }
    } catch (e) {
      return str("state") + ":" + str("notInstalled");
    }
  }

  installTongfangFnDaemon() {
    this.setState(
      {
        status: "performing",
        operation: str("installTongfangFnDaemon"),
      },
      () => {
        window.electron.sudoExec(
          'sh -c "$(curl -fsSL ' + conf.fnDaemonUrl + ')"',
          (err, stdout) => {
            this.setState(
              {
                status: "success",
                operation: "...",
              },
              () => setTimeout(() => this.setState({ status: "idle" }), 5000)
            );
          }
        );
      }
    );
  }

  openPage(url) {
    window.electron.openPage(url);
  }

  render() {
    const isMac = window.electron.isMac;
    const heliIcon = require("../resource/heliport.png");
    if (!isMac()) return <ToolboxOnWin />;
    else
      return (
        <div className="toolbox">
          <h3 className="page-title">{str("tools")}</h3>
          <p className="tools-description">{str("toolsDescription")}</p>

          <div
            className="indicator"
            style={
              this.state.status !== "performing" ? { display: "none" } : null
            }
          >
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
            style={
              this.state.status !== "performing" ? { display: "none" } : null
            }
          />

          <div className="toolbox-actions">
            <div
              className="action-block"
              id="sleep"
              onClick={() => this.fixSleep()}
            >
              <div className="action-icon">
                <Sleep />
              </div>
              <div className="action-label">
                <h3>{str("fixSleep")}</h3>
                <p>{str("fixSleepDescription")}</p>
              </div>
            </div>

            <div
              className="action-block"
              id="hidpi"
              onClick={() => this.enableHiDPI()}
            >
              <div className="action-icon">
                <HIDPI />
              </div>
              <div className="action-label">
                <h3>{str("hiDPI")}</h3>
                <p>{str("hiDPIDescription")}</p>
              </div>
            </div>

            <div
              className="action-block"
              id="kextcache"
              onClick={() => this.rebuildKextCache()}
            >
              <div className="action-icon">
                <KextCache />
              </div>
              <div className="action-label">
                <h3>{str("kextCache")}</h3>
                <p>{str("kextCacheDescription")}</p>
              </div>
            </div>

            <div
              className="action-block"
              id="kextcache"
              onClick={() => this.installTongfangFnDaemon()}
            >
              <div className="action-icon">
                <Shortcut />
              </div>
              <div className="action-label">
                <h3>{str("installTongfangFnDaemon")}</h3>
                <p style={{ margin: 0 }}>
                  {str("installTongfangFnDaemonDescription")}(
                  {this.getFnDaemonState()})
                </p>
                <p style={{ margin: 5, color: "#888" }}>(Credit: @Goshin)</p>
              </div>
            </div>

            <div
              className="action-block"
              id="kextcache"
              onClick={() =>
                this.openPage(
                  "https://github.com/OpenIntelWireless/HeliPort/releases"
                )
              }
            >
              <div className="action-icon">
                <img alt={str("downloadHeliport")} width={"120px"} style={{ marginTop: -15 }} src={heliIcon} />
              </div>
              <div className="action-label">
                <h3>{str("downloadHeliport")}</h3>
                <p>{str("downloadHeliportDescription")}</p>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
