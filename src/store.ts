import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reduceRoot, rootInitialState } from '@app/state/root/reducer'
import { autoRouter } from '@app/middlewares/autoRouter'
import { lag } from '@app/middlewares/lag'
import { logger } from '@app/middlewares/logger'
import { socket } from '@app/effects/socket'
import { parser } from '@app/effects/parser'
import { recognition } from '@app/effects/recognition'
import { pingReply } from '@app/effects/pingReply'
import { commands } from '@app/effects/commands'
import { window } from '@app/effects/window'

const workers = createSagaMiddleware({
  context: { sockets: {} },
})

export const store = createStore(
  reduceRoot,
  rootInitialState,
  applyMiddleware(autoRouter, lag, workers, logger),
)

workers.run(socket)
workers.run(parser)
workers.run(recognition)
workers.run(pingReply)
workers.run(commands)
workers.run(window)
