
# HashTag
hash is a library and two way data bind , to help you use javascript so fast in your web page

 <img width="100px"  style="border-radius:50%" src="https://user-images.githubusercontent.com/49714406/129392154-c281e1d6-5001-4f27-afc1-c17c7748c352.png" align="center" alt="GitHub Readme Stats" />

# Abastece-UÍ

> Awesome React UI Kit

[![NPM](https://img.shields.io/npm/v/abastece-ui.svg)](https://www.npmjs.com/package/abastece-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

Clone the repository, and install the dependencies by running the following commands:

```sh
  $ git clone https://gitlab.eai.com.br/project-grups/sites/ui-kit-front-web.git
```

Access the project on `ui-kit-front-web` directory:

```sh
  $ cd ui-kit-front-web
```

Access the `Development` branch:

```sh
 $ git checkout develop
```

pull all `Development` changes:

```sh
 $ git pull origin Development
```

then install all dependencies :

```sh
 $ yarn # npm install
```

## Running the application

Access the project folder and run the following command:

### Run Storybook

```bash
$ yarn storybook # npm run storybook
```

## Run tests

```bash
yarn test # npm run test
```

## Build Storybook

```bash
yarn storybook:export # npm run storybook:export
```

## Build Project

```bash
yarn prepublishOnly # npm run prepublishOnly
```



## Coding Conventions

- Interfaces for React Components have to be named (ComponentName)Props
  - e.g - Component `const App = ({text}) => <div>{text}</div>`
  - e.g - Interface `interface AppProps { text: string }`
- All other Interfaces should be CamelCase version of the name of the function or object
- Only add the prefix I if there is no other Choice
  - e.g - Function `addStyles() => {}`
  - e.g - Interface `interface AddStyles {}`
- Do not use the type any, opt for unknown.
- Limit the use of classes but instead opt for pure single purpose functions.
- Rely on composability to deal with complexity
- Prefer Async/Await syntax over .chain with then.catch
- Separation of concerns in React
  - Defer logic to hooks and HOCs
  - Page state should be stored in a context API
  - Local state should be stored in component
  - Keep components as simple as possible so they can be more modular

## How to make a Commit

To make a commit must be used a following rule:

`git commit -m "*type*: commit-message"`

- Where type is: [ `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test` ]
- And commit-message must be written in lower-case.
  - e.g - `git commit -m"feat: set up eslint"`

## How to Contribute

- Fetch/Pull the Develop Branch
- Create a Branch based on your issue name
  - e.g - Branch name is task/mc-(number)
  - e.g - Branch name is bug/mc-(number)
- Once done push your branch to origin and submit a PR to the Develop branch for review
  - e.g - `git push origin task/mc-(number)`

## License

MIT © [Abastece-aí](https://gitlab.eai.com.br/)

# Abastece-ui

