import { createSelector } from 'reselect'
import { getBuffer } from '@app/state/buffer/selectors'

export const getInput = createSelector(getBuffer, channel => channel.input)

export const getInputValue = createSelector(getInput, input => input.value)

export const getInputDirtyValue = createSelector(
  getInput,
  input => input.dirtyValue,
)

export const getInputHistory = createSelector(getInput, input => input.history)
