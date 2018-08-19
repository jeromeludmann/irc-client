import { reduceServers, serversInitialState } from "@app/reducers/servers";
import { closeWindow } from "@app/actions/ui";
import { STATUS } from "@app/Route";
import { serverInitialState } from "@app/reducers/server";
import { LOOKUP_SUCCESS, lookup } from "@app/actions/socket";

describe("servers reducer", () => {
  test("initializing without state", () => {
    expect(
      reduceServers(
        undefined,
        { type: "", route: { serverKey: "server1", channelKey: "" } },
        { route: { serverKey: "server1", channelKey: STATUS } },
      ),
    ).toMatchSnapshot();
  });

  test("initializing with state", () => {
    expect(
      reduceServers(
        serversInitialState,
        { type: "", route: { serverKey: "server1", channelKey: "" } },
        { route: { serverKey: "server1", channelKey: STATUS } },
      ),
    ).toMatchSnapshot();
  });

  describe("close window", () => {
    test("without server", () => {
      expect(
        reduceServers(
          serversInitialState,
          closeWindow({ serverKey: "server1", channelKey: STATUS }),
          { route: { serverKey: "server1", channelKey: STATUS } },
        ),
      );
    });

    test("close non status window, with two servers", () => {
      expect(
        reduceServers(
          serversInitialState,
          closeWindow({ serverKey: "server1", channelKey: STATUS }),
          { route: { serverKey: "server1", channelKey: STATUS } },
        ),
      );
    });

    test("close status window, with two servers", () => {
      expect(
        reduceServers(
          serversInitialState,
          closeWindow({ serverKey: "server1", channelKey: STATUS }),
          { route: { serverKey: "server1", channelKey: STATUS } },
        ),
      );

      expect(
        reduceServers(
          {
            server1: serverInitialState,
            server2: serverInitialState,
          },
          closeWindow({ serverKey: "server1", channelKey: STATUS }),
          { route: { serverKey: "server1", channelKey: STATUS } },
        ),
      );
    });

    expect(
      reduceServers(
        { server1: serverInitialState },
        lookup("server1", null, "address", "family", "host"),
        { route: { serverKey: "server1", channelKey: STATUS } },
      ),
    );
  });
});
