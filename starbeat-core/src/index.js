import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from "history";

// import './styles/reset.css';
import './styles/app.styl';

import Navigator from './components/Navigator';
import KeyboardLight from './components/KeyboardLight';
import Toolbox from './components/Toolbox';
import Lab from './components/Lab';
import Configure from './components/Configure';
import Update from './components/Update';
import About from './components/About';
import CompatCheck from './components/CompatCheck';
import TopButton from './components/TopButton';

const fs = window.electron.fs();
const userDir =  window.electron.getUserDir();

if (!fs.existsSync(`${userDir}/.tfu`)) {
    fs.mkdirSync(`${userDir}/.tfu`);
}

render(
    <div className="starbeat-app">
        <HashRouter history={createBrowserHistory()}>
            <TopButton />
            <Navigator />

            <div className="page">
                <Route path="/" exact>
                    <Redirect to="/keyboard" />
                </Route>
                <Route path="/keyboard" exact>
                    <KeyboardLight />
                </Route>
                <Route path="/config" exact>
                    <Configure />
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
                <Route path="/compatCheck" exact>
                    <CompatCheck />
                </Route>
                <Route path="/update" exact>
                    <Update />
                </Route>
            </div>
        </HashRouter>
    </div>
, document.getElementById('root'));