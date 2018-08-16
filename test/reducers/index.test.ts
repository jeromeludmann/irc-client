import { reduce, rootInitialState } from "@app/reducers";

describe("root reducer", () => {
  test("initializing without state", () => {
    expect(
      reduce(undefined, {
        type: "",
        route: { serverKey: "", channelKey: "" },
      }),
    ).toMatchSnapshot();
  });
  test("initializing with state", () => {
    expect(
      reduce(rootInitialState, {
        type: "",
        route: { serverKey: "", channelKey: "" },
      }),
    ).toMatchSnapshot();
  });
});
