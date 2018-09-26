import { createSelector } from 'reselect'
import { selectServers } from '@app/state/root/selectors'
import { selectRoute } from '@app/state/route/selectors'

export const selectServer = createSelector(
  selectServers,
  selectRoute,
  (servers, { serverKey }) => servers[serverKey],
)

export const selectServerName = createSelector(
  selectServer,
  server => server.name,
)

export const selectUser = createSelector(selectServer, server => server.user)

export const selectServerLag = createSelector(
  selectServer,
  server => server.lag,
)

export const selectUserModes = createSelector(
  selectServer,
  server => server.modes.user,
)

export const selectAvailableModes = createSelector(
  selectServer,
  server => server.modes.available,
)

export const selectBuffers = createSelector(
  selectServer,
  server => server.buffers,
)
