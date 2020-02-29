# Project: STAR BEAT!

[简体中文](README.md)

Next generation Tongfang Hackintosh Utility. 

## Features

- Keyboard light controlling (Windows, macOS, Linux)
- Manage and customize OpenCore config
- Useful scripts (fix sleep, enable HiDPI, etc.)
- More friendly User Interface
- Internationalization

> Tips: keyboard light controlling function is only available for laptops with ITE Device 8291, **revision 0.02**. If you have ITE Device 8291 **revision 0.03**, refer to [AUCC](https://github.com/rodgomesc/avell-unofficial-control-center).

## Download

Binaries are available at [Release Page](https://github.com/kirainmoe/project-starbeat/releases).

## Build

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

## Screenshots

<img src="https://i.loli.net/2020/02/29/LRDhgZYP3bq5lBs.png" alt="keyboard" width="500px">

<a href="https://sm.ms/image/iPlXRYDmSf2BcVo" target="_blank"><img src="https://i.loli.net/2020/02/29/iPlXRYDmSf2BcVo.png" width="500px"></a>

<a href="https://sm.ms/image/2gH3pFmIokYOEub" target="_blank"><img src="https://i.loli.net/2020/02/29/2gH3pFmIokYOEub.png" width="500px"></a>

## Tech Stack

- Node.js
- electron
- React
- React Router
- node-hid

## Contribute

Feel free to pull requests.



## License

Tongfang Hackintosh Utility (Project: STAR BEAT!) is MIT licensed.