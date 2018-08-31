import { reduceChannels } from "@app/reducers/server/channels";
import { closeWindow } from "@app/actions/ui";
import {
  STATUS,
  BROADCAST_NONE,
  BROADCAST_ACTIVE,
  BROADCAST_ALL,
} from "@app/Route";
import { channelInitialState } from "@app/reducers/channel";

describe("reduce channels", () => {
  const extraStates = {
    route: { serverKey: "server1", channelKey: "" },
    user: { nick: "nick", user: "user", real: "name" },
  };

  describe("without action", () => {
    test("without channel", () => {
      expect(
        reduceChannels(
          undefined,
          { type: "", route: { serverKey: "server1", channelKey: "" } },
          extraStates,
        ),
      ).toMatchSnapshot();
    });

    test("with channel", () => {
      expect(
        reduceChannels(
          undefined,
          { type: "", route: { serverKey: "server1", channelKey: "#channel" } },
          extraStates,
        ),
      ).toMatchSnapshot();
    });
  });

  describe("close window", () => {
    test("status window", () => {
      expect(
        reduceChannels(
          {
            [STATUS]: channelInitialState,
            "#channel": channelInitialState,
            private: channelInitialState,
          },
          closeWindow({ serverKey: "server1", channelKey: STATUS }),
          extraStates,
        ),
      ).toMatchSnapshot();
    });

    test("channel window", () => {
      expect(
        reduceChannels(
          undefined,
          closeWindow({ serverKey: "server1", channelKey: "#channel" }),
          extraStates,
        ),
      ).toMatchSnapshot();
    });

    test("private window", () => {
      expect(
        reduceChannels(
          undefined,
          closeWindow({ serverKey: "server1", channelKey: "nick" }),
          extraStates,
        ),
      ).toMatchSnapshot();
    });
  });

  describe("broadcast", () => {
    test("none", () => {
      expect(
        reduceChannels(
          undefined,
          {
            type: "",
            route: { serverKey: "server1", channelKey: BROADCAST_NONE },
          },
          extraStates,
        ),
      ).toMatchSnapshot();
    });

    test("active", () => {
      expect(
        reduceChannels(
          undefined,
          {
            type: "",
            route: { serverKey: "server1", channelKey: BROADCAST_ACTIVE },
          },
          extraStates,
        ),
      ).toMatchSnapshot();
    });

    test("all", () => {
      expect(
        reduceChannels(
          undefined,
          {
            type: "",
            route: { serverKey: "server1", channelKey: BROADCAST_ALL },
          },
          extraStates,
        ),
      ).toMatchSnapshot();
    });
  });
});
