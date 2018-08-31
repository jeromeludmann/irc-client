import { reduceUser } from "@app/reducers/server/user";
import { messageCallbacks } from "@app/actions/messages";

describe("reduce user", () => {
  test("without action", () => {
    expect(reduceUser(undefined, { type: "" })).toMatchSnapshot();
  });

  test("receive NICK", () => {
    expect(
      reduceUser(
        undefined,
        messageCallbacks["NICK"](
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
        messageCallbacks["NICK"](
          "server1",
          { nick: "old_nick", user: "user", host: "host" },
          ["new_nick"],
        ),
      ),
    ).toMatchSnapshot();
  });
});
