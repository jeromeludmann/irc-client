import { reduceHistory } from "@app/reducers/input/history";
import {
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/ui";

describe("reduce input history by dispatching", () => {
  test("enter value", () => {
    expect(
      reduceHistory(undefined, enterInputValue("I'm typing something")),
    ).toMatchSnapshot();
  });

  describe("go back", () => {
    test("at the begin of history", () => {
      expect(
        reduceHistory({ index: 0, values: [] }, goBackInputHistory()),
      ).toMatchSnapshot();
    });

    test("anywhere in the history", () => {
      expect(
        reduceHistory(
          { index: 2, values: ["hello", "world"] },
          goBackInputHistory(),
        ),
      ).toMatchSnapshot();
    });
  });

  describe("go forward", () => {
    test("anywhere in the history", () => {
      expect(
        reduceHistory(
          { index: 1, values: ["hello", "world"] },
          goForwardInputHistory(),
        ),
      ).toMatchSnapshot();
    });

    test("at the end of history", () => {
      expect(
        reduceHistory(
          { index: 2, values: ["hello", "world"] },
          goForwardInputHistory(),
        ),
      ).toMatchSnapshot();
    });
  });
});
