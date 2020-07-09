import React, { Component } from "react";

import str from "../resource/string";
import "../styles/KeyboardLight.styl";

import { Palette, Breathing, Wave, Rainbow, Flash, Mix } from "../icons/KeyboardStyle";
import { Slider, Switch } from "antd";
import Chipset from "../icons/Chipset";

class NoCompatibleDevice extends Component {
    render() {
        return (
            <div className="keyboard-light">
                <h3 className="page-title">{str("hidCommFailed")}</h3>
                <div className="keyboard-hid-failed">
                    <div className="hid-icon">
                        <Chipset />
                    </div>
                    <p>{str("hidCommFailedReason")}</p>
                    <ul>
                        <li>{str("hidCommFailedNotFound")}</li>
                        <li>{str("hidCommFailedRevisionNotMatch")}</li>
                        <li>{str("hidCommFailedLinuxUnauthorized")}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default class KeyboardLight extends Component {
    utils = null;

    brightness = [0x00, 0x08, 0x16, 0x24, 0x32];
    speeds = [0x0a, 0x07, 0x05, 0x03, 0x01];

    constructor(props) {
        super(props);

        if (typeof window.initColorUtils === "function") {
            window.initColorUtils = window.initColorUtils();
        }
        this.utils = window.initColorUtils;

        this.state = {
            brightness: 80,
            speed: 50,
            mode: 0,
            direction: 1,
            colors: [
                [0xff, 0x7a, 0x79],
                [0xff, 0x7a, 0x79],
                [0xff, 0x7a, 0x79],
                [0xff, 0x7a, 0x79],
            ],
        };
    }

    toggleKeyboardLight(checked) {
        if (!checked) this.utils.disabler();
        else this.applySetting();
    }

    applySetting() {
        const speed = this.speeds[Math.max(0, Math.ceil(this.state.speed / 20) - 1)],
            brightness = this.brightness[Math.max(0, Math.ceil(this.state.brightness / 20) - 1)];
        switch (this.state.mode) {
            case 1: // monoColor
                if (this.utils.getITErevision() === 2)
                    this.state.colors.forEach((col, index) => {
                        this.utils.monoColor(col[0], col[1], col[2], 1, index + 1, brightness);
                    });
                else {
                    const col = this.state.colors[0];
                    this.utils.monoColor(col[0], col[1], col[2], 1, 0, brightness);  
                }
                break;
            case 2: // breathing
                this.utils.breathing(1, speed, brightness);
                break;
            case 3: // wave
                this.utils.wave(1, speed, brightness, this.state.direction);
                break;
            case 4: // rainbow
                this.utils.rainbow(1, brightness);
                break;
            case 5: // flash
                this.utils.flash(1, speed, brightness, this.state.direction);
                break;
            case 6: // mix
                this.utils.mix(1, speed, brightness);
                break;
            default:
                break;
        }
    }

    setMonoColor() {
        this.setState(
            {
                ...this.state,
                mode: 1,
            },
            () => this.applySetting()
        );
    }

    setBreathing() {
        this.setState(
            {
                ...this.state,
                mode: 2,
            },
            () => this.applySetting()
        );
    }

    setWave() {
        this.setState(
            {
                ...this.state,
                mode: 3,
            },
            () => this.applySetting()
        );
    }

    setRainbow() {
        this.setState(
            {
                ...this.state,
                mode: 4,
            },
            () => this.applySetting()
        );
    }

    setFlash() {
        this.setState(
            {
                ...this.state,
                mode: 5,
            },
            () => this.applySetting()
        );
    }

    setMix() {
        this.setState(
            {
                ...this.state,
                mode: 6,
            },
            () => this.applySetting()
        );
    }

    pickColor(e, block) {
        let colors = this.state.colors;
        const value = e.target.value;
        const r = parseInt(value.substr(1, 2), 16),
            g = parseInt(value.substr(3, 2), 16),
            b = parseInt(value.substr(5, 2), 16);
        colors[block] = [r, g, b];
        this.setState(
            {
                ...this.state,
                colors,
            },
            () => this.applySetting()
        );
    }

    render() {
        if (this.utils === false) return <NoCompatibleDevice />;

        const c1 = "rgb(" + this.state.colors[0].join(",") + ")";
        const c2 = "rgb(" + this.state.colors[1].join(",") + ")";
        const c3 = "rgb(" + this.state.colors[2].join(",") + ")";
        const c4 = "rgb(" + this.state.colors[3].join(",") + ")";

        const linear = "linear-gradient(to right, " + c1 + ", " + c2 + ", " + c3 + ", " + c4 + ")";

        return (
            <div className="keyboard-light">
                <h3 className="page-title">{str("keyboardStyle")}</h3>
                <div className="keyboard-style">
                    <div
                        className={
                            "monoColor style-block " + (this.state.mode === 1 ? "active" : "")
                        }
                        onClick={() => this.setMonoColor()}
                        style={
                            this.state.mode === 1
                                ? {
                                      background: linear,
                                  }
                                : null
                        }
                    >
                        <h3>{str("monoColor")}</h3>
                        <div className="style-icon">
                            <Palette />
                        </div>
                        <div className="color-picker-container">
                            <div className="picker-cont">
                                <input
                                    type="color"
                                    ref={(ref) => (this.block1 = ref)}
                                    defaultValue={"#00b4ff"}
                                    onChange={(e) => this.pickColor(e, 0)}
                                />
                            </div>
                            {this.utils.getITErevision() === 2 && [
                                <div className="picker-cont" key={1}>
                                    <input
                                        type="color"
                                        ref={(ref) => (this.block2 = ref)}
                                        defaultValue={"#00b4ff"}
                                        onChange={(e) => this.pickColor(e, 1)}
                                    />
                                </div>,
                                <div className="picker-cont" key={2}>
                                    <input
                                        type="color"
                                        ref={(ref) => (this.block3 = ref)}
                                        defaultValue={"#00b4ff"}
                                        onChange={(e) => this.pickColor(e, 2)}
                                    />
                                </div>,
                                <div className="picker-cont" key={3}>
                                    <input
                                        type="color"
                                        ref={(ref) => (this.block4 = ref)}
                                        defaultValue={"#00b4ff"}
                                        onChange={(e) => this.pickColor(e, 3)}
                                    />
                                </div>,
                            ]}
                        </div>
                    </div>

                    <div
                        className={
                            "breathing style-block " + (this.state.mode === 2 ? "active" : "")
                        }
                        onClick={() => this.setBreathing()}
                    >
                        <h3>{str("breathing")}</h3>
                        <div className="style-icon">
                            <Breathing />
                        </div>
                    </div>

                    <div
                        className={"wave style-block " + (this.state.mode === 3 ? "active" : "")}
                        onClick={() => this.setWave()}
                    >
                        <h3>{str("wave")}</h3>
                        <div className="style-icon">
                            <Wave />
                        </div>
                    </div>

                    <div
                        className={"rainbow style-block " + (this.state.mode === 4 ? "active" : "")}
                        onClick={() => this.setRainbow()}
                    >
                        <h3>{str("rainbow")}</h3>
                        <div className="style-icon">
                            <Rainbow />
                        </div>
                    </div>

                    <div
                        className={"flash style-block  " + (this.state.mode === 5 ? "active" : "")}
                        onClick={() => this.setFlash()}
                    >
                        <h3>{str("flash")}</h3>
                        <div className="style-icon">
                            <Flash />
                        </div>
                    </div>

                    <div
                        className={"mix style-block " + (this.state.mode === 6 ? "active" : "")}
                        onClick={() => this.setMix()}
                    >
                        <h3>{str("mix")}</h3>
                        <div className="style-icon">
                            <Mix />
                        </div>
                    </div>

                    <div className="keyboard-brightness">
                        <p>{str("brightness")}</p>
                        <Slider
                            step={20}
                            defaultValue={80}
                            onChange={(c) =>
                                this.setState({ ...this.state, brightness: c }, () =>
                                    this.applySetting()
                                )
                            }
                        />
                    </div>

                    <div className="keyboard-speed">
                        <p>{str("speed")}</p>
                        <Slider
                            step={20}
                            defaultValue={40}
                            onChange={(c) =>
                                this.setState({ ...this.state, speed: c }, () =>
                                    this.applySetting()
                                )
                            }
                        />
                    </div>

                    {this.utils.getITErevision() === 3 && (
                        <p className="ite-support">{str("iteSupport")}</p>
                    )}
                </div>
                <div className="keyboard-switch">
                    <Switch defaultChecked onChange={(c) => this.toggleKeyboardLight(c)} />
                </div>
            </div>
        );
    }
}
