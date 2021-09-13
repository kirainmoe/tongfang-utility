import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import "./styles/app.styl";

import Navigator from "./components/Navigator";
import KeyboardLight from "./components/KeyboardLight";
import Toolbox from "./components/Toolbox";
import Lab from "./components/Lab";
import Dashboard from "./components/Dashboard";
import ConfigureGuidance from "./components/ConfigureGuidance";
import Update from "./components/Update";
import About from "./components/About";
import CompatCheck from "./components/CompatCheck";
import Setting from "./components/Setting";
import TopButton from "./components/TopButton";
import ErrorBoundary from "./components/ErrorBoundary";

try {
  const fs = window.electron.fs();
  const userDir = window.electron.getUserDir();
  const initLocalStorage = () => {
    if (localStorage.getItem("tfu-download-path") === null) {
      let downloadPath = `${userDir}/Desktop`;
      if (window.electron.isWin()) downloadPath = downloadPath.replace(/\//g, "\\");
      localStorage.setItem("tfu-download-path", downloadPath);
    }
    if (localStorage.getItem("tfu-app-path") === null) {
      let appPath = `${userDir}/.tfu`;
      if (window.electron.isWin()) appPath = appPath.replace(/\//g, "\\");
      localStorage.setItem("tfu-app-path", appPath);
    }
  };

  initLocalStorage();
  if (!fs.existsSync(localStorage.getItem("tfu-app-path"))) {
    fs.mkdirSync(localStorage.getItem("tfu-app-path"));
  }

  render(
    <div className="starbeat-app">
      <ErrorBoundary>
        <HashRouter history={createBrowserHistory()}>
          <TopButton />
          <Navigator />

          <div className="page">
            <Route path="/" exact>
              <Redirect to={window.electron.isMac() ? "/dashboard" : "/keyboard"} />
            </Route>
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/keyboard" exact>
              <KeyboardLight />
            </Route>
            <Route path="/config" exact>
              <ConfigureGuidance />
            </Route>
            <Route path="/tools" exact>
              <Toolbox />
            </Route>
            <Route path="/lab" exact>
              <Lab />
            </Route>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/setting" exact>
              <Setting />
            </Route>
            <Route path="/compatCheck" exact>
              <CompatCheck />
            </Route>
            <Route path="/update" exact>
              <Update />
            </Route>
          </div>
        </HashRouter>
      </ErrorBoundary>
    </div>,
    document.getElementById("root")
  );
} catch (err) {
  render(
    <ErrorBoundary error={err} />,
    document.getElementById("root")
  );
}
