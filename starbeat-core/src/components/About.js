import React, { Component } from "react";

import str from "../resource/string";

import "../styles/About.styl";
import config from "../config";

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: "?"
        };
        this.checkVersion();
    }

    checkVersion() {
        fetch('https://api.kirainmoe.com/starbeatVersion')
            .then(res => res.json())
            .then(res => {
                this.setState({ version: res.version });
            });
    }

    openPage(url) {
        window.electron.openPage(url);
    }

    render() {
        return (
            <div className="about">
                <h3 className="page-title">{str("about")}</h3>
                <div className="description">
                    <p>
                        Tongfang Hackintosh Utility (前身 Project: STAR BEAT!) 是一个跨平台的 App。
                        <br />
                        主要作用是方便使用清华同方模具的神舟（或其它品牌）笔记本用户安装 macOS.
                    </p>

                    <p className="version">
                        当前版本：{config.version}
                        <a className="latest-version" href="#" onClick={() => this.openPage("https://starbeat.kirainmoe.com")} >官方最新版本：{this.state.version}</a>
                    </p>

                    <p className="update-warning">
                        提示：某些时候 App 可能强制要求你升级来防止与新版配置文件出现兼容问题。
                    </p>

                    <div className="bugreport-feature">
                        <h3 className="subtitle">Feature Request & Bug Report</h3>
                        <div>
                            <p>
                                如果你在使用过程中遇到 BUG，或者想要什么功能，可以在
                                <a
                                    onClick={() =>
                                        this.openPage(
                                            "https://github.com/kirainmoe/tongfang-hackintosh-utility/issues/new"
                                        )
                                    }
                                    href="#"
                                >
                                    此页面
                                </a>
                                中告诉我。
                            </p>
                        </div>
                    </div>

                    <div className="donate">
                        <h3 className="subtitle">恰饭</h3>
                        <div>
                            <p>
                                本工具和仓库提供的配置文件都是免费的。
                                <br /> 但你可以扫一扫二维码，支持主播_(:з」∠)_
                            </p>
                            <table>
                                <thead>
                                    <tr>
                                        <td>支付宝</td>
                                        <td>微信</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://i.loli.net/2019/09/19/j8doaIVYWtMXlNJ.png"
                                                width="160px"
                                                alt="alipay"
                                            />
                                        </td>
                                        <td>
                                            <img
                                                src="https://i.loli.net/2019/09/19/xkoHIsuZLvtzDSP.png"
                                                width="160px"
                                                alt="wechat"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p
                        align="center"
                        className="copyright"
                        style={{
                            marginTop: 20
                        }}
                    >
                        &copy;2020 Yume Maruyama, All rights reserved.
                    </p>
                </div>
            </div>
        );
    }
}
