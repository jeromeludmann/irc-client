import { selectMessages, selectInput } from "@app/reducers/channel/_selectors";
import { serverInitialState } from "@app/reducers/server";
import { STATUS } from "@app/Route";

describe("channel selectors", () => {
  const initialState = {
    servers: { server1: serverInitialState },
    route: { serverKey: "server1", channelKey: STATUS },
  };

  test("select messages", () => {
    expect(selectMessages(initialState)).toMatchSnapshot();
  });

  test("select input", () => {
    expect(selectInput(initialState)).toMatchSnapshot();
  });
});
