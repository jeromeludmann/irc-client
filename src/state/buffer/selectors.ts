import { createSelector } from 'reselect'
import { getBuffers } from '@app/state/server/selectors'
import { getRoute } from '@app/state/route/selectors'
import { Route } from '@app/utils/Route'

export function getBuffer(route?: Route) {
  return createSelector(
    getBuffers(route ? route.serverKey : undefined),
    getRoute,
    (buffers, currentRoute) =>
      buffers[route ? route.bufferKey : currentRoute.bufferKey],
  )
}
