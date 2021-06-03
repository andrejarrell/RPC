let $ = require('jquery')
require('bootstrap')
require('popper.js')
let {
    shell,
    ipcRenderer
} = require('electron')
let Store = require('electron-store')
let defaultConfig = require('../default.json')

let store = new Store()

class App {
    constructor() {
        let config = store.get('config', defaultConfig)
        let properties = Object.keys(config)
        properties.forEach(property => {
            let element = $(`#${property}`)
            element.val(config[property])
            element.on('change', () => {
                let value = element.val()
                store.set(`config.${property}`, value)
                this.send('update')
            })
        })
    }

    open(link) {
        shell.openExternal(link)
    }

    send(event) {
        ipcRenderer.send(event)
    }

    alert(event, data) {
        $('#alert').html(`
            <div class="alert text-center alert-${data.type} mb-4">
                <strong>${data.message.toUpperCase()}</strong>
            </div>
        `)
    }
}

let app = new App

app.send('ready')
ipcRenderer.on('alert', app.alert)