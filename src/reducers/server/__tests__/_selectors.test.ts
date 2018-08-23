import { selectUser, selectChannel } from "@app/reducers/server/_selectors";
import { serverInitialState } from "@app/reducers/server";
import { STATUS } from "@app/Route";

describe("server selectors", () => {
  const initialState = {
    servers: { server1: serverInitialState },
    route: { serverKey: "server1", channelKey: STATUS },
  };

  test("select user", () => {
    expect(selectUser(initialState)).toMatchSnapshot();
  });

  test("select channel", () => {
    expect(selectChannel(initialState)).toMatchSnapshot();
  });
});
