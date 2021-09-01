# Aki Boilerplate

@kirainmoe's front-end boilerplate 2021.

## Tech Stack

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

## Scripts

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

## Project Structure

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

## Development Guide

## Credit

This boilerplate was inspired from and referred to this article: [Guide: TypeScript + React Engineering in 2021](https://zhuanlan.zhihu.com/p/403970666)