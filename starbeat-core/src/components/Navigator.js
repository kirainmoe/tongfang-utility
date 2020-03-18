import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/Navigator.styl';

import str from '../resource/string';
import conf from '../config';

import Keyboard from '../icons/Keyboard';
import ConfigUpdate from '../icons/ConfigUpdate';
import Tools from '../icons/Tools';
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

                <NavLink className="nav-link" to="/tools">
                    <Tools />
                    <p>{str('tools')}</p>
                </NavLink>

                {navigator.language === 'zh-CN' ? <NavLink className="nav-link" to="/lab">
                    <Lab />
                    <p>其它</p>
                </NavLink> : null}

                <div className="starbeat-version">
                    <p>app v{conf.version}</p>
                </div>
            </div>
        );
    }
}