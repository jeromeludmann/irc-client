import { createSelector } from 'reselect'
import { selectBuffer } from '@app/state/buffer/selectors'

export const selectMessages = createSelector(
  selectBuffer,
  buffer => buffer.messages,
)
