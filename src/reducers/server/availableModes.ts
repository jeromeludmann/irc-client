import { ReplyMyInfoAction, RPL_MYINFO } from "@app/actions/incoming";

export type ServerAvailableModesState = {
  user: string[];
  channel: string[];
};

export type ServerAvailableModesAction = ReplyMyInfoAction;

export const serverAvailableModesInitialState: ServerAvailableModesState = {
  user: [],
  channel: [],
};

export const reduceServerAvailableModes = (
  availableModes = serverAvailableModesInitialState,
  action: ServerAvailableModesAction,
) => {
  switch (action.type) {
    case RPL_MYINFO:
      return {
        user: action.payload.availableUserModes,
        channel: action.payload.availableChannelModes,
      };

    default:
      return availableModes;
  }
};
