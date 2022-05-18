# Autocomplete component

This is an Autocomplete component written on React.

## Before reviewing the codebase, please check this list of considerations
- The component doesn't cover all use cases such as onhover, etc.
- The CRA is applied, so I could focus on the task implementation from the start.
- The app utilizing a free API to load the data. More details about API in https://pokeapi.co/.
- In the real project I'd also do:
  - Add the unit tests.
  - Add the storybook.
  - Utilize the design(Figma) to make it pixel perfect, and follow the Design System.
- The app consist of the static files under the /public folder such as the logo and favicon, of course they're used just as an example.

## Requirements

- nvm (or node v16.14.2)
- yarn latest

## Getting started

```bash
yarn
yarn start
```

## Available commands

- `yarn start` to start the development environment. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn build` to create a production ready build. It will appear in `/build` directory.
