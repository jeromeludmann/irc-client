import { all, call } from 'redux-saga/effects'
import * as SocketEffects from '@app/effects/socket'
import * as ParserEffects from '@app/effects/parser'
import * as RegisterEffects from '@app/effects/register'
import * as PingReplyEffects from '@app/effects/pingReply'
import * as CommandEffects from '@app/effects/command'
import * as UiEffects from '@app/effects/ui'
import * as LagEffects from '@app/effects/lag'

export function* watch() {
  yield all([
    call(ParserEffects.watch),
    call(SocketEffects.watch),
    call(PingReplyEffects.watch),
    call(RegisterEffects.watch),
    call(CommandEffects.watch),
    call(LagEffects.watch),
    call(UiEffects.watch),
  ])
}
