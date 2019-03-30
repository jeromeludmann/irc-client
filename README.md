```
.______________________   _________ .__  .__               __
|   \______   \_   ___ \  \_   ___ \|  | |__| ____   _____/  |_
|   ||       _/    \  \/  /    \  \/|  | |  |/ __ \ /    \   __\
|   ||    |   \     \____ \     \___|  |_|  \  ___/|   |  \  |
|___||____|_  /\______  /  \______  /____/__|\___  >___|  /__|
            \/        \/          \/             \/     \/
                RFC 1459/2812 client protocol
```

[![Build Status](https://travis-ci.org/jeromeludmann/irc-client.svg?branch=develop)](https://travis-ci.org/jeromeludmann/irc-client)
[![Coverage Status](https://coveralls.io/repos/github/jeromeludmann/irc-client/badge.svg?branch=develop)](https://coveralls.io/github/jeromeludmann/irc-client?branch=develop)

Written in [TypeScript](https://github.com/Microsoft/TypeScript).

Made with [React](https://github.com/facebook/react), [Redux](https://github.com/reduxjs/redux) [(Saga)](https://github.com/redux-saga/redux-saga), [Styled Components](https://github.com/styled-components/styled-components), [Node](https://github.com/nodejs/node) and [Electron](https://github.com/electron/electron).

# Developer documentation

- [Get ready](#get-ready)
  - [Prerequisites](#prerequisites)
  - [Project installation](#project-installation)
- [Development workflow](#development-workflow)
  - [Tasks](#tasks)
  - [Run a local ircd](#run-a-local-ircd)
- [Work in progress](#work-in-progress)
  - [Commands](#commands)
  - [Messages](#messages)
  - [UI behaviors](#ui-behaviors)
  - [UI themes](#ui-themes)
  - [Tests](#tests)
  - [Performances](#performances)
- [Codebase best practices](#codebase-best-practices)
  - [Keep reducer folder structure flat](#keep-reducer-folder-structure-flat)
  - [Keep reducers and selectors together](#keep-reducers-and-selectors-together)
  - [UI theming](#ui-theming)

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

| task                                   | command                       |
| -------------------------------------- | ----------------------------- |
| Run compilation                        | `npm run build`               |
| Run compilation in watch mode          | `npm run build:watch`         |
| Run unit tests                         | `npm run test`                |
| Run unit tests in watch mode           | `npm run test:watch`          |
| Open a browser and check test coverage | `npm run test:check-coverage` |
| Start the application                  | `npm start`                   |

## Run a local ircd

First make sure you have [Docker installed](https://www.docker.com/).

This command below allows you to run a local ircd on your machine:

```sh
./ircd up
```

It will be accessible from **localhost** port **6667**.

For instance, after running the app, you can connect it with `/connect localhost`.

# Work in progress

## Commands

|     | name          | description |
| --- | ------------- | ----------- |
|     | `/away`       |             |
| ✔   | `/close`      |             |
| ✔   | `/connect`    |             |
| ✔   | `/disconnect` |             |
| ✔   | `/help`       |             |
| ✔   | `/join`       |             |
|     | `/kick`       |             |
|     | `/mode`       |             |
| ✔   | `/msg`        |             |
| ✔   | `/nick`       |             |
| ✔   | `/part`       |             |
| ✔   | `/ping`       |             |
|     | `/query`      |             |
| ✔   | `/quit`       |             |
| ✔   | `/raw`        |             |
| ✔   | `/server`     |             |
|     | `/topic`      |             |
|     | `/who`        |             |
|     | `/whois`      |             |

## Messages

|     | command | description        | origin  |
| --- | ------- | ------------------ | ------- |
| ✔   | JOIN    |                    | RFC1459 |
| ✔   | ERROR   |                    | RFC1459 |
| ✔   | NICK    |                    | RFC1459 |
| ✔   | NOTICE  |                    | RFC1459 |
| ✔   | PART    |                    | RFC1459 |
| ✔   | PING    |                    | RFC1459 |
| ✔   | PRIVMSG |                    | RFC1459 |
|     | 001     | RPL_WELCOME        | RFC2812 |
|     | 002     | RPL_YOURHOST       | RFC2812 |
|     | 003     | RPL_CREATED        | RFC2812 |
| ✔   | 004     | RPL_MYINFO         | RFC2812 |
|     | 332     | RPL_TOPIC          | RFC1459 |
|     | 333     | RPL_TOPICWHOTIME   | ircu    |
|     | 421     | ERR_UNKNOWNCOMMAND | RFC1459 |

## UI behaviors

- Auto scroll on message receiving
- Auto focus input on window switching
- Set caret after the last character on back/forward input history
- Nicklist full implementation (actions, reducers, components)

## UI themes

- Add one and make it themable

## Tests

- Add additional tests for sagas

## Performances

- Buffer messages by limiting nodes in DOM in order to avoid performance issues

# Codebase best practices

Project recommendation and best practices.

_WIP_

## Keep reducers and selectors together

Since they are tightly coupled, keep reducers and related selectors together:

```
state
├── route
│   ├── reducer.ts
│   └── selectors.ts
└── server
    ├── reducer.ts
    └── selectors.ts
```

## UI theming

_WIP_
