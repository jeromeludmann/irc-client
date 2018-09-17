import { Middleware } from 'redux'
import { RootState } from '@app/reducers'
import { selectRoute } from '@app/reducers/route';

/**
 * Action Auto Router Middleware
 *
 * Add a route on an action if it does not have one yet.
 * Useful to ensure that an action will always be routed in the reducers.
 */
export const autoRouter: Middleware<{}, RootState> = ({
  getState,
}) => next => action => {
  if (!('route' in action)) {
    action.route = selectRoute(getState())
  }

  next(action)
}
