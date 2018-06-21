import { Middleware, Action } from "redux";
import {
  RAW_MESSAGES_RECEIVED,
  RawMessagesReceivedAction,
} from "@app/actions/network";
import {
  IncomingMessageActionCreator,
  Prefix,
  join,
  nick,
  notice,
  ping,
  privmsg,
} from "@app/actions/message-in";

export const parser: Middleware = () => next => (
  action: RawMessagesReceivedAction,
) => {
  next(action);

  if (action.type === RAW_MESSAGES_RECEIVED) {
    action.payload.messages.forEach(rawMessage => {
      const genericMessage = parseMessage(rawMessage);
      const { prefix, command, params } = genericMessage;

      if (actions.hasOwnProperty(command)) {
        next(actions[command](action.route.serverKey, prefix, params));
      }
    });
  }
};

const actions: {
  [command: string]: IncomingMessageActionCreator<
    Action<string>,
    Prefix | undefined
  >;
} = {
  JOIN: join,
  NICK: nick,
  NOTICE: notice,
  PING: ping,
  PRIVMSG: privmsg,
};

const MESSAGE_LENGTH = 510; // RFC says 512 - "CR" "LF" = 510

interface GenericMessage {
  prefix?: Prefix;
  command: string;
  params: string[];
}

const parseMessage = (message: string): GenericMessage => {
  if (message.length > MESSAGE_LENGTH) {
    // tslint:disable-next-line
    console.warn(`Unexpected message length: (${MESSAGE_LENGTH} bytes max)`);
  }

  let pos: number;

  // TODO Skip tags (optional, not yet supported)

  if (message.charAt(0) === "@") {
    pos = message.indexOf(" ");
    message = message.slice(pos + 1);
  }

  // Parse prefix

  let prefix: Prefix = "";

  if (message.charAt(0) === ":") {
    pos = message.indexOf(" ");
    prefix = parsePrefix(message.slice(1, pos));
    message = message.slice(pos + 1);
  }

  // Parse command

  let command: string;
  pos = message.indexOf(" ");
  if (pos === -1) {
    pos = message.length;
  }
  command = message.slice(0, pos);
  message = message.slice(pos + 1);

  const params = [];

  // Parse middle parameters

  while (message.length > 0 && message.charAt(0) !== ":") {
    pos = message.indexOf(" ");
    if (pos === -1) {
      pos = message.length;
    }
    const middle = message.slice(0, pos);
    params.push(middle);
    message = message.slice(pos + 1);
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
