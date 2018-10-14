import { Dispatch, AnyAction } from 'redux'
import { UPDATE_INPUT_VALUE } from '@app/actions/ui'

const excluded = [UPDATE_INPUT_VALUE]

export function logger() {
  return (next: Dispatch) => (action: AnyAction) => {
    if (!excluded.includes(action.type)) {
      console.log(`%c ${JSON.stringify(action)}`, stylize(action.type))
    }

    next(action)
  }
}

function stylize(type: string) {
  if (type.startsWith('MESSAGE/SEND_')) {
    return 'color: red'
  }

  if (type.startsWith('MESSAGE/')) {
    return 'color: blue'
  }

  if (type.startsWith('SOCKET/')) {
    return 'color: lightgray'
  }

  if (type.startsWith('UI/')) {
    return 'color: lightgreen'
  }

  return 'color: black'
}
