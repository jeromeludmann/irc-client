import { takeEvery, put, select } from 'redux-saga/effects'
import { ENTER_INPUT_VALUE, EnterInputValueAction } from '@app/actions/ui'
import { isChannel } from '@app/utils/Route'
import { commandRegistry } from '@app/actions/commands'
import { getRoute } from '@app/state/route/selectors'
import { RouteState } from '@app/state/route/reducer'

export function* command() {
  yield takeEvery(ENTER_INPUT_VALUE, parseCommand)
}

export function* parseCommand(action: EnterInputValueAction) {
  const route: RouteState = yield select(getRoute)
  const { bufferKey } = route

  const value = action.payload.value
  const parsedCommand = value.match(/^\s*\/(\S+)(?:\s+)?(.*)?/)

  if (!parsedCommand) {
    if (isChannel(bufferKey)) {
      yield put(commandRegistry.msg.callback(route, bufferKey, value))
    } else {
      console.log(`Not a channel or private: "${bufferKey}"`)
    }
    return
  }

  const commandName = parsedCommand[1].toLowerCase()
  const params = parsedCommand[2] || ''

  if (!(commandName in commandRegistry)) {
    console.log(`Command not found: "${commandName}"`)
    yield put(commandRegistry.help.callback(route))
    return
  }

  const parsedParams = params.match(commandRegistry[commandName].regexp)

  if (!parsedParams) {
    console.log(`Command found but bad params provided: "${params}"`)
    yield put(commandRegistry.help.callback(route, commandName))
    return
  }

  yield put(
    commandRegistry[commandName].callback(route, ...parsedParams.slice(1)),
  )
}
