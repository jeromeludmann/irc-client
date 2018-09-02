import { reduceAvailableServerModes } from "@app/reducers/server/availableModes";
import { RPL_MYINFO_RECEIVED } from "@app/actions/messages";

describe("available server modes reducer", () => {
  test("RPL_MYINFO", () => {
    expect(
      reduceAvailableServerModes(undefined, {
        type: RPL_MYINFO_RECEIVED,
        payload: {
          availableChannelModes: [],
          availableUserModes: [],
          serverName: "server1",
          version: "???"
        },
        route: { serverKey: "server1", channelKey: "#channel" }
      })
    ).toMatchSnapshot();
  });
});
