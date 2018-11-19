export const SET_FLOOD_ON = 'FLOOD/ON'
export const SET_FLOOD_OFF = 'FLOOD/OFF'

export function setFlood(active: boolean) {
  return {
    type: active ? SET_FLOOD_ON : SET_FLOOD_OFF,
  }
}
