export type ModesState = string[];

export const modesInitialState: ModesState = [];

export default (modes = modesInitialState): ModesState => modes;
