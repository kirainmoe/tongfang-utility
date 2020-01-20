const { app, BrowserWindow, globalShortcut, Menu } = require('electron');

const createWindow = () => {
    Menu.setApplicationMenu(null);
    
    const win = new BrowserWindow({
        width: 700,
        height: 440,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    });

    win.loadFile('./views/index.html');

    // globalShortcut.register('CmdOrCtrl+R', () => {});
    // globalShortcut.register('CmdOrCtrl+Shift+R', () => {});
    globalShortcut.register('CmdOrCtrl+Shift+I', () => {
      win.webContents.openDevTools();
    });
};

app.on('ready', createWindow);
