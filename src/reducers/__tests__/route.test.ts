import { reduceRoute, routeInitialState } from "@app/reducers/route";
import { switchWindow, closeWindow } from "@app/actions/ui";
import { serverInitialState } from "@app/reducers/server";
import { messageCallbacks } from "@app/actions/messages";
import { STATUS } from "@app/Route";

describe("route reducer", () => {
  test("intializing", () => {
    expect(reduceRoute(routeInitialState, { type: "" })).toMatchSnapshot();
  });

  describe("join", () => {
    test("an user joins a channel", () => {
      expect(
        reduceRoute(
          routeInitialState,
          messageCallbacks["JOIN"](
            "server1",
            { nick: "nick", user: "user", host: "host" },
            ["#channel"],
          ),
          { servers: { server1: serverInitialState } },
        ),
      ).toMatchSnapshot();
    });

    test("I join a channel myself", () => {
      expect(
        reduceRoute(
          routeInitialState,
          messageCallbacks["JOIN"](
            "server1",
            { nick: "nick", user: "user", host: "host" },
            ["#channel"],
          ),
          {
            servers: {
              server1: {
                ...serverInitialState,
                user: { ...serverInitialState.user, nick: "nick" },
              },
            },
          },
        ),
      ).toMatchSnapshot();
    });
  });

  describe("close window", () => {
    test("status", () => {
      expect(
        reduceRoute(
          { serverKey: "server1", channelKey: STATUS },
          closeWindow({ serverKey: "server1", channelKey: STATUS }),
          {
            servers: { server1: serverInitialState },
          },
        ),
      ).toMatchSnapshot();

      expect(
        reduceRoute(
          { serverKey: "server1", channelKey: STATUS },
          closeWindow({ serverKey: "server1", channelKey: STATUS }),
          {
            servers: {
              server1: serverInitialState,
              server2: serverInitialState,
            },
          },
        ),
      ).toMatchSnapshot();
    });

    test("channel", () => {
      expect(
        reduceRoute(
          { serverKey: "server1", channelKey: "#channel" },
          closeWindow({ serverKey: "server1", channelKey: "#channel" }),
          { servers: { server1: serverInitialState } },
        ),
      ).toMatchSnapshot();
    });
  });

  describe("switch window", () => {
    test("status", () => {
      expect(
        reduceRoute(
          routeInitialState,
          switchWindow({ serverKey: "server1", channelKey: STATUS }),
        ),
      ).toMatchSnapshot();
    });

    test("channel", () => {
      expect(
        reduceRoute(
          routeInitialState,
          switchWindow({ serverKey: "server1", channelKey: "#channel" }),
        ),
      ).toMatchSnapshot();
    });
  });
});
