import { command, parseCommand } from '../command'
import { enterInputValue, ENTER_INPUT_VALUE } from '@app/actions/ui'
import { Route, BufferKey } from '@app/utils/Route'
import { takeEvery, select, put } from 'redux-saga/effects'
import { getRoute } from '@app/state/route/selectors'
import { commandRegistry } from '@app/actions/commands'
import { cloneableGenerator } from 'redux-saga/utils'

describe('command effects', () => {
  const gen = command()

  it('should watch ENTER_INPUT_VALUE', () => {
    expect(gen.next().value).toEqual(takeEvery(ENTER_INPUT_VALUE, parseCommand))
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('parse simple message "hello"', () => {
  const gen = cloneableGenerator(parseCommand)(enterInputValue('hello'))

  it('should get route state', () => {
    expect(gen.next().value).toEqual(select(getRoute))
  })

  describe('if target is status', () => {
    const clone = gen.clone()
    clone.next()

    const route: Route = {
      serverKey: 'serverKey',
      bufferKey: BufferKey.STATUS,
    }

    it('should be done', () => {
      expect(clone.next(route).done).toBeTruthy()
    })
  })

  describe('if target is channel', () => {
    const clone = gen.clone()
    clone.next()

    const route: Route = {
      serverKey: 'serverKey',
      bufferKey: '#channel',
    }

    it('should run /msg command', () => {
      expect(clone.next(route).value).toEqual(
        put(commandRegistry.msg.callback(route, '#channel', 'hello')),
      )
    })

    it('should be done', () => {
      expect(clone.next(route).done).toBeTruthy()
    })
  })
})

describe('parse command /msg #channel hello', () => {
  const gen = parseCommand(enterInputValue('/msg #channel hello'))

  it('should get route state', () => {
    expect(gen.next().value).toEqual(select(getRoute))
  })

  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should run /msg command', () => {
    expect(gen.next(route).value).toEqual(
      put(commandRegistry.msg.callback(route, '#channel', 'hello')),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('parse command /msg #channel (missing params)', () => {
  const gen = parseCommand(enterInputValue('/msg #channel'))

  it('should get route state', () => {
    expect(gen.next().value).toEqual(select(getRoute))
  })

  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should run /help command', () => {
    expect(gen.next(route).value).toEqual(
      put(commandRegistry.help.callback(route, 'msg')),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})

describe('parse unknown command', () => {
  const gen = parseCommand(enterInputValue('/unknown_command'))

  it('should get route state', () => {
    expect(gen.next().value).toEqual(select(getRoute))
  })

  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should run /help command', () => {
    expect(gen.next(route).value).toEqual(
      put(commandRegistry.help.callback(route, 'unknown_command')),
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBeTruthy()
  })
})
