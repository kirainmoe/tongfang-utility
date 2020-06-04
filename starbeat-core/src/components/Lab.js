import React, { Component } from "react";
import { Tabs, Form, Input, Button, message } from "antd";
import str from "../resource/string";
import config from "../config";
import Plist from '../utils/plist';
import "../styles/Lab.styl";

const { TabPane } = Tabs;

export default class Lab extends Component
{
    constructor(props) {
        super(props);

        const fs = window.electron.fs();
        const userDir =  window.electron.getUserDir();

        let preset = {
            'ssid-1': {
                ssid: undefined,
                password: undefined
            },
            'ssid-2': {
                ssid: undefined,
                password: undefined
            },
            'ssid-3': {
                ssid: undefined,
                password: undefined
            },
            'ssid-4': {
                ssid: undefined,
                password: undefined
            }                                    
        };

        if (fs.existsSync(`${userDir}/.tfu/wifi.json`)) {
            const json = window.electron.readFile(`${userDir}/.tfu/wifi.json`);
            preset = JSON.parse(json);
        }

        this.state = {
            downloaded: false,
            downloading: false,
            loaded: false,
            preset
        }
    }


    componentDidMount() {
        const fs = window.electron.fs();
        const userDir =  window.electron.getUserDir();

        if (!fs.existsSync(`${userDir}/.tfu`)) {
            fs.mkdirSync(`${userDir}/.tfu`);
            return;
        }

        let nextState = {
            downloaded: false,
            loaded: false,
        };

        if (fs.existsSync(`${userDir}/.tfu/itlwm.kext`)) {
            nextState.downloaded = true;
            nextState.loaded = this.checkLoaded();
        }

        this.setState(nextState);
    }

    checkLoaded() {
        try {
            const proc = window.require('child_process');
            const stdout = proc.execSync(`kextstat | grep itlwm`).toString();
            if (stdout !== '')
                return true;
        } catch (err) {
            return false;
        }
    }

    saveConfig(value) {
        const userDir =  window.electron.getUserDir(); 
        window.electron.writeFile(userDir + "/.tfu/wifi.json", JSON.stringify(value));
    }

    onFinish(value) {
        if (!this.state.downloaded) {
            message.error(str('notDownloaded'));
            return;
        }
        const userDir =  window.electron.getUserDir(); 
        const kextPath = userDir + "/.tfu/itlwm.kext/";
        const content = window.electron.readFile(userDir + "/.tfu/itlwm.kext/Contents/Info.plist");
        const plist = new Plist(content);

        for (let i = 1; i <= 4; i++) {
            const item = value["ssid-" + String(i)];
            if (item.ssid !== undefined && item.password !== undefined) {
                plist.setValue(`IOKitPersonalities/itlwm/WiFiConfig/WiFi_${String(i)}/ssid`, item.ssid);
                plist.setValue(`IOKitPersonalities/itlwm/WiFiConfig/WiFi_${String(i)}/password`, item.password);
            }
        }

        
        window.electron.sudoExec(`chmod -R 777 ${kextPath}`, (err, stdout) => {
            if (err) {
                message.error(str("unsuccess"));
                return;
            }
            window.electron.writeFile(userDir + "/.tfu/itlwm.kext/Contents/Info.plist", plist.buildPlist());
            window.electron.sudoExec(
                `chmod -R 755 ${kextPath} && chown -R root:wheel ${kextPath} && kextutil -v 6 ${kextPath}`,
                (err, stdout) => {
                    if (err) {
                        message.error(str("unsuccess"));
                        return;
                    }
                    this.setState({ loaded: true });
                    message.success(str('loadSuccess'));
                }
            )
        });

        this.saveConfig(value);
    }

    downloadItlwm() {
        const userDir =  window.electron.getUserDir();
        const savePath = `${userDir}/.tfu`;
        const saveFile = savePath + "/itlwm.zip";
        message.info(str('downloadWait') + '...');
        this.setState({
            downloading: true
        });

        window.electron.downloadFile(config.itlwmUrl, saveFile, () => {
            window.electron.unzip(saveFile, savePath);
            message.success(str('successAndRefersh'));
            this.setState({ downloading: false, downloaded: true });
        }, (p, s) => null);
    }

    unloadItlwm() {
        if (!this.state.loaded) {
            message.warn("itlwm.kext" + str("unloaded"));
            return;
        }
        window.electron.sudoExec('kextunload -b com.zxystd.itlwm', (err, stdout) => {
            message.success("itlwm.kext " + str("unloadSuccess"));
            this.setState({ loaded: false });
        });
    }

    render() {
        return (
            <div className="lab">
                <h3 className="page-title">
                    {str("lab")}
                </h3>
                <p className="remind">
                    {str('labRemind')}
                </p>
                <Tabs defaultActiveKey="1">
                <TabPane tab={str('intelWifi')} key="1">
                    <p className="remind">{str('intelWifiDescription')}</p>
                    <p className="remind">{str('intelWifiRemind')}</p>
                    <div>
                        {str('downloadStatus')}：
                        {this.state.downloading ? str('downloadWait') + '...' : this.state.downloaded ? str('downloaded') : str('undownloaded') + '，'}
                        {!this.state.downloading && !this.state.downloaded && (
                            <Button
                                style={{ padding: 0 }}
                                onClick={() => this.downloadItlwm()}
                                type="link" >{str('clickToDownload')}
                            </Button>
                        )} /  {str('loadStatus')}：{this.state.loaded ? str('loaded') : str('unloaded')}
                    </div>
                    <div>
                        <Form name="itlwm" onFinish={v => this.onFinish(v)} initialValues={this.state.preset}>
                            <Form.Item noStyle>
                                <Input.Group compact>
                                    <Form.Item name={['ssid-1', 'ssid']}>
                                        <Input
                                            placeholder="SSID (网络名称)" />
                                    </Form.Item>
                                    <Form.Item name={['ssid-1', 'password']}>
                                        <Input.Password
                                            placeholder="Password (密码)" />
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                            <Form.Item noStyle>
                                <Input.Group compact>
                                <Form.Item name={['ssid-2', 'ssid']}>
                                        <Input
                                            placeholder="SSID (网络名称)" />
                                    </Form.Item>
                                    <Form.Item name={['ssid-2', 'password']}>
                                        <Input.Password
                                            placeholder="Password (密码)" />
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                            <Form.Item noStyle>
                                <Input.Group compact>
                                    <Form.Item name={['ssid-3', 'ssid']}>
                                            <Input
                                                placeholder="SSID (网络名称)" />
                                        </Form.Item>
                                        <Form.Item name={['ssid-3', 'password']}>
                                            <Input.Password
                                                placeholder="Password (密码)" />
                                        </Form.Item>
                                </Input.Group>
                            </Form.Item>
                            <Form.Item noStyle>
                                <Input.Group compact>
                                <Form.Item name={['ssid-4', 'ssid']}>
                                        <Input
                                            placeholder="SSID (网络名称)" />
                                    </Form.Item>
                                    <Form.Item name={['ssid-4', 'password']}>
                                        <Input.Password
                                            placeholder="Password (密码)" />
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>

                            <Form.Item className="load-itlwm">
                                <Button type="primary" htmlType="submit">
                                    {str('loadKext')}
                                </Button>
                                <Button onClick={() => this.unloadItlwm()}>
                                    {str('unloadKext')}
                                </Button>                                
                            </Form.Item>
                        </Form>                        
                    </div>
                </TabPane>
                </Tabs>
            </div>
        );
    }
}