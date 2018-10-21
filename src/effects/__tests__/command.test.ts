import * as CommandEffects from '../command'
import { enterInputValue, ENTER_INPUT_VALUE } from '@app/actions/ui'
import { Route, BufferKey } from '@app/utils/Route'
import { takeEvery, select, put } from 'redux-saga/effects'
import { getRoute } from '@app/state/route/selectors'
import { commandRegistry } from '@app/actions/commands'
import { cloneableGenerator } from 'redux-saga/utils'

describe('command effects', () => {
  const watch = CommandEffects.watch()

  it('should watch ENTER_INPUT_VALUE', () => {
    expect(watch.next().value).toEqual(
      takeEvery(ENTER_INPUT_VALUE, CommandEffects.parseCommand),
    )
  })

  it('should be done', () => {
    expect(watch.next().done).toBeTruthy()
  })
})

describe('parse simple message "hello"', () => {
  const parseCommand = cloneableGenerator(CommandEffects.parseCommand)(
    enterInputValue('hello'),
  )

  it('should get route state', () => {
    expect(parseCommand.next().value).toEqual(select(getRoute))
  })

  describe('if target is status', () => {
    const clonedParseCommand = parseCommand.clone()
    clonedParseCommand.next()

    const route: Route = {
      serverKey: 'serverKey',
      bufferKey: BufferKey.STATUS,
    }

    it('should be done', () => {
      expect(clonedParseCommand.next(route).done).toBeTruthy()
    })
  })

  describe('if target is channel', () => {
    const clonedParseCommand = parseCommand.clone()
    clonedParseCommand.next()

    const route: Route = {
      serverKey: 'serverKey',
      bufferKey: '#channel',
    }

    it('should run /msg command', () => {
      expect(clonedParseCommand.next(route).value).toEqual(
        put(commandRegistry.msg.callback(route, '#channel', 'hello')),
      )
    })

    it('should be done', () => {
      expect(clonedParseCommand.next(route).done).toBeTruthy()
    })
  })
})

describe('parse command /msg #channel hello', () => {
  const parseCommand = CommandEffects.parseCommand(
    enterInputValue('/msg #channel hello'),
  )

  it('should get route state', () => {
    expect(parseCommand.next().value).toEqual(select(getRoute))
  })

  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should run /msg command', () => {
    expect(parseCommand.next(route).value).toEqual(
      put(commandRegistry.msg.callback(route, '#channel', 'hello')),
    )
  })

  it('should be done', () => {
    expect(parseCommand.next().done).toBeTruthy()
  })
})

describe('parse command /msg #channel (missing params)', () => {
  const parseCommand = CommandEffects.parseCommand(
    enterInputValue('/msg #channel'),
  )

  it('should get route state', () => {
    expect(parseCommand.next().value).toEqual(select(getRoute))
  })

  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should run /help command', () => {
    expect(parseCommand.next(route).value).toEqual(
      put(commandRegistry.help.callback(route, 'msg')),
    )
  })

  it('should be done', () => {
    expect(parseCommand.next().done).toBeTruthy()
  })
})

describe('parse unknown command', () => {
  const parseCommand = CommandEffects.parseCommand(
    enterInputValue('/unknown_command'),
  )

  it('should get route state', () => {
    expect(parseCommand.next().value).toEqual(select(getRoute))
  })

  const route: Route = { serverKey: 'serverKey', bufferKey: '#channel' }

  it('should run /help command', () => {
    expect(parseCommand.next(route).value).toEqual(
      put(commandRegistry.help.callback(route, 'unknown_command')),
    )
  })

  it('should be done', () => {
    expect(parseCommand.next().done).toBeTruthy()
  })
})
