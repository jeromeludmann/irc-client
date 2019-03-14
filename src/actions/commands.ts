import {
  connectToServer,
  disconnectFromServer,
  DisconnectFromServerAction,
  ConnectToServerAction,
  SendRawMessageAction,
  sendRawMessage,
} from '@app/actions/socket'
import { closeWindow, CloseWindowAction } from '@app/actions/ui'
import { Route, RoutedAction, BufferKey } from '@app/utils/Route'
import { CHANNEL_REGEXP } from '@app/utils/helpers'
import {
  sendJoin,
  sendPrivmsg,
  sendPart,
  SendPrivmsgAction,
  sendNick,
  sendPingToServer,
  SendPingToServerAction,
  SendJoinAction,
  SendNickAction,
  SendPartAction,
} from '@app/actions/messages/outgoing'

export interface Command {
  description: string
  syntax: string
  regexp: RegExp
  callback: (route: Route, ...params: string[]) => RoutedAction
}

interface CommandRegistry {
  [command: string]: Command
}

export const PRINT_HELP_BY_DEFAULT = 'COMMAND/PRINT_HELP_BY_DEFAULT'
export const PRINT_HELP_ABOUT_COMMAND = 'COMMAND/PRINT_HELP_ABOUT_COMMAND'

export interface PrintHelpByDefaultAction
  extends RoutedAction<typeof PRINT_HELP_BY_DEFAULT> {
  payload: { commands: CommandRegistry }
}

export interface PrintHelpAboutCommandAction
  extends RoutedAction<typeof PRINT_HELP_ABOUT_COMMAND> {
  payload: { command: Command & { name: string } }
}

export const commandRegistry: CommandRegistry = {
  close: {
    description: 'Closes the current window',
    syntax: '',
    regexp: /\s*/,
    callback: (route): CloseWindowAction => closeWindow(route),
  },

  help: {
    description: 'Prints help about available commands',
    syntax: '[command]',
    regexp: /^(\S+)?$/,
    callback: (
      route,
      commandName?,
    ): PrintHelpAboutCommandAction | PrintHelpByDefaultAction => {
      if (commandName) {
        commandName = commandName.toLowerCase()
      }

      if (commandName && commandName in commandRegistry) {
        return {
          type: PRINT_HELP_ABOUT_COMMAND,
          payload: {
            command: { ...commandRegistry[commandName], name: commandName },
          },
          route: { ...route, bufferKey: BufferKey.ACTIVE },
        }
      }

      return {
        type: PRINT_HELP_BY_DEFAULT,
        payload: { commands: commandRegistry },
        route: { ...route, bufferKey: BufferKey.STATUS },
      }
    },
  },

  join: {
    description: 'Joins a channel',
    syntax: '<channel>',
    regexp: CHANNEL_REGEXP,
    callback: (route, channel): SendJoinAction =>
      sendJoin(route.serverKey, channel),
  },

  msg: {
    description: 'Sends a message to a channel or a nick',
    syntax: '<channel or nick> <text>',
    regexp: /^(\S+)\s+(.+)$/,
    callback: (route, channel, text): SendPrivmsgAction =>
      sendPrivmsg(route.serverKey, channel, text),
  },

  nick: {
    description: 'Changes the current nick',
    syntax: '<nick>',
    regexp: /^(\S+)$/,
    callback: (route, nick): SendNickAction => sendNick(route.serverKey, nick),
  },

  part: {
    description: 'Leaves the channel',
    syntax: '<channel> [text]',
    regexp: /^(\S+)(?:\s+(.+))?$/,
    callback: (route, channel, text): SendPartAction =>
      sendPart(route.serverKey, channel, text),
  },

  ping: {
    description: 'Sends a ping',
    syntax: '',
    regexp: /\s*/,
    callback: (route): SendPingToServerAction =>
      sendPingToServer(route.serverKey),
  },

  server: {
    description: 'Connects to a server',
    syntax: '[-n] <host> [port]',
    regexp: /^(?:(-n)\s+)?(\S+)(?:\s+(\d{1,5})?)?$/,
    callback: (route, option, host, port?): ConnectToServerAction =>
      connectToServer(
        route.serverKey,
        host,
        port ? +port : undefined,
        option === '-n',
      ),
  },

  quit: {
    description: 'Disconnects from the current server',
    syntax: '[quit message]',
    regexp: /^(.*)$/,
    callback: (route, quitMessage?): DisconnectFromServerAction =>
      disconnectFromServer(route.serverKey, quitMessage),
  },

  raw: {
    description: 'Sends a raw message',
    syntax: '<raw message>',
    regexp: /^(.+)$/,
    callback: (route, message): SendRawMessageAction =>
      sendRawMessage(route.serverKey, message),
  },
}

// aliases
commandRegistry.connect = commandRegistry.server
commandRegistry.disconnect = commandRegistry.quit
commandRegistry.quote = commandRegistry.raw
