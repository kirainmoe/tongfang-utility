# Aki Boilerplate

This is @kirainmoe's front-end boilerplate 2021.

Say goodbye to `create-react-app`!

# Tech Stack

- Framework: React 17
- Toolchains: 
  - TypeScript 4.4.2
  - Webpack 5
  - ESLint
  - Prettier
- Git:
  - Husky
  - LintStaged
- State Management:
  - Redux
  - Redux Saga
- Router: React Router
- Styles: 
  - Styled Component
  - LESS
- Optimizations:
  - Loadable Component

# Scripts

### Installing Dependencies

```sh
yarn install
```

### Start a Dev Server

```sh
yarn dev
```

### Build

```
yarn build
```

# Project Structure

```
├── dist            // webppack build output dir
├── public          // dev-server public root
│   └── index.html
├── scripts
│   └── webpack     // webpack configs (dev, prod)
├── src
│   ├── actions     // redux actions here
│   ├── common      // common vars & definitions here
│   ├── components  // components
│   ├── reducers    // redux reducer here
│   ├── resources   // static resources (icons, fonts, images...) here
│   ├── sagas       // redux saga here
│   ├── stores      // redux store here
│   ├── types       // typescript .d.ts here
│   ├── utils       // utility functions here
│   └── index.tsx   // *App Entry*
├── README.md
├── package.json
├── tsconfig.json
└── yarn.lock
```

# Development Guide
### Where to Start?

- Clone this repo
- Edit `name`, `author`, `repo`, `title` and other fields in `package.json`
- Install dependencies
- Run `yarn dev` to start a  webpack dev-server

### Creating a Comopnent

- Each component should have its own directory in `src/components`. 
- Child components should also have their own directory in `src/component/ParentComponents`.
- This boilerplate integrates `styled-components` and `LESS`. Choose one of your favorites to write styles.

### Redux

- Action types constant string should be placed in `src/actions/constant/action-types.ts`.
- Actions should be placed in `src/actions`.
- Reducers should be placed in `src/reducers` and exports its own type. `src/reducers` exports combined reducers.
- Asynchronous operations (e.g. network requests) should be written as sagas and placed in `src/sagas`. `src/sagas` exports combined sagas.
- `src/stores` exports `AppState` (state tree type of redux store) and `AppDispatch` (dispatch type of redux store).

### Webpack

- Webpack configs are in `scripts/webpack` directory.
- If you want to add general options / loaders / plugins, edit `scripts/webpack/webpack.common.config.js`.
- `webpack-dev-server` listens on `localhost:3000` default.
# Credit

This boilerplate was inspired from and referred to this article: [Guide: TypeScript + React Engineering in 2021](https://zhuanlan.zhihu.com/p/403970666)