import { reduceRoot, rootInitialState } from "@app/reducers";

describe("root reducer", () => {
  it("should initialize without state", () => {
    expect(
      reduceRoot(undefined, {
        type: "",
        route: { serverKey: "server1", bufferKey: "" }
      })
    ).toMatchSnapshot();
  });

  it("should initialize with state", () => {
    expect(
      reduceRoot(rootInitialState, {
        type: "",
        route: { serverKey: "server1", bufferKey: "" }
      })
    ).toMatchSnapshot();
  });
});
