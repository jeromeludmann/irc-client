import { createStore, applyMiddleware } from 'redux'
import { reduceRoot } from '@app/reducers'
import { messageParser } from '@app/middlewares/messageParser'
import { commandHandler } from '@app/middlewares/commandHandler'
import { socketHandler } from '@app/middlewares/socketHandler'
import { BufferKey } from '@app/Route'
import { serverInitialState } from '@app/reducers/server'
import { autoRouter } from '@app/middlewares/autoRouter'
import { lag } from '@app/middlewares/lag'
import { pingPong } from '@app/middlewares/pingPong'
import { register } from '@app/middlewares/register'
import { logger } from '@app/middlewares/logger'
import { ui } from '@app/middlewares/ui'

export const getStore = (serverKey: string) =>
  createStore(
    reduceRoot,
    {
      servers: { [serverKey]: serverInitialState },
      route: { serverKey, bufferKey: BufferKey.STATUS },
    },
    // be careful with the order of the middlewares
    applyMiddleware(
      messageParser, // keep first
      autoRouter,
      lag,
      pingPong,
      register,
      commandHandler,
      ui,
      socketHandler, // keep just before logger
      logger, // keep last
    ),
  )
