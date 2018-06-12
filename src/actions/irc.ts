import { ClientMessage, Command } from "@app/irc/Message";

export const SEND_COMMAND = "SEND_COMMAND";

export interface SendCommand {
  type: typeof SEND_COMMAND;
  payload: ClientMessage;
}

export const whois = (nick: string) => {
  return command("whois", nick);
};

export const join = (channel: string) => {
  return command("join", channel);
};

export const privmsg = (target: string, text: string) => {
  return command("privmsg", target, text);
};

function command(name: Command, ...parameters: string[]): SendCommand {
  return {
    type: SEND_COMMAND,
    payload: { command: name, parameters },
  };
}
