import { Middleware, Action } from "redux";
import { Routable } from "@app/state/Route";
import { SOCKET_DATA, SocketDataAction } from "@app/actions/socket";
import { Prefix, MessageActionCreator } from "@app/actions/messages/raw";
import { rawReceived, Raw } from "@app/actions/messages/raw";
import { MESSAGE_JOIN, joinReceived } from "@app/actions/messages/join";
import { MESSAGE_NOTICE, noticeReceived } from "@app/actions/messages/notice";
import { MESSAGE_PING, pingReceived } from "@app/actions/messages/ping";
import {
  MESSAGE_PRIVMSG,
  privmsgReceived,
} from "@app/actions/messages/privmsg";

type Mapping = {
  [command: string]: MessageActionCreator<Action<string>, Prefix | undefined>;
};

export const parser: Middleware = () => next => (action: SocketDataAction) => {
  if (action.type !== SOCKET_DATA) {
    next(action);
    return;
  }

  action.payload.messages.forEach(unparsed => {
    const rawMessage = parseMessage(unparsed);
    const { prefix, command, params } = rawMessage;
    const actionType = `MESSAGE/${command}`;

    if (!actions.hasOwnProperty(actionType)) {
      next(rawReceived(rawMessage));
      return;
    }

    const messageAction = actions[actionType](prefix, params) as Routable;

    messageAction.route = {
      server: action.payload.serverId,
      ...messageAction.route,
    };

    next(messageAction);
  });
};

const actions: Mapping = {
  [MESSAGE_JOIN]: joinReceived,
  [MESSAGE_NOTICE]: noticeReceived,
  [MESSAGE_PING]: pingReceived,
  [MESSAGE_PRIVMSG]: privmsgReceived,
};

const MESSAGE_LENGTH = 510; // RFC says 512 - "CR" "LF" = 510

const parseMessage = (message: string): Raw => {
  if (message.length > MESSAGE_LENGTH) {
    // tslint:disable-next-line
    console.warn(`Unexpected message length: (${MESSAGE_LENGTH} bytes max)`);
  }

  let i;

  // Parse prefix

  let prefix: Prefix = "";

  if (message.charAt(0) === ":") {
    i = message.indexOf(" ");
    prefix = parsePrefix(message.slice(1, i));
    message = message.slice(i + 1);
  }

  // Parse command

  let command: string;
  i = message.indexOf(" ");
  if (i === -1) {
    i = message.length;
  }
  command = message.slice(0, i);
  message = message.slice(i + 1);

  const params = [];

  // Parse middle parameters

  while (message.length > 0 && message.charAt(0) !== ":") {
    i = message.indexOf(" ");
    if (i === -1) {
      i = message.length;
    }
    const middle = message.slice(0, i);
    params.push(middle);
    message = message.slice(i + 1);
  }

  // Parse trailing parameter
  if (message.length > 0) {
    const trailing = message.slice(1);
    params.push(trailing);
  }

  return { prefix, command, params };
};

const parsePrefix = (prefix: string): Prefix => {
  const i = prefix.indexOf("!");
  if (i === -1) {
    return prefix;
  }

  const j = prefix.indexOf("@");

  return {
    nick: prefix.slice(0, i),
    user: prefix.slice(i + 1, j),
    host: prefix.slice(j + 1),
  };
};
