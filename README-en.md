# Tongfang Utility

An application made for Tongfang laptop users whose laptop is running macOS.

## Download

- [GitHub Release](https://github.com/kirainmoe/tongfang-utility/releases)

## Develop Guide

### Tech Stack

- Node.js / Rust / C++
- tauri
- React
- Mobx
- Vite (esbuild)
- Arco Design / Ant Design


### Set up Environment

Install Node.js and Rust:

```sh
brew install nodejs yarn
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Clone Repo

```sh
git clone git@github.com:kirainmoe/tongfang-utility.git
```

### Install Dependencies

```sh
cd tongfang-utility
yarn install
```

### Start a Dev Server

```sh
yarn dev:vite
yarn tauri dev
```

### Build Executable File / DMG

```sh
yarn build:vite
yarn tauri build
```

## License

MIT