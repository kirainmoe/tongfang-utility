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

![QQ20201018-215225@2x.png](https://i.loli.net/2020/10/18/uodx7WRiCcSTmjP.png)

![QQ20201018-215252@2x.png](https://i.loli.net/2020/10/18/QR3dvBLaSDzJ9Nw.png)

![QQ20201018-215245@2x.png](https://i.loli.net/2020/10/18/7thdWVrwfuQpvoi.png)

![QQ20201018-215304@2x.png](https://i.loli.net/2020/10/18/Losqj2yWgafBzxV.png)


![QQ20201018-215310@2x.png](https://i.loli.net/2020/10/18/xcX9LpF8NPCBRse.png)

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