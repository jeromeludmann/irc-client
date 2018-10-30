import { createSelector } from 'reselect'
import { getServers } from '@app/state/root/selectors'
import { getRoute } from '@app/state/route/selectors'

export function getServerFactory(serverKey?: string) {
  return createSelector(
    getServers,
    getRoute,
    (servers, route) => servers[serverKey || route.serverKey],
  )
}

export function getBuffers(serverKey?: string) {
  return createSelector(getServerFactory(serverKey), server => server.buffers)
}
