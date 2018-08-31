import { reduceServers, serversInitialState } from "@app/reducers/servers";
import { closeWindow } from "@app/actions/ui";
import { STATUS } from "@app/Route";
import { serverInitialState } from "@app/reducers/server";
import { lookup } from "@app/actions/socket";

describe("reduce servers", () => {
  test("without state", () => {
    expect(
      reduceServers(
        undefined,
        { type: "", route: { serverKey: "server1", channelKey: "" } },
        { route: { serverKey: "server1", channelKey: STATUS } },
      ),
    ).toMatchSnapshot();
  });

  describe("by dispatching close window", () => {
    test("that is not a status window", () => {
      expect(
        reduceServers(
          serversInitialState,
          closeWindow({ serverKey: "server1", channelKey: "#channel" }),
          { route: { serverKey: "server1", channelKey: "#channel" } },
        ),
      );
    });

    describe("that is a status window", () => {
      test("without server", () => {
        expect(
          reduceServers(
            serversInitialState,
            closeWindow({ serverKey: "server1", channelKey: STATUS }),
            { route: { serverKey: "server1", channelKey: STATUS } },
          ),
        );
      });

      test("with two servers", () => {
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
    });
  });

  describe("by dispatching lookup", () => {
    expect(
      reduceServers(
        { server1: serverInitialState },
        lookup("server1", null, "address", "family", "host"),
        { route: { serverKey: "server1", channelKey: STATUS } },
      ),
    );
  });
});
