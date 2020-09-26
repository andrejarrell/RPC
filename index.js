let rpc = require('discord-rpc');
let config = require('./config.json');
let package = require('./package.json');
let { app, BrowserWindow, ipcMain } = require('electron');

let production = process.env.NODE_ENV === 'production';

let createWindow = () => {
    global.window = new BrowserWindow({
        width: 800,
        height: 690,
        webPreferences: {
            nodeIntegration: true
        }
    });
    if (production) window.setMenu(null);
    window.loadFile('src/index.html');
    window.setIcon('src/img/logo.png');
    window.setTitle(`Discord RPC ${package.version}`);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

let setActivity = config => {
    client.setActivity({
        state: config.state || 'Undefined',
        details: config.details || 'Undefined',
        largeImageKey: config.largeImageKey || 'Undefined',
        largeImageText: config.largeImageText || 'Undefined',
        smallImageKey: config.smallImageKey || 'Undefined',
        smallImageText: config.smallImageText || 'Undefined',
        startTimestamp: config.timestamp === 'Enable' ? Date.now() : null
    });
    window.webContents.send('alert', {
        type: 'success',
        message: 'Rich Presence was updated!'
    });
};

let connect = config => {
    global.client = new rpc.Client({ transport: 'ipc' });
    if (!config.clientId) {
        return window.webContents.send('alert', {
            type: 'warning',
            message: 'Make sure to supply a Client ID!'
        });
    }
    client.login({ clientId: config.clientId })
    client.once('ready', () => setActivity(config));
};

let update = (event, config) => {
    if (client.clientId !== config.clientId) {
        client.destroy();
        connect(config);
    } else {
        setActivity(config);
    }
};

ipcMain.on('update', update);
ipcMain.on('ready', () => connect(config));

process.on('uncaughtException', error => console.log(error));
process.on('unhandledRejection', () => {
    window.webContents.send('alert', {
        type: 'danger',
        message: 'Could not connect to RPC!'
    });
});