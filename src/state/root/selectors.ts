import { RootState } from '@app/state/root/reducer'
import { ServerState } from '@app/state/server/reducer'

export const selectServers = ({
  servers,
}: RootState): {
  [key: string]: ServerState
} => servers
