import { createSelector } from 'reselect'
import { selectBuffer } from '@app/state/buffer/selectors'

export const selectInput = createSelector(
  selectBuffer,
  channel => channel.input,
)

export const selectInputValue = createSelector(
  selectInput,
  input => input.value,
)

export const selectInputDirtyValue = createSelector(
  selectInput,
  input => input.dirtyValue,
)

export const selectInputHistory = createSelector(
  selectInput,
  input => input.history,
)
