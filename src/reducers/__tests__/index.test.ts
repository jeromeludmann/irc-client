import { reduce, rootInitialState } from "@app/reducers";

describe("root reducer", () => {
  it("should initialize without state", () => {
    expect(
      reduce(undefined, {
        type: "",
        route: { serverKey: "server1", channelKey: "" }
      })
    ).toMatchSnapshot();
  });

  it("should initialize with state", () => {
    expect(
      reduce(rootInitialState, {
        type: "",
        route: { serverKey: "server1", channelKey: "" }
      })
    ).toMatchSnapshot();
  });
});
