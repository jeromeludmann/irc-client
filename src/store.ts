import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reduceRoot, rootInitialState } from '@app/state/root/reducer'
import { router } from '@app/middlewares/router'
import { logger } from '@app/middlewares/logger'
import { effects } from '@app/effects'

const saga = createSagaMiddleware()

export const store = createStore(
  reduceRoot,
  rootInitialState,
  applyMiddleware(router, saga, logger),
)

saga.run(effects)
