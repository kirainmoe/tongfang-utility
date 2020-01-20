# Project: STAR BEAT!

![build](https://img.shields.io/badge/build-passing-brightgreen.svg) ![version](https://img.shields.io/badge/version-1.1.0-9cf.svg) ![built by](https://img.shields.io/badge/built_by-Yume_Maruyama-ff69b4.svg)

基于 Electron 的、为同方模具的神舟笔记本设计的 macOS 版非官方控制中心。

An unofficial control center for Hasee Tongfang laptops on macOS.

# Early Stage

该项目尚处于初期阶段，并非最终体；目前仅支持控制键盘灯，其它功能仍然在开发中。如果你遇到任何问题或者你有什么想法，请提 issue 向我反馈。

This project is on an early stage. There is little feature in this program, including keyboard light controlling. If you meet problems or you have some ideas, please open an issue and tell me.

# Build & Run

程序使用 Electron 打包，所以体积较大。可以在[这里](https://github.com/kirainmoe/STARBEAT/releases)下载到打包好的程序。

The program is powered by Electron. You can download packed binary file in [here](https://github.com/kirainmoe/STARBEAT/releases).

```shell
# install dependencies
npm install

# start development environment(macOS)
npm start
# in Linux you may need to run with `sudo`

# pack binary(macOS)
npm run pack

# pack binary(Linux)
npm run pack:linux
```

# Supported Devices

为神舟同方机型适配；理论支持所有搭载 ITE 控制芯片 (厂商 ID 0x048d, 设备 ID 0xce00)、ITE 版本为 0.02 的键盘；以下是测试通过的机型：

This program is designed for Hasee God-of-War models, but will theoretically work on those devices with ITE keyboard (vendor id 0x048d, device id 0xce00, ITE revision 0.02). The following are the models that are known to work:

- Z7(m)-KP7/5(G)Z
- Z7(m)-kP7/5EC

# Not Support My Device?

该程序仅支持 ITE 控制器版本为 0.02 的键盘。如果你的 ITE 版本为 0.03，请使用该仓库下的工具：https://github.com/rodgomesc/avell-unofficial-control-center ；如果你的 ITE 版本为 0.02 且硬件 ID 正确，请提 issue 向我反馈。

This program only support ITE controller with revision 0.02. If your ITE revision is 0.03, please use this CLI tool by @rodgomesc: https://github.com/rodgomesc/avell-unofficial-control-center ; if your ITE revision is 0.02 and vendor_id / product_id are correct, please open an issue to tell me.

# Screenshot

![QQ20190818-235957.png](https://i.loli.net/2019/08/19/buNLSTZCQHep9Dt.png)

![QQ20190819-000025.png](https://i.loli.net/2019/08/19/MKs26o4nXgIFraz.png)

![QQ20190819-000032.png](https://i.loli.net/2019/08/19/tQhoXk6Zxy43RIM.png)

# Other

- Powered by Electron and node-hid, written in Node.js/Javascriipt
- Materialize UI Library
- Thanks to [@rodgomesc](https://github.com/rodgomesc) for his inspiration and help
- Thanks to the testing of KP7EC by QianBiXiangYang
- Logo and project name are inspired from Poppin'Party

# License

Project: STAR BEAT! is MIT licensed.
