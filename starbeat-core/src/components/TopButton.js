import React, { Component } from 'react';

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
                <button className='top-button-exit' onClick={() => this.closeWindow()} />
                <button className='top-button-minimize' onClick={() => this.minimizeWindow()} />
                <button className='top-button-maxmize' onClick={() => this.maximizeWindow()} />
            </div>
        );
    }
}