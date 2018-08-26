import { reduceMessages } from "@app/reducers/channel/messages";
import {
  setConnectionClosed,
  setConnectionFailed,
  receiveRawMessages,
} from "@app/actions/socket";
import {
  messageCallbacks,
  sendPongToServerEmbedded,
  sendPrivmsgEmbedded,
} from "@app/actions/messages";
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

  test("ERROR", () => {
    expect(
      reduceMessages(
        undefined,
        messageCallbacks["ERROR"]("server1", undefined, ["error message"]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  test("JOIN", () => {
    expect(
      reduceMessages(
        undefined,
        messageCallbacks["JOIN"]("server1", user, ["#channel"]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  describe("NOTICE", () => {
    test("from server", () => {
      expect(
        reduceMessages(
          undefined,
          messageCallbacks["NOTICE"]("server1", "server.prefix", [
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
          messageCallbacks["NOTICE"]("server1", user, [
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
          messageCallbacks["NOTICE"]("server1", user, [
            "nick",
            "notice from user",
          ]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  describe("PART", () => {
    test("without message", () => {
      expect(
        reduceMessages(
          undefined,
          messageCallbacks["PART"]("server1", user, ["#channel"]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });

    test("with message", () => {
      expect(
        reduceMessages(
          undefined,
          messageCallbacks["PART"]("server1", user, ["#channel", "Goodbye!"]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  describe("print help", () => {
    test("by default", () => {
      expect(
        reduceMessages(
          undefined,
          commands["help"].callback({
            serverKey: "server1",
            channelKey: "#channel",
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
              channelKey: "#channel",
            },
            "msg",
          ),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  test("raw messages received", () => {
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

  describe("PING", () => {
    test("from server", () => {
      expect(
        reduceMessages(
          undefined,
          messageCallbacks["PING"]("server1", "server.prefix", ["key"]),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  test("PRIVMSG", () => {
    expect(
      reduceMessages(
        undefined,
        messageCallbacks["PRIVMSG"]("server1", user, ["#channel", "hello!"]),
        extraParams,
      ),
    ).toMatchSnapshot();
  });

  test("RPL_MYINFO", () => {
    expect(
      reduceMessages(
        undefined,
        messageCallbacks["004"]("server1", "server.prefix", [
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
    test("to server", () => {
      expect(
        reduceMessages(
          undefined,
          sendPongToServerEmbedded("server1", "key"),
          extraParams,
        ),
      ).toMatchSnapshot();
    });
  });

  test("send PRIVMSG", () => {
    expect(
      reduceMessages(
        undefined,
        sendPrivmsgEmbedded("server1", "#channel", "hello"),
        extraParams,
      ),
    );
  });
});
