import { commands } from "@app/actions/commands";

describe("commands actions", () => {
  const route = { serverKey: "server1", channelKey: "#channel" };

  it("should be able to call /close", () => {
    expect(commands.close.callback(route)).toMatchSnapshot();
  });

  it("should be able to call /join", () => {
    expect(commands.join.callback(route, "#channel")).toMatchSnapshot();
  });

  it("should be able to call /msg", () => {
    expect(commands.msg.callback(route, "#channel", "hello")).toMatchSnapshot();
  });

  it("should be able to call /nick", () => {
    expect(commands.nick.callback(route, "new_nick")).toMatchSnapshot();
  });

  it("should be able to call /part", () => {
    expect(
      commands.part.callback(route, "#channel", "Goodbye!"),
    ).toMatchSnapshot();
  });

  it("should be able to call /ping", () => {
    expect(commands.ping.callback(route)).toMatchSnapshot();
  });

  describe("should be able to call /server", () => {
    it("without option", () => {
      expect(
        commands.server.callback(route, "-n", "irc.network", "6667"),
      ).toMatchSnapshot();
    });

    it("with option -n", () => {
      expect(
        commands.server.callback(route, "irc.network", "6667"),
      ).toMatchSnapshot();
    });
  });

  it("should be able to call /quit", () => {
    expect(commands.quit.callback(route, "Goodbye!")).toMatchSnapshot();
  });

  it("should be able to call /raw", () => {
    expect(
      commands.raw.callback(route, "PRIVMSG #channel :hello world"),
    ).toMatchSnapshot();
  });
});
