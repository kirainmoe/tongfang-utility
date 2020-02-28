# Project: STAR BEAT!

Next generation Tongfang Hackintosh Utility. (WIP)

## Features

- Keyboard light controller
- Manage and customize OpenCore config
- Useful scripts (Fix sleep, Enable HiDPI, etc.)
- More friendly User Interface
- Internationalization

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

![QQ20200228-132347@2x.png](https://i.loli.net/2020/02/28/h1oAMsyFcORBYVe.png)

![QQ20200228-132450@2x.png](https://i.loli.net/2020/02/28/fhXzYMPrCxNjsL6.png)

![QQ20200228-132456@2x.png](https://i.loli.net/2020/02/28/WytYLQIexS3A1nD.png)

## Tech Stack

- Node.js
- electron
- React
- React Router
- node-hid


## License

Tongfang Hackintosh Utility (Project: STAR BEAT!) is MIT licensed.