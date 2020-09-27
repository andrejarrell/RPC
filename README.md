# Discord RPC

> Discord Rich Presence enables you to further customize your status on Discord.

<img alt="rpc" src="https://raw.githubusercontent.com/andrejarrell/RPC/master/src/img/screenshot.jpg">

## 🛠 Setup

- [x] Create an application at [Discord's Developer Portal](https://discord.com/developers/applications)

`New Application` -> (Name it) -> `Create` -> `General Information` -> (Copy Client ID)

- [x] Upload images you will use

`Rich Presence` -> `Add Image(s)`

- [x] Clone repository (Requires [Git](https://git-scm.com/downloads))

`git clone https://github.com/andrejarrell/rpc.git`

- [x] Enter directory and install dependencies (Requires [Node.js](https://nodejs.org/en/download))

`npm ci`

`npm start`

(Downloading Electron for the first time may time some time)

## ⚙ Settings

Settings are saved in `config.json` 

| Name | Type | Required | Default |
| -- | -- | -- | -- |
| `clientId` | `String` | `true` | N/A |
| `timestamp` | `String` | `false` | `Disable` |
| `state` | `String` | `true` | `Undefined` |
| `details` | `String` | `true` | `Undefined` |
| `largeImageKey` | `String` | `false` | `Undefined` |
| `largeImageText` | `String` | `false` | `Undefined` |
| `smallImageKey` | `String` | `false` | `Undefined` |
| `smallImageText` | `String` | `false` | `Undefined` |