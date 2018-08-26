import { reduceServer } from "@app/reducers/server";

test("reduce server", () => {
  const route = { serverKey: "server1", channelKey: "#channel" };

  expect(
    reduceServer(undefined, { type: "", route }, { route })
  ).toMatchSnapshot();
});
