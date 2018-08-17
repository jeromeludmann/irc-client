import { reduceAvailableServerModes } from "@app/reducers/server/availableModes";
import { replyInfoAction } from "@test/mocks/actions";

describe("available server modes reducer", () => {
  test("RPL_MYINFO", () => {
    expect(
      reduceAvailableServerModes(undefined, replyInfoAction),
    ).toMatchSnapshot();
  });
});
