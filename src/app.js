let $ = require('jquery')
require('bootstrap')
require('popper.js')
let fs = require('fs')
let { ipcRenderer, shell } = require('electron')

class App {
    constructor() {
        this.config = require('../config.json')
        let props = Object.keys(this.config)
        props.forEach(prop => {
            let element = $(`#${prop}`)
            element.val(this.config[prop])
            element.on('change', () => {
                this.config[prop] = element.val()
                this.update()
            })
        })
    }

    async update() {
        let json = JSON.stringify(this.config, null, 4)
        await fs.promises.writeFile('config.json', json)
        ipcRenderer.send('update', this.config)
    }

    alert(event, content) {
        $('#alert').html(`
            <div class="alert text-center alert-${content.type} mb-4">
                <strong>${content.message.toUpperCase()}</strong>
            </div>
        `)
    }
}

let app = new App

ipcRenderer.send('ready')
ipcRenderer.on('alert', app.alert)