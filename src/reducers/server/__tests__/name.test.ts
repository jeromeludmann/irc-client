import { reduceServerName } from "@app/reducers/server/name";
import { messagesReceived } from "@app/actions/messages";

describe(" server name", () => {
  test("without action", () => {
    expect(reduceServerName(undefined, { type: "" })).toMatchSnapshot();
  });

  test("with RPL_MYINFO received", () => {
    expect(
      reduceServerName(
        undefined,
        messagesReceived["004"]("server1", "server", [
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
