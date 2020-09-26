let $ = require('jquery');
require('bootstrap');
require('popper.js');
let fs = require('fs').promises;
let { ipcRenderer } = require('electron');

class App {
    constructor() {
        this.config = require('../config.json');
        let props = Object.keys(this.config);
        props.forEach(prop => {
            let element = $(`#${prop}`);
            element.val(this.config[prop]);
            element.change(() => {
                this.config[prop] = element.val();
                this.update();
            });
        });
    }

    async update() {
        let json = JSON.stringify(this.config, null, 4);
        await fs.writeFile('config.json', json);
        ipcRenderer.send('update', this.config);
    }

    alert(event, alert) {
        $('#alert').html(`
        <div class="alert alert-dismissible text-center fade show alert-${alert.type} mb-4">
            ${alert.message.toUpperCase()}
        </div>`);
    }
}

let app = new App;

ipcRenderer.on('alert', app.alert);
ipcRenderer.send('ready');