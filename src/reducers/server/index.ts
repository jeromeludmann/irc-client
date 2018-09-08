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
import {
  reduceLag,
  ServerLagState,
  serverLagInitialState,
} from "@app/reducers/server/lag";
import { Action } from "redux";

export type ServerState = Readonly<{
  name: ServerNameState;
  user: UserState;
  availableModes: AvailableServerModesState;
  modes: ServerModesState;
  channels: ChannelsState;
  lag: ServerLagState;
}>;

export const serverInitialState: ServerState = {
  name: serverNameInitialState,
  user: userInitialState,
  availableModes: availableServerModesInitialState,
  modes: serverModesInitialState,
  channels: channelsInitialState,
  lag: serverLagInitialState,
};

export const reduceServer = (
  server = serverInitialState,
  action: Action,
  extraStates: { route: RouteState },
): ServerState => ({
  name: reduceServerName(server.name, action),
  user: reduceUser(server.user, action),
  availableModes: reduceAvailableServerModes(server.availableModes, action),
  modes: reduceServerModes(server.modes),
  channels: reduceChannels(server.channels, action as RoutedAction, {
    ...extraStates,
    user: server.user,
  }),
  lag: reduceLag(server.lag, action),
});
