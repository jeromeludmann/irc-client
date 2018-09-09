import { reduceServer } from "@app/reducers/server";
import { messageReceivers } from "@app/actions/msgIncoming";

describe("reduce server", () => {
  const route = { serverKey: "server1", channelKey: "#channel" };
  const extraStates = { route };

  expect(
    reduceServer(undefined, { type: "", route }, extraStates),
  ).toMatchSnapshot();

  describe("name", () => {
    it("without action", () => {
      expect(
        reduceServer(undefined, { type: "", route }, extraStates),
      ).toMatchSnapshot();
    });

    it("with RPL_MYINFO received", () => {
      expect(
        reduceServer(
          undefined,
          messageReceivers["004"]("server1", "server", [
            "",
            "serverName",
            "version",
            "userModes",
            "channelModes",
          ]),
          extraStates,
        ),
      ).toMatchSnapshot();
    });
  });
});
