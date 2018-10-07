import { createSelector } from 'reselect'
import { getServers } from '@app/state/root/selectors'
import { getRoute } from '@app/state/route/selectors'

export const getServer = createSelector(
  getServers,
  getRoute,
  (servers, { serverKey }) => servers[serverKey],
)

export const getServerName = createSelector(getServer, server => server.name)

export const getUser = createSelector(getServer, server => server.user)

export const getServerLag = createSelector(getServer, server => server.lag)

export const getUserModes = createSelector(
  getServer,
  server => server.modes.user,
)

export const getAvailableModes = createSelector(
  getServer,
  server => server.modes.available,
)

export const getBuffers = createSelector(getServer, server => server.buffers)
