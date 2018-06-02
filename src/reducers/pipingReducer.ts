import { Reducer } from "redux";

interface Params {
  key: string;
  reducer: Reducer;
  actionTypes: { add: string; remove: string };
}

interface State {
  [key: string]: object;
}

interface Action {
  type: string;
}

export const pipingReducer = ({
  key,
  reducer,
  actionTypes: { add, remove },
}: Params): Reducer => (items: State, action: Action): State => {
  if (!key) {
    return items;
  }

  switch (action.type) {
    case add:
      return {
        ...items,
        [key]: reducer(undefined, action),
      };

    case remove:
      const newItems = { ...items };
      delete newItems[key];
      return newItems;

    default:
      return {
        ...items,
        [key]: reducer(items[key], action),
      };
  }
};
