import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reduceRoot, rootInitialState } from '@app/state/root/reducer'
import { router } from '@app/middlewares/router'
import { logger } from '@app/middlewares/logger'
import { server } from '@app/effects/server'
import { parser } from '@app/effects/parser'
import { register } from '@app/effects/register'
import { pingReply } from '@app/effects/pingReply'
import { command } from '@app/effects/command'
import { ui } from '@app/effects/ui'
import { lag } from '@app/effects/lag'

const effects = createSagaMiddleware()

export const store = createStore(
  reduceRoot,
  rootInitialState,
  applyMiddleware(router, effects, logger),
)

effects.run(parser)
effects.run(server)
effects.run(pingReply)
effects.run(register)
effects.run(command)
effects.run(lag)
effects.run(ui)
