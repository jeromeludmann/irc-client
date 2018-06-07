import {
  ChangedAction,
  SentAction,
  INPUT_CHANGED,
  INPUT_SENT,
} from "@app/input/types";

export function changeInput(
  input: string,
  server: string,
  channel: string,
): ChangedAction {
  return {
    type: INPUT_CHANGED,
    route: { server, channel },
    payload: { value: input },
  };
}

export function sendInput(
  input: string,
  server: string,
  channel: string,
): SentAction {
  return {
    type: INPUT_SENT,
    route: { server, channel },
    payload: { value: input },
  };
}
