import { all, call } from 'redux-saga/effects'
import { socket } from '@app/effects/socket'
import { parser } from '@app/effects/parser'
import { register } from '@app/effects/register'
import { pingReply } from '@app/effects/pingReply'
import { command } from '@app/effects/command'
import { ui } from '@app/effects/ui'
import { lag } from '@app/effects/lag'

export function* effects() {
  yield all([
    call(parser),
    call(socket),
    call(pingReply),
    call(register),
    call(command),
    call(lag),
    call(ui),
  ])
}
