import { RootState } from '@app/state/root/reducer'
import { RouteState } from '@app/state/route/reducer'

export function getRoute(state: RootState): RouteState {
  return state.route
}
