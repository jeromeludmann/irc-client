import { reduceLag } from "@app/reducers/server/lag";
import { messagesReceived } from "@app/actions/messages";

test("reduce server lag", () => {
  expect(
    reduceLag(
      undefined,
      messagesReceived["PONG"]("server1", "irc.network", ["server1", "key"]),
    ),
  ).toMatchSnapshot();
});
