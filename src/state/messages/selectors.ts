import { createSelector } from 'reselect'
import { getBufferFactory } from '@app/state/buffer/selectors'
import { Route } from '@app/utils/Route'

export function getMessages(route?: Route) {
  return createSelector(getBufferFactory(route), buffer => buffer.messages)
}
