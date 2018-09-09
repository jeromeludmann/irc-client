import { reduceMessages } from "@app/reducers/messages";
import {
  setConnectionClosed,
  setConnectionFailed,
  receiveRawMessages,
} from "@app/actions/socket";
import { messageReceivers } from "@app/actions/msgIncoming";
import { sendPongToServer, sendPrivmsg } from "@app/actions/msgOutgoing";
import { commands } from "@app/actions/commands";

describe("reduce channel messages by dispatching", () => {
  const extraParams = {
    user: { nick: "nick", user: "user", real: "name" },
    route: { serverKey: "server1", channelKey: "#channel" },
  };

  const user = { nick: "nick", user: "user", host: "host" };

  test("connection closed", () => {
    expect(
      reduceMessages(
        undefined,
        setConnectionClosed("server1", false),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  test("connection failed", () => {
    expect(
      reduceMessages(
        undefined,
        setConnectionFailed("server1", "Error", "Connection error"),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  test("receive ERROR", () => {
    expect(
      reduceMessages(
        undefined,
        messageReceivers["ERROR"]("server1", undefined, ["error message"]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  test("receive JOIN", () => {
    expect(
      reduceMessages(
        undefined,
        messageReceivers["JOIN"]("server1", user, ["#channel"]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  describe("receive NOTICE", () => {
    test("from server", () => {
      expect(
        reduceMessages(
          undefined,
          messageReceivers["NOTICE"]("server1", "server.prefix", [
            "",
            "notice from server",
          ]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });

    test("from channel", () => {
      expect(
        reduceMessages(
          undefined,
          messageReceivers["NOTICE"]("server1", user, [
            "#channel",
            "notice from channel",
          ]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });

    test("from user", () => {
      expect(
        reduceMessages(
          undefined,
          messageReceivers["NOTICE"]("server1", user, [
            "nick",
            "notice from user",
          ]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  describe("receive PART", () => {
    test("without message", () => {
      expect(
        reduceMessages(
          undefined,
          messageReceivers["PART"]("server1", user, ["#channel"]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });

    test("with message", () => {
      expect(
        reduceMessages(
          undefined,
          messageReceivers["PART"]("server1", user, ["#channel", "Goodbye!"]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  test("receive PONG (from server)", () => {
    expect(
      reduceMessages(
        undefined,
        messageReceivers["PONG"]("server1", "irc.network", [
          "irc.network",
          "key",
        ]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  describe("print help", () => {
    test("by default", () => {
      expect(
        reduceMessages(
          undefined,
          commands["help"].callback({
            serverKey: "server1",
            bufferKey: "#channel",
          }),
          extraParams,
        ),
      ).toMatchSnapshot();
    });

    test("about command", () => {
      expect(
        reduceMessages(
          undefined,
          commands["help"].callback(
            {
              serverKey: "server1",
              bufferKey: "#channel",
            },
            "msg",
          ),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  test("receive raw messages", () => {
    expect(
      reduceMessages(
        undefined,
        receiveRawMessages("server1", [
          "PRIVMSG #channel :hello",
          "NICK :newNick",
        ]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  describe("receive PING", () => {
    test("from server", () => {
      expect(
        reduceMessages(
          undefined,
          messageReceivers["PING"]("server1", "server.prefix", ["key"]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  test("receive PRIVMSG", () => {
    expect(
      reduceMessages(
        undefined,
        messageReceivers["PRIVMSG"]("server1", user, ["#channel", "hello!"]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  test("receive RPL_MYINFO", () => {
    expect(
      reduceMessages(
        undefined,
        messageReceivers["004"]("server1", "server.prefix", [
          "",
          "serverName",
          "version",
          "user modes",
          "channel modes",
        ]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  describe("send PONG", () => {
    const sendPongToServerAction = sendPongToServer("server1", "key")
      .embeddedAction;
    if (sendPongToServerAction) {
      test("to server", () => {
        expect(
          reduceMessages(undefined, sendPongToServerAction, extraParams),
        ).toMatchSnapshot();
      });
    }
  });

  test("send PRIVMSG", () => {
    const sendPrivmsgAction = sendPrivmsg("server1", "#channel", "hello")
      .embeddedAction;
    if (sendPrivmsgAction) {
      expect(reduceMessages(undefined, sendPrivmsgAction, extraParams));
    }
  });
});
