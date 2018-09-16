import { messageReceivers } from "@app/actions/msgIncoming";
import { switchWindow } from "@app/actions/ui";
import { reduceBuffer } from "@app/reducers/buffer";

describe("reduce channel", () => {
  const extraParams = {
    user: { nick: "nick", user: "user", real: "name" },
    route: { serverKey: "server1", channelKey: "#channel" },
  };

  describe("activity", () => {
    it("should receive JOIN", () => {
      expect(
        reduceBuffer(
          undefined,
          messageReceivers["JOIN"](
            "server1",
            {
              nick: "nick",
              user: "user",
              host: "host",
            },
            ["#channel"],
          ),
          extraParams,
        ),
      ).toMatchSnapshot();
    });

    it("should switch window", () => {
      expect(
        reduceBuffer(
          undefined,
          switchWindow({ serverKey: "server1", bufferKey: "#channel" }),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });
});
