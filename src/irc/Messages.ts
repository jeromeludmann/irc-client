import { Command } from "@app/irc/Commands";
import { Server, User } from "@app/irc/Prefixes";

interface Message {
  readonly command: Command;
  readonly params?: string[];
}

export type ClientMessage = Message;

export type ServerMessage = Message & {
  readonly prefix: Server | User;
};
