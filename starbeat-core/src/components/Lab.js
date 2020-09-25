import React, { Component } from "react";
import { Tabs} from "antd";
import str from "../resource/string";
import "../styles/Lab.styl";

const { TabPane } = Tabs;

export default class Lab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            downloaded: false,
            downloading: false,
            loaded: false,
            useheliport: true,
        };
    }

    openPage(url) {
        window.electron.openPage(url);
    }

    render() {
        const heliIcon = require("../resource/heliport.png");

        return (
            <div className="lab">
                <h3 className="page-title">{str("lab")}</h3>
                <p className="remind">{str("labRemind")}</p>
                <Tabs defaultActiveKey="1">
                        <TabPane tab={str("intelWifi")} key="1">
                            <p className="useheliport">{str("useHeliport")}</p>
                            <p className="get-or-continue">{str("downloadHeliport")}</p>
                            <p className="continue">{str("continueUse")}</p>
                            <div className="download-heliport">
                                <div
                                    className="heliport-icon"
                                    style={{
                                        background: `url(${heliIcon}) center / cover`,
                                    }}
                                    onClick={() =>
                                        this.openPage(
                                            "http://cdn.jsdelivr.net/gh/kirainmoe/jsdelivr/HeliPort.app.zip"
                                        )
                                    }
                                ></div>
                            </div>
                        </TabPane>
                </Tabs>
            </div>
        );
    }
}
