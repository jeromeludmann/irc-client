import { AnyAction } from "redux";

export type UnreadState = boolean;

export default function(
  unread: UnreadState = false,
  { type }: AnyAction,
): UnreadState {
  switch (type) {
    // case IRC_PRIVMSG:
    // return route.channel !== active channel ???
    default:
      return unread;
  }
}
