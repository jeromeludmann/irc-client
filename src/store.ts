import { createStore, applyMiddleware } from 'redux'
import { messageParser } from '@app/middlewares/messageParser'
import { commandHandler } from '@app/middlewares/commandHandler'
import { socketHandler } from '@app/middlewares/socketHandler'
import { autoRouter } from '@app/middlewares/autoRouter'
import { lag } from '@app/middlewares/lag'
import { pingPong } from '@app/middlewares/pingPong'
import { register } from '@app/middlewares/register'
import { logger } from '@app/middlewares/logger'
import { windowHandler } from '@app/middlewares/windowHandler'
import { reduceRoot, rootInitialState } from '@app/state/root/reducer'

export const store = createStore(
  reduceRoot,
  rootInitialState,
  applyMiddleware(
    messageParser, // keep first
    autoRouter,
    lag,
    pingPong,
    register,
    commandHandler,
    windowHandler,
    socketHandler, // keep just before logger
    logger, // keep last
  ),
)
