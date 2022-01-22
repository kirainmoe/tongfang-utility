# 同方助手 (Tongfang Utility) - v4

为清华同方模具笔记本设计的 Hackintosh 工具箱。

[English](https://github.com/kirainmoe/tongfang-utility/blob/v4/README-en.md)

## 下载

- [蓝奏云下载](https://www.lanzouw.com/b0ephfc4d) / 提取密码: `1f1e33`
- [天翼云下载地址](https://cloud.189.cn/t/uqiamyQRFRRz)，访问码：`eu4c`
- [GitHub Release](https://github.com/kirainmoe/tongfang-utility/releases)

## 开发指南

### 技术栈架构

- **语言**：Node.js, Rust, C++
- **WebView**：tauri
- **UI 框架**：React 17
- **数据流管理**：Mobx
- **构建方案**：esbuild, Vite
- **设计方案**：Arco Design, Ant Design

### 准备环境

首先安装 [Node.js](https://nodejs.org/en/) 和 [Rust](https://www.rust-lang.org/).  中国境内开发者，推荐使用 [RsProxy](https://rsproxy.cn) 安装 Rust 环境，以获得更快的下载速度。

```sh
# macOS
brew install nodejs yarn

export RUSTUP_DIST_SERVER="https://rsproxy.cn"
export RUSTUP_UPDATE_ROOT="https://rsproxy.cn/rustup"
curl --proto '=https' --tlsv1.2 -sSf https://rsproxy.cn/rustup-init.sh | sh
```

### 克隆仓库

```sh
git clone git@github.com:kirainmoe/tongfang-utility.git
```

### 安装依赖

```sh
cd tongfang-utility
yarn install
```

### 启动开发环境

```sh
yarn dev:vite
yarn tauri dev
```

### 构建 DMG / 可执行文件

```sh
yarn build:vite
yarn tauri build
```

## 许可

MIT Licensed