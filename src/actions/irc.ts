export const SEND_MESSAGE = "SEND_RAW_MESSAGE";

export interface SendMessage {
  type: typeof SEND_MESSAGE;
  payload: { message: string };
}

export function join(channel: string) {
  return raw(`JOIN ${channel}`);
}

export function part(channel: string, text: string = "Bye!") {
  return raw(`PART ${channel} :${text}`);
}

export function whois(nick: string) {
  return raw(`WHOIS ${nick}`);
}

export function raw(message: string): SendMessage {
  return {
    type: SEND_MESSAGE,
    payload: { message },
  };
}
