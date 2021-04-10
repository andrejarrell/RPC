let { Menu, shell } = require('electron')

module.exports = Menu.buildFromTemplate([
    {
        label: 'GitHub',
        click() {
            shell.openExternal('https://listcord.net/rpc')
        }
    },
    {
        label: 'Discord',
        click() {
            shell.openExternal('https://listcord.ga')
        }
    },
    {
        label: 'Website',
        click() {
            shell.openExternal('https://listcord.net')
        }
    },
    {
        role: 'reload'
    },
    {
        role: 'quit'
    }
])