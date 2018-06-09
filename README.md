```
██╗██████╗  ██████╗     ██████╗██╗     ██╗███████╗███╗   ██╗████████╗
██║██╔══██╗██╔════╝    ██╔════╝██║     ██║██╔════╝████╗  ██║╚══██╔══╝
██║██████╔╝██║         ██║     ██║     ██║█████╗  ██╔██╗ ██║   ██║
██║██╔══██╗██║         ██║     ██║     ██║██╔══╝  ██║╚██╗██║   ██║
██║██║  ██║╚██████╗    ╚██████╗███████╗██║███████╗██║ ╚████║   ██║
╚═╝╚═╝  ╚═╝ ╚═════╝     ╚═════╝╚══════╝╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝
```

Simple IRC client written in [TypeScript](https://github.com/Microsoft/TypeScript) and made with [React](https://github.com/facebook/react), [Redux](https://github.com/reduxjs/redux) and [Electron](https://github.com/electron/electron).

# Summary

- [How to get ready to develop](#how-to-get-ready-to-develop)
- [How to organize state folder](#how-to-organize-state-folder)
  - [Keep folder structure flat](#keep-folder-structure-flat)
  - [Keep reducers and selectors together](#keep-reducers-and-selectors-together)

# How to get ready to develop

```sh
git clone https://github.com/jeromeludmann/irc-client
cd irc-client
npm install
```

Make sure you have Docker installed.

Then run webpack + ircd:

```sh
./dc up
```

and run the app:

```sh
npm start
```

# How to organize state folder

Two rules to follow:

## Keep folder structure flat

In order to easily search reducer files, it's better to have a flat folder structure.

If a reducer file named `/src/state/channel/input.ts` export a _combined reducer_ containing nested reducers like `value` and `history`:

- create a dedicated folder `/src/state/input/`
- move `/src/state/channel/input.ts` to `/src/state/input/index.ts`
- extract its own nested reducers and put them in `/src/state/input/`

Result:

- `/src/state/channel/`
  - `index.ts`
  - `selectors.ts` (channel selectors)
  - `messages.ts`
  - `unread.ts`
- `/src/state/input/`
  - `index.ts`
  - `value.ts`
  - `history.ts`

## Keep reducers and selectors together

Since they are tightly coupled, it is needed to keep reducers and selectors together.

If a reducer file named `/src/state/server/channel-router.ts` has its own selectors:

- create a dedicated folder `/src/state/server/channel-router/`
- move `/src/state/server/channel-router.ts` to `/src/state/server/channel-router/index.ts`
- extract its own selectors and put them in `/src/state/server/channel-router/`

It should look like that:

- `/src/state/server/`
  - `channel-router/`
    - `index.ts`
    - `selectors.ts` (channel-router selectors)
  - `index.ts`
  - `modes.ts`
  - `selectors.ts` (server selectors)
