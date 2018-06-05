export type ModesState = string[];
const initialState: ModesState = [];
export default (modes = initialState): ModesState => modes;
