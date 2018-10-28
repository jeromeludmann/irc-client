import { createSelector } from 'reselect'
import { getServers } from '@app/state/root/selectors'
import { getRoute } from '@app/state/route/selectors'

export function getServerSelector(serverKey?: string) {
  return createSelector(
    getServers,
    getRoute,
    (servers, route) => servers[serverKey || route.serverKey],
  )
}

export function getBuffers(serverKey?: string) {
  return createSelector(getServerSelector(serverKey), server => server.buffers)
}
