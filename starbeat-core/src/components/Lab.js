import React, { Component } from "react";

import str from "../resource/string";

import "../styles/Lab.styl";

export default class Lab extends Component {
    openPage(url) {
        window.electron.openPage(url);
    }

    render() {
        return (
            <div className="lab">
                <h3 className="page-title">{str("lab")} (WIP)</h3>
                <div className="description">
                    <p>
                        嘘！这里本来应该是一个实验室！
                        <br />
                        但是它的主人太懒了，以至于连一个功能都懒得写……
                        <br />
                        但是啥都没有不太好，所以只好放几段文字在这里凑数 _(:з」∠)_ <br />
                    </p>

                    <div className="bugreport-feature">
                        <h3 className="subtitle">Feature Request & Bug Report</h3>
                        <div>
                            <p>如果你在使用过程中遇到
                            BUG，或者想要什么功能，那么在下面的页面中告诉我吧：</p>
                            <p><a
                                onClick={() =>
                                    this.openPage(
                                        "https://github.com/kirainmoe/tongfang-hackintosh-utility/issues/new"
                                    )
                                }
                                href="#"
                            >
                                打开页面
                            </a></p>
                        </div>
                    </div>

                    <div className="donate">
                        <h3 className="subtitle">恰饭</h3>
                        <div>
                            <p>本工具和仓库提供的配置文件都是免费的。<br/> 但你可以扫一扫二维码，支持主播_(:з」∠)_</p>
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
                                            <img src="https://i.loli.net/2019/09/19/j8doaIVYWtMXlNJ.png" width="160px" alt="alipay" /> 
                                        </td>
                                        <td>
                                            <img src="https://i.loli.net/2019/09/19/xkoHIsuZLvtzDSP.png" width="160px" alt="wechat" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <p align="center" className="copyright">&copy;2020 Yume Maruyama, All rights reserved.</p>
                </div>
            </div>
        );
    }
}
