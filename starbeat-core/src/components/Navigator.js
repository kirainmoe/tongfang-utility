import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import '../styles/Navigator.styl';

import str from '../resource/string';
import conf from '../config';

import Keyboard from '../icons/Keyboard';
import ConfigUpdate from '../icons/ConfigUpdate';
import Tools from '../icons/Tools';
import Update from '../icons/Update';
import CompatCheck from '../icons/CompatCheck';
import Lab from '../icons/Lab';

const logo = require('../resource/logo.png');

export default class Navigator extends Component {
    render() {
        return (
            <div className="navigator">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                <NavLink className="nav-link" to="/keyboard">
                    <Keyboard />
                    <p>{str('keyboardLight')}</p>
                </NavLink>

                <NavLink className="nav-link" to="/config">
                    <ConfigUpdate />
                    <p>{str('config')}</p>
                </NavLink>

                {window.electron.isMac() && (
                    <NavLink className="nav-link" to="/tools">
                        <Tools />
                        <p>{str('tools')}</p>
                    </NavLink>
                )}

                {window.electron.isMac() && (
                    <NavLink className="nav-link" to="/lab">
                        <Lab />
                        <p>{str('lab')}</p>
                    </NavLink>
                )}

                {navigator.language === "zh-CN" && window.electron.isWin() && (
                    <NavLink className="nav-link" to="/compatCheck">
                        <CompatCheck />
                        <p>{str('compatCheck')}</p>
                    </NavLink>
                )}                

                <NavLink className="nav-link" to="/update">
                    <Update />
                    <p>{str('update')}</p>
                </NavLink>

                <div className="starbeat-version">
                    { navigator.language === "zh-CN" ? 
                        <Link to="/about">
                            <p>app v{conf.version}</p>
                        </Link>
                    :  <p>app v{conf.version}</p>}
                </div>
            </div>
        );
    }
}