import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";

import str from "../resource/string";

import "../styles/Setting.styl";

export default class Setting extends Component {
  onFinish = (values) => {
    message.success(str("settingApplied"));
    localStorage.setItem("tfu-download-path", values.downloadPath);
    localStorage.setItem("tfu-app-path", values.appPath);
  };

  onFinishFailed = () => {};

  onSelectDownloadPath = () => {
    const remote = window.require("electron").remote;
    remote.dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((res) => {
        const downloadPath = res.filePaths[0];
        this.formRef.setFieldsValue({
          downloadPath,
        });
      });
  };

  onSelectAppPath = () => {
    const remote = window.require("electron").remote;
    remote.dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((res) => {
        const appPath = res.filePaths[0];
        this.formRef.setFieldsValue({
          appPath,
        });
      });
  };

  restoreDownloadPath = () => {
    const userDir = window.electron.getUserDir(),
      separator = window.electron.isWin() ? "\\" : "/";
    this.formRef.setFieldsValue({
      downloadPath: `${userDir}${separator}Desktop`,
    });
  };

  restoreAppPath = () => {
    const userDir = window.electron.getUserDir(),
      separator = window.electron.isWin() ? "\\" : "/";
    this.formRef.setFieldsValue({
      appPath: `${userDir}${separator}.tfu`,
    });
  };

  render() {
    return (
      <div className="setting">
        <h3 className="page-title">{str("setting")}</h3>
        <div className="setting-container">
          <h3 className="setting-title">{str("pathSetting")}</h3>
          <p className="setting-description">{str("pathSettingDescription")}</p>
          <Form
            ref={(ref) => (this.formRef = ref)}
            name="tfu-setting"
            initialValues={{ downloadPath: localStorage.getItem("tfu-download-path"), appPath: localStorage.getItem("tfu-app-path") }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item label={str("efiDownloadPath")} name="downloadPath" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <p className="right-aligned">
              <small className="setting-tips">{str("defauleEFIDownloadPath")}</small>
              <Button type={"primary"} onClick={this.onSelectDownloadPath}>
                {str("selectPath")}
              </Button>
              <Button onClick={this.restoreDownloadPath} style={{ marginLeft: 10 }}>
                {str("restoreDefaultPath")}
              </Button>
            </p>

            <Form.Item label={str("appPath")} name="appPath" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <p className="right-aligned">
              <small style={{ marginBottom: 10 }} className="setting-tips">{str("defaultAppPath")}</small>
              <Button type={"primary"} onClick={this.onSelectAppPath}>
                {str("selectPath")}
              </Button>
              <Button onClick={this.restoreAppPath} style={{ marginLeft: 10 }}>
                {str("restoreDefaultPath")}
              </Button>
            </p>
            <Button shape={"round"} className="save-button" type="primary" htmlType="submit">
              {str("saveSetting")}
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
