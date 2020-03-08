<div align="center">

<img src="https://raw.githubusercontent.com/kiddyuchina/vsc-mikutap/master/icon.png" alt="icon" width="128px">

# VSC Mikutap

Mikutap extension for Visual Studio Code

[![Visual Studio Marketplace](https://img.shields.io/badge/Visual%20Studio-Marketplace-007acc.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=kiddyu.vsc-mikutap)
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/kiddyu.vsc-mikutap.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=kiddyu.vsc-mikutap)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/kiddyu.vsc-mikutap.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=kiddyu.vsc-mikutap)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/stars/kiddyu.vsc-mikutap.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=kiddyu.vsc-mikutap)
[![GitHub Stars](https://img.shields.io/github/stars/kiddyuchina/vsc-mikutap.svg?style=flat-square)](https://github.com/kiddyuchina/vsc-mikutap)

</div>

## Feature

原作地址: [https://aidn.jp/mikutap](https://aidn.jp/mikutap)  
插件使用 [Webview](https://code.visualstudio.com/api/extension-guides/webview) 实现

## Requirement

[VS Code 使用的 Electron 版本不包含 ffmpeg](https://stackoverflow.com/a/51735036)，需替换自带的 ffmpeg 动态链接库才能正常播放 (每次更新 VS Code 都需重新替换)

*VS Code for Windows 1.31.0 - 1.35.1 不需替换，1.36.0 后无此待遇*

<details><summary>
<b>Manual Replacement</b>
</summary>

通过 VS Code 版本在 `https://raw.githubusercontent.com/Microsoft/vscode/%version%/.yarnrc` 查看其使用的 Electron 版本，并于 `https://github.com/electron/electron/releases/tag/%version%` 下载对应的 **Electron 完整版本**进行替换

#### Windows
下载 **electron-%version%-win32-%arch%.zip**

替换 `./ffmpeg.dll`

#### macOS
下载 **electron-%version%-darwin-x64.zip** 

替换 `./Electron.app/Contents/Frameworks/Electron\ Framework.framework/Libraries/libffmpeg.dylib`

#### Linux
下载 **electron-%version%-linux-%arch%.zip**

替换 `./libffmpeg.so`

</details>

<details><summary>
<b>Automatic Replacement</b>
</summary>

使用 Python 脚本替换 (Python 2/3 均可，绝大部分发行版自带环境)

**默认安装位置下 Linux 和 Windows 需要以管理员身份运行，macOS 不需要**

#### Windows Powershell

```powershell
Invoke-RestMethod https://gist.githubusercontent.com/nondanee/f157bbbccecfe29e48d87273cd02e213/raw | python
```

#### Unix Shell

```
curl https://gist.githubusercontent.com/nondanee/f157bbbccecfe29e48d87273cd02e213/raw | python
```

如果 VS Code 使用默认配置安装，脚本会自动寻找并替换，若自定义了安装位置，请自行修改 [installation](https://gist.github.com/nondanee/f157bbbccecfe29e48d87273cd02e213#file-helper-py-L20)

</details>

## Usage

按下 <kbd>F1</kbd> 或 <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>P</kbd> 打开命令面板

输入命令前缀 `Mikutap` 开始探索 :D

## Known Issue

- Webview 标签无法隐藏，使用时请不要关闭标签

## Thanks

- 原作者: [daniwell](https://aidn.jp/daniwell/)
- Icon: [Jun-Himekawa](https://www.deviantart.com/jun-himekawa)
- 实现方式: [VSC 网易云音乐插件](https://github.com/nondanee/vsc-netease-music)
