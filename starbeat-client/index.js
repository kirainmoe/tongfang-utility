const { app, BrowserWindow, globalShortcut } = require('electron');

if (require('electron-squirrel-startup'))
  app.quit();

const createWindow = () => {
    let win = new BrowserWindow({
      width: 700,
      height: 650,
      webPreferences: {
        nodeIntegration: true
      },
      resizable: false,
      frame: false
    });
    
    if (process.env.NODE_ENV == 'development') {
      win.loadURL('http://localhost:3000');
      win.webContents.openDevTools();
      globalShortcut.register('CmdOrCtrl+Shift+I', () => {
        win.webContents.openDevTools();
      });
      
      globalShortcut.register('Ctrl+R', () => {
        win.webContents.reload();
      });
    } else {
      win.loadFile('./build/index.html');
      globalShortcut.register('Ctrl+R', () => {
        win.webContents.reload();
      });
      globalShortcut.register('CmdOrCtrl+Shift+R', () => {});
      globalShortcut.register('CmdOrCtrl+Shift+I', () => {
        win.webContents.openDevTools();
      });
    }
    win.removeMenu();
  }
  
  app.on('ready', createWindow);