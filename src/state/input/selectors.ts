import { createSelector } from 'reselect'
import { getBuffer } from '@app/state/buffer/selectors'
import { Route } from '@app/utils/Route'

export function getInput(route?: Route) {
  return createSelector(getBuffer(route), channel => channel.input)
}

export function getInputValue(route?: Route) {
  return createSelector(getInput(route), input => input.value)
}
