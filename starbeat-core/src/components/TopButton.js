import React, { Component } from 'react';


import str from "../resource/string";
import '../styles/TopButton.styl';

export default class TopButton extends Component {
    maximized = false;

    closeWindow() {
        window.close();
    }

    minimizeWindow() {
        window.browserWindow.getCurrentWindow().minimize();
    }

    maximizeWindow() {
        return;
    }

    render() {
        return (
            <div className='top-button-container'>
                <button aria-label={str("exit")} className='top-button-exit' onClick={() => this.closeWindow()} />
                <button aria-label={str("minimize")} className='top-button-minimize' onClick={() => this.minimizeWindow()} />
                <button aria-label={str("maximize")} className='top-button-maxmize' onClick={() => this.maximizeWindow()} />
            </div>
        );
    }
}