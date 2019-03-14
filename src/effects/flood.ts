import { Action } from 'redux'
import { channel, Channel, buffers } from 'redux-saga'
import { fork, take, call, actionChannel, put, delay } from 'redux-saga/effects'
import { Predicate } from '@redux-saga/types'
import { setFlood } from '@app/actions/flood'
import { getCurrentTime } from '@app/utils/time'
import { push, shift } from '@app/utils/array'

export interface AntiFloodParameters {
  threshold: {
    number: number
    duration: number
  }
  slowDown: number
  refresh: number
}

export function* createAntiFloodChannel(
  predicate: Predicate<Action>,
  parameters: AntiFloodParameters,
) {
  try {
    console.log('[started] flood/createAntiFloodChannel')

    const antiFloodChannel = yield call(channel)
    yield fork(runAntiFlood, antiFloodChannel, predicate, parameters)

    return antiFloodChannel
  } finally {
    console.log('[ended] flood/createAntiFloodChannel')
  }
}

export function* runAntiFlood(
  antiFloodChannel: Channel<Action>,
  predicate: Predicate<Action>,
  parameters: AntiFloodParameters,
) {
  console.log('[started] flood/runAntiFlood')

  const times = new Array<number>(parameters.threshold.number).fill(0)

  yield fork(
    delayActionDispatching,
    antiFloodChannel,
    predicate,
    parameters,
    times,
  )

  // yield fork(notifyFloodStatus, parameters, times)

  console.log('[ended] flood/runAntiFlood')
}

export function* delayActionDispatching(
  antiFloodChannel: Channel<Action>,
  predicate: Predicate<Action>,
  parameters: AntiFloodParameters,
  times: number[],
) {
  console.log('[started] flood/delayActionDispatching')

  const bufferedChannel = yield actionChannel(predicate, buffers.expanding(10))

  try {
    while (true) {
      const action = yield take(bufferedChannel)
      const now = yield call(getCurrentTime)

      if (now - times[0] < parameters.threshold.duration) {
        yield delay(parameters.slowDown)
      }

      yield call(push, times, now)

      if (times.length > parameters.threshold.number) {
        yield call(shift, times)
      }

      yield put(antiFloodChannel, action)
    }
  } finally {
    console.log('[ended] flood/delayActionDispatching')
  }
}

export function* notifyFloodStatus(
  parameters: AntiFloodParameters,
  times: number[],
) {
  console.log('[started] flood/updateFloodStatus')

  let flood = false

  function* setFloodStatus(active: boolean) {
    if (flood === active) {
      return
    }

    yield put(setFlood(active))

    flood = active
  }

  try {
    while (true) {
      yield delay(parameters.refresh)
      const now = yield call(getCurrentTime)
      const diff = now - times[0]
      const active = diff < parameters.threshold.duration
      yield* setFloodStatus(active)
    }
  } finally {
    console.log('[ended] flood/updateFloodStatus')
  }
}
