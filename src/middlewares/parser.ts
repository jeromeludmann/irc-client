import { Middleware } from "redux";
import {
  RAW_MESSAGES_RECEIVED,
  RawMessagesReceivedAction,
} from "@app/actions/network";
import {
  Prefix,
  receiveJoin,
  receiveNick,
  receiveNotice,
  receivePing,
  receivePrivmsg,
  receiveError,
  User,
  IncomingMessageAction,
  receivePart,
  receiveReplyMyInfo,
  Server,
} from "@app/actions/incoming";
import { IRC_MESSAGE_LENGTH } from "@app/middlewares/constants";

const messageRegistry: {
  [command: string]: (
    serverKey: string,
    prefix: Prefix,
    params: string[],
  ) => IncomingMessageAction<string, {}>;
} = {
  JOIN(serverKey, prefix, params) {
    return receiveJoin(serverKey, prefix as User, params);
  },
  ERROR(serverKey, _, params) {
    return receiveError(serverKey, undefined, params);
  },
  NICK(serverKey, prefix, params) {
    return receiveNick(serverKey, prefix as User, params);
  },
  NOTICE(serverKey, prefix, params) {
    return receiveNotice(serverKey, prefix, params);
  },
  PART(serverKey, prefix, params) {
    return receivePart(serverKey, prefix as User, params);
  },
  PING(serverKey, _, params) {
    return receivePing(serverKey, undefined, params);
  },
  PRIVMSG(serverKey, prefix, params) {
    return receivePrivmsg(serverKey, prefix as User, params);
  },
  "004"(serverKey, prefix, params) {
    return receiveReplyMyInfo(serverKey, prefix as Server, params);
  },
};

interface GenericMessage {
  prefix?: Prefix;
  command: string;
  params: string[];
}

const parseMessage = (message: string): GenericMessage => {
  if (message.length > IRC_MESSAGE_LENGTH) {
    // tslint:disable-next-line
    console.warn(
      `Unexpected message length: (${IRC_MESSAGE_LENGTH} bytes max)`,
    );
  }

  let pos: number;

  // TODO Skip tags (optional, not yet supported)

  if (message.charAt(0) === "@") {
    pos = message.indexOf(" ");
    message = message.slice(pos + 1);
  }

  // Parse prefix

  let prefix: Prefix;

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
  command = message.slice(0, pos).toUpperCase();
  message = message.slice(pos + 1);

  // Parameters

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

export const parser: Middleware = () => next => (
  action: RawMessagesReceivedAction,
) => {
  next(action);

  if (action.type === RAW_MESSAGES_RECEIVED) {
    action.payload.messages.forEach(rawMessage => {
      const genericMessage = parseMessage(rawMessage);
      const { prefix, command, params } = genericMessage;

      if (messageRegistry.hasOwnProperty(command)) {
        next(messageRegistry[command](action.route.serverKey, prefix, params));
      }
    });
  }
};
