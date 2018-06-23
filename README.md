```
.______________________   _________ .__  .__               __
|   \______   \_   ___ \  \_   ___ \|  | |__| ____   _____/  |_
|   ||       _/    \  \/  /    \  \/|  | |  |/ __ \ /    \   __\
|   ||    |   \     \____ \     \___|  |_|  \  ___/|   |  \  |  
|___||____|_  /\______  /  \______  /____/__|\___  >___|  /__|  
            \/        \/          \/             \/     \/
```

Simple IRC client written in [TypeScript](https://github.com/Microsoft/TypeScript) and made with [React](https://github.com/facebook/react), [Redux](https://github.com/reduxjs/redux) and [Node.js](https://github.com/nodejs/node).

Currently packaged with [Electron](https://github.com/electron/electron).

# Documentation

- [Get ready](#get-ready)
  - [Set up project](#set-up-project)
  - [Start to develop](#start-to-develop)
- [Organize reducers folder](#organize-reducers-folder)
  - [Keep folder structure flat](#keep-folder-structure-flat)
  - [Keep reducers and selectors together](#keep-reducers-and-selectors-together)

# Get ready

Install [Node.js](https://nodejs.org/) first.

## Set up project

```sh
git clone https://github.com/jeromeludmann/irc-client
cd irc-client
npm install
```

## Start to develop

Two ways to work:

- using [npm](#npm)
- or [with Docker](#with-docker)

### npm

Run compilation process:

```sh
npm run watch
```

Then run the app:

```sh
npm start
```

### with Docker

It's not required but it make development easier.

This command allows you to run both compilation process and local IRC server:

Make sure you have [Docker](https://www.docker.com/) installed and just run:

```sh
./dc up
```

# Organize reducers folder

Two rules to follow:

## Keep folder structure flat

In order to easily search reducer files, it's better to have a flat folder structure.

If a reducer file named `/reducers/server/channel.ts` exports a reducer that calls nested reducers (like `messages` and `input`), as below:

```
reducers
└── server
    ├── channel.ts      <- also contains messages and input reducers
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
│   ├── input.ts        <- extracted reducer from channel
│   └── messages.ts     <- extracted reducer from channel
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
    ├── _selectors.ts    <- also contains all channel related selectors
    ├── index.ts
    ├── input.ts
    └── messages.ts
```
