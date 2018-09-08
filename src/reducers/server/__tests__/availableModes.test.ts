import { reduceAvailableServerModes } from "@app/reducers/server/availableModes";
import { RECEIVE_RPL_MYINFO } from "@app/actions/msgIncoming";

describe("available server modes reducer", () => {
  test("RPL_MYINFO", () => {
    expect(
      reduceAvailableServerModes(undefined, {
        type: RECEIVE_RPL_MYINFO,
        payload: {
          availableChannelModes: [],
          availableUserModes: [],
          serverName: "server1",
          version: "???",
        },
        route: { serverKey: "server1", channelKey: "#channel" },
      }),
    ).toMatchSnapshot();
  });
});
