import { Action } from 'redux'
import { CHANNEL_REGEXP } from '@app/utils/helpers'

export interface Route {
  serverKey: string
  bufferKey: string
}

export interface RoutedAction<T = string> extends Action<T> {
  route: Route
}

export const BufferKey = {
  STATUS: '@status',
  RAW: '@raw',
  ALL: '@all',
  ACTIVE: '@active',
  NONE: '@none',
}
export const isRaw = (key: string) => key === BufferKey.RAW

export const isStatus = (key: string) => key === BufferKey.STATUS

export const isChannel = (key: string) => CHANNEL_REGEXP.test(key)

export const isPrivate = (key: string) =>
  !isRaw(key) && !isStatus(key) && !isChannel(key)
