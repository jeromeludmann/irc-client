import { createSelector } from 'reselect'
import { selectBuffers } from '@app/state/server/selectors'
import { selectRoute } from '@app/state/route/selectors'

export const selectBuffer = createSelector(
  selectBuffers,
  selectRoute,
  (buffers, route) => buffers[route.bufferKey],
)

export const selectActivity = createSelector(
  selectBuffer,
  buffer => buffer.activity,
)
