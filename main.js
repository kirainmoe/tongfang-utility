const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 700,
        height: 420,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    });

    win.loadFile('./views/index.html');
    // win.webContents.openDevTools();
};

app.on('ready', createWindow);