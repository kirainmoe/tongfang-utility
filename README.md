# 同方黑苹果助手 (Tongfang Hackintosh Utility)

[English](README-en.md)

![travis-build](https://travis-ci.org/kirainmoe/tongfang-hackintosh-utility.svg?branch=master)

Tongfang Hackintosh Utility (同方黑苹果助手) 3.0, 全新的同方模具笔记本黑苹果工具箱。

[蓝奏云下载地址](https://www.lanzous.com/b0ephfc4d) / [蓝奏云下载地址2](https://wwa.lanzous.com/b0ephfc4d)，提取密码：`1f1e33`  
[天翼云下载地址](https://cloud.189.cn/t/uqiamyQRFRRz)，访问码：`eu4c`

## 功能简介

- 跨平台的键盘灯设置功能 (支持 Windows, macOS, Linux)
- 管理、更新、定制 OpenCore 配置文件
- 一键修复睡眠、开启 HiDPI 等
- 更友好的用户界面
- 多语言国际化支持

> Tips: 键盘灯控制功能仅适用于搭载了 ITE Device 8291, **版本 0.02** 的电脑. 如果你有 ITE Device 8291 设备，但 **版本为 0.03**, 请使用此工具： [AUCC](https://github.com/rodgomesc/avell-unofficial-control-center).

## 下载

可以在 [Release](https://github.com/kirainmoe/project-starbeat/releases) 页面下载。

## 构建

```bash
# ------ clone repo ------
git clone https://github.com/kirainmoe/project-starbeat starbeat
cd starbeat

# ------ start a development server ------
cd starbeat-core && yarn install
yarn start                             # will run webpack-dev-server on localhost:3000
cd ..
cd starbeat-client && yarn install
yarn start                             # will launch electron

# ------- pack an executable file -------
# build front-end
cd starbeat-core && yarn build
cd ..
cp -r starbeat-core/build starbeat-client/build
cd starbeat-client
yarn pack:macos
```

## 截图

![QQ20200925-193046.png](https://i.loli.net/2020/09/25/ZIgxnrmio1eFXkQ.png)

![QQ20200925-193106.png](https://i.loli.net/2020/09/25/GBfQRrV5tKJOvgN.png)

![image.png](https://i.loli.net/2020/09/25/PL6Rvch97grSbFp.png)

![image.png](https://i.loli.net/2020/09/25/TfymBSz8Qtpraj9.png)

## 技术栈

- Node.js
- electron
- React
- React Router
- node-hid

## 贡献

Feel free.

## 许可协议

Tongfang Hackintosh Utility 基于 MIT 协议开源。
