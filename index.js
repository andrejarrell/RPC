let rpc = require('discord-rpc')
let validator = require('validator')
let config = require('./config.json')
let { app, ipcMain, BrowserWindow, globalShortcut } = require('electron')

let createWindow = () => {
    global.window = new BrowserWindow({
        width: 800,
        height: 880,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    window.removeMenu()
    window.loadFile('src/index.html')
    window.setIcon('src/img/logo.png')
    window.setTitle('Listcord RPC')
    globalShortcut.register('CommandOrControl+R', () => {
        window.reload()
    })
    globalShortcut.register('CommandOrControl+Shift+I', () => {
        window.toggleDevTools()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

let client = new rpc.Client({ transport: 'ipc' })

let setActivity = config => {
    let activity = {}
    let {
        state,
        details,
        timestamp,
        largeImageKey,
        largeImageText,
        smallImageKey,
        smallImageText,
        buttonOneUrl,
        buttonOneText,
        buttonTwoUrl,
        buttonTwoText
    } = config
    if (timestamp === 'Enable')
        activity.timestamps = {
            start: Date.now()
        }
    activity.state = state || undefined
    activity.details = details || undefined
    activity.assets = {
        large_image: largeImageKey || undefined,
        large_text: largeImageText || undefined,
        small_image: smallImageKey || undefined,
        small_text: smallImageText || undefined
    }
    if (buttonOneText && validator.isURL(buttonOneUrl) 
        || buttonTwoText && validator.isURL(buttonTwoUrl))
        activity['buttons'] = []
    if (buttonOneText && buttonOneUrl)
        validator.isURL(buttonOneUrl) ?
            activity.buttons.push({
                url: buttonOneUrl,
                label: buttonOneText
            }) : null
    if (buttonTwoText && buttonTwoUrl)
        validator.isURL(buttonTwoUrl) ?
            activity.buttons.push({
                url: buttonTwoUrl,
                label: buttonTwoText
            }) : null
    
    client.request('SET_ACTIVITY', {
        activity,
        pid: process.pid
    })
    window.webContents.send('alert', {
        type: 'success',
        message: 'Rich Presence was updated!'
    })
}

let login = config => {
    if (!config.clientId) {
        return window.webContents.send('alert', {
            type: 'warning',
            message: 'Make sure to supply a Client ID!'
        })
    }
    client.login({ clientId: config.clientId })
    client.once('ready', () => setActivity(config))
}

let update = (event, config) => {
    if (client.clientId !== config.clientId) {
        client.destroy()
        login(config)
    } else {
        setActivity(config)
    }
}

ipcMain.on('update', update)
ipcMain.on('ready', () => login(config))
ipcMain.on('reload', () => window.reload())
ipcMain.on('devtools', () => window.toggleDevTools())

process.on('uncaughtException', console.error)
process.on('unhandledRejection', reject => {
    console.log(reject)
    window.webContents.send('alert', {
        type: 'danger',
        message: 'Could not connect to RPC!'
    })
})