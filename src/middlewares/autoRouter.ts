import { Store, Dispatch, AnyAction } from 'redux'
import { selectRoute } from '@app/state/route/selectors'

export function autoRouter(store: Store) {
  return (next: Dispatch) => (action: AnyAction) => {
    if (!('route' in action)) {
      action.route = selectRoute(store.getState())
    }

    next(action)
  }
}
