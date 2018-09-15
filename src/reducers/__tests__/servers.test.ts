import { reduceServers, serversInitialState } from "@app/reducers/servers";
import { closeWindow } from "@app/actions/ui";
import { BufferKey } from "@app/utils/Route";
import { serverInitialState } from "@app/reducers/server";
import { lookup } from "@app/actions/socket";

describe("reduce servers", () => {
  test("without state", () => {
    expect(
      reduceServers(
        undefined,
        { type: "", route: { serverKey: "server1", channelKey: "" } },
        { route: { serverKey: "server1", channelKey: BufferKey.STATUS } },
      ),
    ).toMatchSnapshot();
  });

  describe("by dispatching close window", () => {
    test("that is not a status window", () => {
      expect(
        reduceServers(
          serversInitialState,
          closeWindow({ serverKey: "server1", bufferKey: "#channel" }),
          { route: { serverKey: "server1", channelKey: "#channel" } },
        ),
      );
    });

    describe("that is a status window", () => {
      test("without server", () => {
        expect(
          reduceServers(
            serversInitialState,
            closeWindow({ serverKey: "server1", bufferKey: BufferKey.STATUS }),
            { route: { serverKey: "server1", channelKey: BufferKey.STATUS } },
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
            closeWindow({ serverKey: "server1", bufferKey: BufferKey.STATUS }),
            { route: { serverKey: "server1", channelKey: BufferKey.STATUS } },
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
        { route: { serverKey: "server1", channelKey: BufferKey.STATUS } },
      ),
    );
  });
});
