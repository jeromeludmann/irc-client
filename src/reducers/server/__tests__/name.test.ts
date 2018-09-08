import { reduceServerName } from "@app/reducers/server/name";
import { messageReceivers } from "@app/actions/msgIncoming";

describe(" server name", () => {
  test("without action", () => {
    expect(reduceServerName(undefined, { type: "" })).toMatchSnapshot();
  });

  test("with RPL_MYINFO received", () => {
    expect(
      reduceServerName(
        undefined,
        messageReceivers["004"]("server1", "server", [
          "",
          "serverName",
          "version",
          "userModes",
          "channelModes",
        ]),
      ),
    ).toMatchSnapshot();
  });
});
