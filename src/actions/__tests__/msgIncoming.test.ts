import { messageReceivers } from "@app/actions/msgIncoming";

describe("receive messages", () => {
  it("PRIVMSG", () => {
    expect(
      messageReceivers["PRIVMSG"](
        "server1",
        { nick: "nick1", user: "user", host: "host" },
        ["nick2", "hello world"],
      ),
    ).toMatchSnapshot();
  });
});
