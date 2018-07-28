import { Middleware } from "redux";
import { RAW_MESSAGES_RECEIVED, RawMessagesAction } from "@app/actions/socket";
import { IRC_MESSAGE_LENGTH, CRLF } from "@app/helpers";
import { GenericMessage, Prefix, Tags } from "@app/Message";
import {
  MessageActionCreator,
  MessageAction,
  join,
  error,
  nick,
  notice,
  part,
  ping,
  privmsg,
  replyMyInfo,
} from "@app/actions/messages";

/**
 * Message Parser Middleware
 *
 * Parse a raw message in order to get a generic message that will be used in
 * the message callbacks.
 */
export const parser: Middleware = () => next => (action: RawMessagesAction) => {
  next(action);

  if (action.type === RAW_MESSAGES_RECEIVED) {
    action.payload.messages.forEach(rawMessage => {
      const genericMessage = parseMessage(rawMessage);
      const { prefix, command, params } = genericMessage;

      if (messagesMap.hasOwnProperty(command)) {
        next(messagesMap[command](action.route.serverKey, prefix, params));
      }
    });
  }
};

type Callback = MessageActionCreator<MessageAction<string, {}>>;

const messagesMap: { [command: string]: Callback } = {
  JOIN: join,
  ERROR: error,
  NICK: nick,
  NOTICE: notice,
  PART: part,
  PING: ping,
  PRIVMSG: privmsg,
  "004": replyMyInfo,
};

const parseMessage = (rawMessage: string): GenericMessage => {
  const genericMessage: GenericMessage = {
    command: "",
    params: [],
  };

  if (rawMessage.length > IRC_MESSAGE_LENGTH - CRLF.length) {
    rawMessage = rawMessage.slice(0, IRC_MESSAGE_LENGTH - CRLF.length);
  }

  let pos: number;

  // Tags

  if (rawMessage.charAt(0) === "@") {
    pos = rawMessage.indexOf(" ");
    genericMessage.tags = parseTags(rawMessage.slice(1, pos));
    rawMessage = rawMessage.slice(pos + 1);
  }

  // Prefix

  if (rawMessage.charAt(0) === ":") {
    pos = rawMessage.indexOf(" ");
    genericMessage.prefix = parsePrefix(rawMessage.slice(1, pos));
    rawMessage = rawMessage.slice(pos + 1);
  }

  // Command

  pos = rawMessage.indexOf(" ");
  if (pos === -1) {
    pos = rawMessage.length;
  }
  genericMessage.command = rawMessage.slice(0, pos).toUpperCase();
  rawMessage = rawMessage.slice(pos + 1);

  // Middle parameters

  while (rawMessage.length > 0 && rawMessage.charAt(0) !== ":") {
    pos = rawMessage.indexOf(" ");
    if (pos === -1) {
      pos = rawMessage.length;
    }
    const middle = rawMessage.slice(0, pos);
    genericMessage.params.push(middle);
    rawMessage = rawMessage.slice(pos + 1);
  }

  // Trailing parameter

  if (rawMessage.length > 0) {
    const trailing = rawMessage.slice(1);
    genericMessage.params.push(trailing);
  }

  return genericMessage;
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

const parseTags = (tags: string): Tags =>
  tags.indexOf(";") > -1 ? tags.split(";") : [tags];
