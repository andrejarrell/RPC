# Discord RPC

> Discord Rich Presence enables you to further customize your status on Discord.

## 🛠 Setup

- [x] Create an application at [Discord's Developer Portal](https://discord.com/developers/applications)

`New Application` -> (Name it) -> `Create` -> `General Information` -> (Copy Client ID)

- [x] Upload images you will use

`Rich Presence` -> `Add Image(s)`

- [x] Install latest release of [RPC](https://discord.com/developers/applications)

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