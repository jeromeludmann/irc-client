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
} from "@app/reducers/server/name";
import {
  reduceAvailableServerModes,
  AvailableServerModesState,
  availableServerModesInitialState,
} from "@app/reducers/server/availableModes";
import { ServerNameState } from "@app/reducers/server/name";
import {
  UserState,
  userInitialState,
  reduceUser,
} from "@app/reducers/server/user";

export type ServerState = {
  readonly name: ServerNameState;
  readonly user: UserState;
  readonly availableModes: AvailableServerModesState;
  readonly modes: ServerModesState;
  readonly channels: ChannelsState;
};

export const serverInitialState: ServerState = {
  name: serverNameInitialState,
  user: userInitialState,
  availableModes: availableServerModesInitialState,
  modes: serverModesInitialState,
  channels: channelsInitialState,
};

export const reduceServer = (
  server = serverInitialState,
  action: RoutedAction,
  extraStates: { route: RouteState },
): ServerState => ({
  name: reduceServerName(server.name, action),
  user: reduceUser(server.user, action),
  availableModes: reduceAvailableServerModes(server.availableModes, action),
  modes: reduceServerModes(server.modes),
  channels: reduceChannels(server.channels, action, {
    ...extraStates,
    user: server.user,
  }),
});
