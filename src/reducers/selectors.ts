import { createSelector } from 'reselect'
import { RootState } from '@app/reducers'
import { ServerState } from '@app/reducers/server'
import { RouteState } from '@app/reducers/route'

export const selectServers = ({
  servers,
}: RootState): {
  [key: string]: ServerState
} => servers

export const selectRoute = ({ route }: RootState): RouteState => route

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

export const selectBuffer = createSelector(
  selectBuffers,
  selectRoute,
  (buffers, route) => buffers[route.bufferKey],
)

export const selectActivity = createSelector(
  selectBuffer,
  buffer => buffer.activity,
)

export const selectInput = createSelector(
  selectBuffer,
  channel => channel.input,
)

export const selectInputValue = createSelector(
  selectInput,
  input => input.value,
)

export const selectInputDirtyValue = createSelector(
  selectInput,
  input => input.dirtyValue,
)

export const selectInputHistory = createSelector(
  selectInput,
  input => input.history,
)

export const selectMessages = createSelector(
  selectBuffer,
  buffer => buffer.messages,
)
