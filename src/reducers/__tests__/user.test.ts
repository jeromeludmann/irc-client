import { reduceUser } from "@app/reducers/user";
import { messageReceivers } from "@app/actions/msgIncoming";

describe("reduce user", () => {
  test("without action", () => {
    expect(reduceUser(undefined, { type: "" })).toMatchSnapshot();
  });

  test("receive NICK", () => {
    expect(
      reduceUser(
        undefined,
        messageReceivers["NICK"](
          "server1",
          { nick: "old_nick", user: "user", host: "host" },
          ["new_nick"],
        ),
      ),
    ).toMatchSnapshot();
  });

  test("receive NICK with the ", () => {
    expect(
      reduceUser(
        { nick: "old_nick", user: "user", real: "name" },
        messageReceivers["NICK"](
          "server1",
          { nick: "old_nick", user: "user", host: "host" },
          ["new_nick"],
        ),
      ),
    ).toMatchSnapshot();
  });
});
