import React, { Component } from "react";
import { Button } from "antd";

import str from "../resource/string";

import "../styles/About.styl";
import config from "../config";

export default class About extends Component {
  issuePage = "https://github.com/kirainmoe/tongfang-hackintosh-utility/issues/new";

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
          </p>

          <p className="update-warning">
            提示：某些时候 App 可能强制要求你升级来防止与新版配置文件出现兼容问题。
          </p>

          <div className="bugreport-feature">
            <h3 className="subtitle">Feature Request & Bug Report</h3>
            <div>
              <p>
                如果你在使用过程中遇到 BUG，或者想要什么功能，可以在
                <Button type="link" onClick={() => this.openPage(this.issuePage)} style={{ padding: 0 }}>
                  此页面
                </Button>
                中告诉我，或者发送邮件给 kirainmoe@gmail.com .
              </p>
            </div>
          </div>

          <div className="donate">
            <h3 className="subtitle">获取帮助 and 恰饭</h3>
            <div>
              <p>
                本工具和仓库提供的配置文件都是免费的。如果你需要获得帮助，请加入下面的 QQ 群。
                <br /> 你也可以扫一扫二维码，支持开发者_(:з」∠)_
              </p>
              <table>
                <thead>
                  <tr>
                    <td>支付宝</td>
                    <td>微信</td>
                    <td>QQ 群</td>
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
                    <td>
                      <img
                        src="https://i.loli.net/2019/11/23/Fzkeprn9PA7bf6q.png"
                        width="110px"
                        alt="qqgroup"
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
            &copy;2020 Ami Technology, All rights reserved.
          </p>
        </div>
      </div>
    );
  }
}
