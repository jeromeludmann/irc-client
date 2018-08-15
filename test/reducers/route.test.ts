import { reduceRoute, routeInitialState } from "@app/reducers/route";
import { switchWindow, closeWindow } from "@app/actions/ui";
import { serverInitialState } from "@app/reducers/server";
import { STATUS } from "@app/Route";
import { messageCallbacks } from "@app/actions/messages";

describe("route reducer", () => {
  const user = { nick: "nickname", user: "username", host: "hostname" };

  test("intializing", () => {
    expect(reduceRoute(routeInitialState, { type: "" })).toMatchSnapshot();
  });

  describe("join", () => {
    test("an user joins a channel", () => {
      expect(
        reduceRoute(
          routeInitialState,
          messageCallbacks.join("serverKey", user, ["#channel"]),
          {
            servers: { serverKey: serverInitialState },
          },
        ),
      ).toMatchSnapshot();
    });

    test("I join a channel myself", () => {
      expect(
        reduceRoute(
          routeInitialState,
          messageCallbacks.join("serverKey", user, ["#channel"]),
          {
            servers: {
              serverKey: {
                ...serverInitialState,
                user: { ...serverInitialState.user, nick: user.nick },
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
          { serverKey: "serverKey", channelKey: STATUS },
          closeWindow({ serverKey: "serverKey", channelKey: STATUS }),
          { servers: { serverKey: serverInitialState } },
        ),
      ).toMatchSnapshot();

      expect(
        reduceRoute(
          { serverKey: "serverKey1", channelKey: STATUS },
          closeWindow({ serverKey: "serverKey1", channelKey: STATUS }),
          {
            servers: {
              serverKey1: serverInitialState,
              serverKey2: serverInitialState,
            },
          },
        ),
      ).toMatchSnapshot();
    });

    test("channel", () => {
      expect(
        reduceRoute(
          { serverKey: "serverKey", channelKey: "#channel" },
          closeWindow({ serverKey: "serverKey", channelKey: "#channel" }),
          { servers: { serverKey: serverInitialState } },
        ),
      ).toMatchSnapshot();
    });
  });

  describe("switch window", () => {
    test("status", () => {
      expect(
        reduceRoute(
          routeInitialState,
          switchWindow({ serverKey: "serverKey", channelKey: STATUS }),
        ),
      ).toMatchSnapshot();
    });

    test("channel", () => {
      expect(
        reduceRoute(
          routeInitialState,
          switchWindow({ serverKey: "serverKey", channelKey: "#channel" }),
        ),
      ).toMatchSnapshot();
    });
  });
});
