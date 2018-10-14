import { createSelector } from 'reselect'
import { getBuffer } from '@app/state/buffer/selectors'
import { Route } from '@app/utils/Route'

export function getMessages(route?: Route) {
  return createSelector(getBuffer(route), buffer => buffer.messages)
}
