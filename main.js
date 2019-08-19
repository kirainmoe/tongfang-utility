const { app, BrowserWindow, Menu } = require('electron');

const createWindow = () => {
    Menu.setApplicationMenu(null);
    
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
