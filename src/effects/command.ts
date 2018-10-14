import { takeEvery, put, select } from 'redux-saga/effects'
import { ENTER_INPUT_VALUE, EnterInputValueAction } from '@app/actions/ui'
import { isStatus, isRaw } from '@app/utils/Route'
import { commands } from '@app/actions/commands'
import { getRoute } from '@app/state/route/selectors'
import { RouteState } from '@app/state/route/reducer'

export function* command() {
  yield takeEvery(ENTER_INPUT_VALUE, parseCommand)
}

function* parseCommand(action: EnterInputValueAction) {
  const route: RouteState = yield select(getRoute)
  const { bufferKey } = route

  const value = action.payload.value
  const parsedCommand = value.match(/^\s*\/(\S+)(?:\s+)?(.*)?/)

  if (!parsedCommand) {
    if (!isStatus(bufferKey) && !isRaw(bufferKey)) {
      yield put(commands.msg.callback(route, bufferKey as string, value))
    } else {
      console.warn(`Not a channel or private: "${bufferKey}"`)
    }
    return
  }

  const commandName = parsedCommand[1].toLowerCase()
  const params = parsedCommand[2] || ''

  if (!(commandName in commands)) {
    console.warn(`Command not found: "${commandName}"`)
    yield put(commands.help.callback(route))
    return
  }

  const currentCommand = commands[commandName]
  const parsedParams = params.match(currentCommand.regexp)

  if (!parsedParams) {
    console.warn(`Command found but bad params provided: "${params}"`)
    yield put(commands.help.callback(route, commandName))
    return
  }

  yield put(currentCommand.callback(route, ...parsedParams.slice(1)))
}
