```
.______________________   _________ .__  .__               __
|   \______   \_   ___ \  \_   ___ \|  | |__| ____   _____/  |_
|   ||       _/    \  \/  /    \  \/|  | |  |/ __ \ /    \   __\
|   ||    |   \     \____ \     \___|  |_|  \  ___/|   |  \  |  
|___||____|_  /\______  /  \______  /____/__|\___  >___|  /__|  
            \/        \/          \/             \/     \/
                RFC 1459/2812 client protocol
```

Written in [TypeScript](https://github.com/Microsoft/TypeScript).

Made with [React](https://github.com/facebook/react), [Redux](https://github.com/reduxjs/redux), [Node.js](https://github.com/nodejs/node), [Styled Components](https://github.com/styled-components/styled-components) and [Electron](https://github.com/electron/electron).

# Developer documentation

- [Get ready](#get-ready)
  - [Prerequisites](#prerequisites)
  - [Project installation](#project-installation)
- [Development workflow](#development-workflow)
  - [Tasks](#tasks)
  - [Run a local ircd](#run-a-local-ircd)
- [Organize codebase](#organize-codebase)
  - [Keep reducer folder structure flat](#keep-reducer-folder-structure-flat)
  - [Keep reducers and selectors together](#keep-reducers-and-selectors-together)
  - [UI theming](#ui-theming)
- [Work in progress](#work-in-progress)

# Get ready

## Prerequisites

Install [Node.js](https://nodejs.org/) first.

For a better developer experience, it would be better to have [Docker installed](https://www.docker.com/) (but it's not required).

## Project installation

```sh
git clone https://github.com/jeromeludmann/irc-client
cd irc-client
npm install
```

_Note that `npm install` will also generate coverage report._

# Development workflow

## Tasks

| task                                   | command                  |
| -------------------------------------- | ------------------------ |
| Run compilation                        | `npm run build`          |
| Run compilation in watch mode          | `npm run build:watch`    |
| Run unit tests                         | `npm run test`           |
| Run unit tests in watch mode           | `npm run test:watch`     |
| Run unit tests and generate coverage   | `npm run test:coverage`  |
| Run the application                    | `npm start`              |
| Open a browser and check test coverage | `npm run check-coverage` |

## Run a local ircd

First make sure you have [Docker installed](https://www.docker.com/).

This command below allows you to run a local ircd on your machine:

```sh
./dc up
```

It will be accessible from **localhost** port **6667**.

For instance, after running the app, you can connect it with `/connect localhost`.

# Organize codebase

Project recommendation and best practices.

## Keep reducer folder structure flat

In order to easily search reducer files, it's better to have a flat folder structure.

If a reducer file named `/reducers/server/channel.ts` exports a reducer that calls nested reducers (like `messages` and `input`), as below:

```
reducers
└── server
    ├── channel.ts <- also contains messages and input reducers
    ├── index.ts
    ├── modes.ts
    └── channels.ts
```

in this case, nested reducers contained in `channel.ts` should be splitted by following these steps:

1.  create a dedicated folder `/reducers/channel/`
2.  move `/reducers/server/channel.ts` to `/reducers/channel/index.ts`
3.  extract its own nested reducers (`messages.ts` and `input.ts`) and put them in `/reducers/channel/`

The expected folder structure should look like that:

```
reducers
├── channel
│   ├── index.ts
│   ├── input.ts    <- extracted reducer from channel
│   └── messages.ts <- extracted reducer from channel
└── server
    ├── index.ts
    ├── modes.ts
    └── channels.ts
```

## Keep reducers and selectors together

Since they are tightly coupled, it is needed to keep reducers and related selectors together.

For instance, a `channel` reducer has its related selectors in its own folder:

```
reducers
└── channel
    ├── _selectors.ts <- also contains all channel related selectors
    ├── index.ts
    ├── input.ts
    └── messages.ts
```

## UI theming

TO DO

# Work in progress

## Messages

|     | code | name             | origin  |
| --- | ---- | ---------------- | ------- |
|     | 332  | RPL_TOPIC        | RFC1459 |
|     | 333  | RPL_TOPICWHOTIME | ircu    |

## Commands

|     | name       | description |
| --- | ---------- | ----------- |
| x   | close      |             |
| x   | connect    |             |
| x   | disconnect |             |
| x   | help       |             |
| x   | join       |             |
|     | kick       |             |
|     | mode       |             |
| x   | msg        |             |
| x   | part       |             |
|     | query      |             |
| x   | quit       |             |
| x   | raw        |             |
|     | topic      |             |
|     | who        |             |
|     | whois      |             |

## UI behaviors

- Auto scroll on message receiving
- Auto focus input on window switching
- Nicklist full implementation (actions, reducers, components)

## UI themes

- Add one and make it themable

## Tests

- Storybook

## Performances

- Bufferize messages by limiting nodes in DOM in order to avoid performance issues
