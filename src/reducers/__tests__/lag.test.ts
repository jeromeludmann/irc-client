import { reduceLag } from "@app/reducers/lag";
import { messageReceivers } from "@app/actions/msgIncoming";

test("reduce server lag", () => {
  expect(
    reduceLag(
      undefined,
      messageReceivers["PONG"]("server1", "irc.network", ["server1", "key"]),
    ),
  ).toMatchSnapshot();
});
