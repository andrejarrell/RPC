# Listcord RPC

<a href="https://listcord.ga">
    <img src="https://discordapp.com/api/guilds/726798031965519873/widget.png?style=shield">
</a>

### Listcord RPC enables you to further customize your status on Discord

<details>
    <summary>🖼 Preview Screenshots</summary>
    <br>
    
   ![rpc](https://user-images.githubusercontent.com/33952641/112995901-0be82680-91af-11eb-9342-b4fe7280dacd.png)

   ![app](https://user-images.githubusercontent.com/33952641/112995924-11de0780-91af-11eb-9110-c864c8cded79.png)
</details>

## 🛠 Setup

✔ Create an application at [Discord's Developer Portal](https://discord.com/developers/applications)

`New Application` -> (Name it) -> `Create` -> `General Information` -> (Copy Client ID)

✔ Upload images you will use

`Rich Presence` -> `Add Image(s)`

✔ Download latest [release](https://github.com/listcord/rpc/releases) for Windows or Linux

<details>
    <summary>👨‍💻 If you'd rather run from source...</summary>
    <br>
    
✔ Clone repository (Requires [Git](https://git-scm.com/downloads))

`git clone https://github.com/listcord/rpc.git`

✔ Enter directory and install dependencies (Requires [Node.js v14](https://nodejs.org/en/download))

`npm ci`

`npm start`

> Downloading Electron for the first time may awhile

## ⚙ Settings

Settings are saved in `config.json` 

| Name | Type | Required |
| -- | -- | -- |
| `clientId` | `String` | `true` |
| `timestamp` | `String` | `false` |
| `state` | `String` | `false` |
| `details` | `String` | `false` |
| `largeImageKey` | `String` | `false` |
| `largeImageText` | `String` | `false` |
| `smallImageKey` | `String` | `false` |
| `smallImageText` | `String` | `false` |
| `buttonOneText` | `String` | `false` |
| `buttonOneUrl` | `String` | `false` |
| `buttonTwoText` | `String` | `false` |
| `buttonTwoUrl` | `String` | `false` |
</details>
