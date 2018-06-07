export type UnreadState = boolean;

export default function(
  unread: UnreadState = false,
  { type, scope, payload }: any,
): UnreadState {
  switch (type) {
    case "IRC/PRIVMSG":
      return scope.channel !== payload.channel;
    default:
      return unread;
  }
}
