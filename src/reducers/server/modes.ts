export type ServerModesState = Readonly<string[]>;

export const serverModesInitialState: ServerModesState = [];

export const reduceServerModes = (
  modes = serverModesInitialState,
): ServerModesState => modes;
