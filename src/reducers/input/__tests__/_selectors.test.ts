import { selectValue } from "@app/reducers/input/_selectors";
import { serverInitialState } from "@app/reducers/server";
import { STATUS } from "@app/Route";

describe("select input", () => {
  const initialState = {
    servers: { server1: serverInitialState },
    route: { serverKey: "server1", channelKey: STATUS },
  };

  test("value", () => {
    expect(selectValue(initialState)).toMatchSnapshot();
  });
});
