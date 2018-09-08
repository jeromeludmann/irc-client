import {
  sendPart,
  sendPingToServer,
  sendPongToServer,
  sendQuit,
  sendUser,
} from "@app/actions/msgOutgoing";

describe("send messages", () => {
  describe("PART", () => {
    it("without message", () => {
      expect(sendPart("server1", "#channel")).toMatchSnapshot();
    });

    it("with message", () => {
      expect(sendPart("server1", "#channel", "Goodbye!")).toMatchSnapshot();
    });
  });

  it("PING", () => {
    expect(sendPingToServer("server1", "key")).toMatchSnapshot();
  });

  it("PONG", () => {
    expect(sendPongToServer("server1", "key")).toMatchSnapshot();
  });

  describe("QUIT", () => {
    it("without message", () => {
      expect(sendQuit("server1")).toMatchSnapshot();
    });

    it("with message", () => {
      expect(sendQuit("server1", "Goodbye!")).toMatchSnapshot();
    });
  });

  it("USER", () => {
    expect(sendUser("server1", "username", "Real Name")).toMatchSnapshot();
  });
});
