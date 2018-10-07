import { createSelector } from 'reselect'
import { getBuffers } from '@app/state/server/selectors'
import { getRoute } from '@app/state/route/selectors'

export const getBuffer = createSelector(
  getBuffers,
  getRoute,
  (buffers, route) => buffers[route.bufferKey],
)

export const getActivity = createSelector(getBuffer, buffer => buffer.activity)
