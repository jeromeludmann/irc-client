import { RootState } from '@app/state/root/reducer'
import { ServerState } from '@app/state/server/reducer'

export function getServers(
  state: RootState,
): {
  [key: string]: ServerState
} {
  return state.servers
}
