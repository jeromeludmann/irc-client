import {
  ServerModesState,
  serverModesInitialState,
  reduceServerModes,
} from "@app/reducers/server/modes";
import { RouteState } from "@app/reducers/route";
import {
  ChannelsState,
  channelsInitialState,
  reduceChannels,
} from "@app/reducers/server/channels";
import { RoutedAction } from "@app/Route";
import {
  serverNameInitialState,
  reduceServerName,
  ServerNameAction,
} from "@app/reducers/server/name";
import {
  reduceServerAvailableModes,
  ServerAvailableModesState,
  serverAvailableModesInitialState,
  ServerAvailableModesAction,
} from "@app/reducers/server/availableModes";
import { ServerNameState } from "@app/reducers/server/name";
import {
  UserState,
  userInitialState,
  reduceUser,
  UserAction,
} from "@app/reducers/server/user";

export type ServerState = {
  readonly name: ServerNameState;
  readonly user: UserState;
  readonly availableModes: ServerAvailableModesState;
  readonly modes: ServerModesState;
  readonly channels: ChannelsState;
};

export const serverInitialState: ServerState = {
  name: serverNameInitialState,
  user: userInitialState,
  availableModes: serverAvailableModesInitialState,
  modes: serverModesInitialState,
  channels: channelsInitialState,
};

export const reduceServer = (
  server = serverInitialState,
  action: RoutedAction,
  states: { active: RouteState },
): ServerState => ({
  name: reduceServerName(server.name, action as ServerNameAction),
  user: reduceUser(server.user, action as UserAction),
  availableModes: reduceServerAvailableModes(
    server.availableModes,
    action as ServerAvailableModesAction,
  ),
  modes: reduceServerModes(server.modes),
  channels: reduceChannels(server.channels, action, {
    ...states,
    user: server.user,
  }),
});
