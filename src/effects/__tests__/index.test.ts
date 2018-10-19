import { effects } from '..'
import { all, call } from 'redux-saga/effects'
import { parser } from '../parser'
import { socket } from '../socket'
import { pingReply } from '../pingReply'
import { register } from '../register'
import { command } from '../command'
import { lag } from '../lag'
import { ui } from '../ui'

describe('root effects', () => {
  const gen = effects()

  it('should run all effects', () => {
    expect(gen.next().value).toEqual(
      all([
        call(parser),
        call(socket),
        call(pingReply),
        call(register),
        call(command),
        call(lag),
        call(ui),
      ]),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})
