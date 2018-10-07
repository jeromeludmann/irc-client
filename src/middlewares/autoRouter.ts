import { Store, Dispatch, AnyAction } from 'redux'
import { getRoute } from '@app/state/route/selectors'

export function autoRouter(store: Store) {
  return (next: Dispatch) => (action: AnyAction) => {
    if (!('route' in action)) {
      action.route = getRoute(store.getState())
    }

    next(action)
  }
}
