import {
  messagesReceived,
  sendPart,
  sendPingToServer,
  sendPongToServer,
  sendQuit,
  sendUser,
} from "@app/actions/messages";

describe("messages actions", () => {
  it("should receive PRIVMSG", () => {
    expect(
      messagesReceived["PRIVMSG"](
        "server1",
        { nick: "nick1", user: "user", host: "host" },
        ["nick2", "hello world"],
      ),
    ).toMatchSnapshot();
  });

  describe("should send PART", () => {
    it("without message", () => {
      expect(sendPart("server1", "#channel")).toMatchSnapshot();
    });

    it("with message", () => {
      expect(sendPart("server1", "#channel", "Goodbye!")).toMatchSnapshot();
    });
  });

  it("should send PING", () => {
    expect(sendPingToServer("server1", "key")).toMatchSnapshot();
  });

  it("should send PONG", () => {
    expect(sendPongToServer("server1", "key")).toMatchSnapshot();
  });

  describe("should send QUIT", () => {
    it("without message", () => {
      expect(sendQuit("server1")).toMatchSnapshot();
    });

    it("with message", () => {
      expect(sendQuit("server1", "Goodbye!")).toMatchSnapshot();
    });
  });

  it("should send USER", () => {
    expect(sendUser("server1", "username", "Real Name")).toMatchSnapshot();
  });
});
