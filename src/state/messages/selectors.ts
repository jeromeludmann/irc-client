import { createSelector } from 'reselect'
import { getBuffer } from '@app/state/buffer/selectors'

export const getMessages = createSelector(getBuffer, buffer => buffer.messages)
