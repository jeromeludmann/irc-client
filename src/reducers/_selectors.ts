import { createSelector } from 'reselect'
import { RootState } from '@app/reducers'
import { RouteState } from '@app/reducers/route'
import { ServerState } from '@app/reducers/server'

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

export const selectUser = createSelector(selectServer, server => server.user)

export const selectBuffer = createSelector(
  selectServer,
  selectRoute,
  (server, active) => server.buffers[active.bufferKey],
)

export const selectMessages = createSelector(
  selectBuffer,
  channel => channel.messages,
)

export const selectInput = createSelector(
  selectBuffer,
  channel => channel.input,
)

export const selectValue = createSelector(selectInput, input => input.value)
