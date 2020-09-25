import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { Popover } from "antd";

import "../styles/Navigator.styl";

import str from "../resource/string";
import conf from "../config";

import Dashboard from "../icons/Dashboard";
import Keyboard from "../icons/Keyboard";
import ConfigUpdate from "../icons/ConfigUpdate";
import Tools from "../icons/Tools";
import Update from "../icons/Update";
import CompatCheck from "../icons/CompatCheck";
import Lab from "../icons/Lab";

const logo = require("../resource/logo.png");

class Navigator extends Component {
  pageIndex = {
    dashboard: [0, 0],
    keyboard: [1, 0],
    config: [2, 1],
    tools: [3, -10],
    compatCheck: [-10, 2],
    lab: [4, -10],
    update: [5, 3],
    about: [-10, -10],
  };

  calcDist(path) {
    for (const key in this.pageIndex) {
      if (path.includes(key)) return 65 * this.pageIndex[key][Number(!window.electron.isMac())];
    }
    return 0;
  }

  constructor(props) {
    super(props);

    const presetTheme = localStorage.getItem("theme");

    this.state = {
      topDist: 100 + this.calcDist(props.location.pathname),
      theme: presetTheme ? presetTheme : 'default'
    };
  }

  switchTo(name) {
    const index = this.pageIndex[name] ? this.pageIndex[name][Number(!window.electron.isMac())] : -10;
    this.setState({
      topDist: 100 + index * 65,
    });
  }

  render() {
    return (
      <div className={`navigator ${this.state.theme}`}>
        <div className="logo">
          <img src={logo} alt={str("logo")} />
        </div>

        {window.electron.isMac() && (
          <Popover content={str("dashboard")} placement="right">
            <NavLink
              onClick={() => this.switchTo("dashboard")}
              className="nav-link"
              to="/dashboard"
              aria-label={str("dashboard")}
            >
              <Dashboard />
            </NavLink>
          </Popover>
        )}

        <Popover content={str("keyboardLight")} placement="right">
          <NavLink
            onClick={() => this.switchTo("keyboard")}
            className="nav-link"
            to="/keyboard"
            aria-label={str("keyboardLight")}
          >
            <Keyboard />
          </NavLink>
        </Popover>

        <Popover content={str("config")} placement="right">
          <NavLink
            onClick={() => this.switchTo("config")}
            className="nav-link config-update"
            to="/config"
            aria-label={str("config")}
          >
            <ConfigUpdate />
          </NavLink>
        </Popover>

        {window.electron.isMac() && (
          <Popover content={str("tools")} placement="right">
            <NavLink
              onClick={() => this.switchTo("tools")}
              className="nav-link"
              to="/tools"
              aria-label={str("tools")}
            >
              <Tools />
            </NavLink>
          </Popover>
        )}

        {window.electron.isMac() && (
          <Popover content={str("lab")} placement="right">
            <NavLink
              onClick={() => this.switchTo("lab")}
              className="nav-link"
              to="/lab"
              aria-label={str("lab")}
            >
              <Lab />
            </NavLink>
          </Popover>
        )}

        {navigator.language === "zh-CN" && window.electron.isWin() && (
          <Popover content={str("compatCheck")} placement="right">
            <NavLink
              onClick={() => this.switchTo("compatCheck")}
              className="nav-link"
              to="/compatCheck"
              aria-label={str("compatCheck")}
            >
              <CompatCheck />
            </NavLink>
          </Popover>
        )}

        <Popover content={str("update")} placement="right">
          <NavLink
            onClick={() => this.switchTo("update")}
            className="nav-link"
            to="/update"
            aria-label={str("update")}
          >
            <Update />
          </NavLink>
        </Popover>

        <div
          className={"active-mask"}
          style={{
            top: this.state.topDist,
          }}
        ></div>

        <div className="starbeat-version">
          {navigator.language === "zh-CN" ? (
            <Link onClick={() => this.switchTo("about")} to="/about">
              <p>app v{conf.version}</p>
            </Link>
          ) : (
            <p>app v{conf.version}</p>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Navigator);
