import { reduceServers, serversInitialState } from "@app/reducers/servers";
import { CLOSE_WINDOW } from "@app/actions/ui";
import { STATUS } from "@app/Route";
import { serverInitialState } from "@app/reducers/server";
import { LOOKUP_SUCCESS } from "@app/actions/socket";

describe("servers reducer", () => {
  const route = { serverKey: "", channelKey: "" };

  test("initializing without state", () => {
    expect(
      reduceServers(undefined, { type: "", route }, { route }),
    ).toMatchSnapshot();
  });

  test("initializing with state", () => {
    expect(
      reduceServers(serversInitialState, { type: "", route }, { route }),
    ).toMatchSnapshot();
  });

  describe("close window", () => {
    test("without server", () => {
      expect(
        reduceServers(
          serversInitialState,
          { type: CLOSE_WINDOW, route },
          { route },
        ),
      );
    });

    test("close non status window, with two servers", () => {
      expect(
        reduceServers(
          serversInitialState,
          { type: CLOSE_WINDOW, route },
          { route },
        ),
      );
    });

    test("close status window, with two servers", () => {
      expect(
        reduceServers(
          serversInitialState,
          { type: CLOSE_WINDOW, route: { serverKey: "", channelKey: STATUS } },
          { route },
        ),
      );

      expect(
        reduceServers(
          {
            server1: serverInitialState,
            server2: serverInitialState,
          },
          {
            type: CLOSE_WINDOW,
            route: { serverKey: "server1", channelKey: STATUS },
          },
          { route },
        ),
      );
    });

    expect(
      reduceServers(
        { server1: serverInitialState },
        {
          type: LOOKUP_SUCCESS,
          route: { serverKey: "server1", channelKey: "" },
        },
        { route },
      ),
    );
  });
});
