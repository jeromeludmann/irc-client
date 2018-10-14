import { RootState } from '@app/state/root/reducer'

export function getServers(state: RootState) {
  return state.servers
}

export function getServerKeys(state: RootState) {
  return Object.keys(state.servers)
}
