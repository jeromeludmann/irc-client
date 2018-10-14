import { Middleware } from 'redux'
import { getRoute } from '@app/state/route/selectors'

export const router: Middleware = store => next => action => {
  if (!('route' in action)) {
    action.route = getRoute(store.getState())
  }

  next(action)
}
