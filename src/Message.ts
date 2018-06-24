export interface GenericMessage {
  tags?: Tags;
  prefix?: Prefix;
  command: string;
  params: string[];
}

// TODO
// export interface Server { name: string }
export type Server = string;

export interface User {
  nick: string;
  user: string;
  host: string;
}

export type Tags = string[];

export type Prefix = Server | User;

export const isPrefixServer = (prefix: Prefix) => typeof prefix === "string";

export const isPrefixUser = (prefix: Prefix) => !isPrefixServer(prefix);
