import { reduceHistory } from "@app/reducers/input/history";
import {
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/ui";
import { Action } from "redux";

describe("reduce input history by dispatching", () => {
  const makeRoutable = (action: Action<string>) => ({
    ...action,
    route: { serverKey: "server1", channelKey: "#channel" },
  });

  test("enter value", () => {
    expect(
      reduceHistory(
        undefined,
        makeRoutable(enterInputValue("I'm typing something")),
      ),
    ).toMatchSnapshot();
  });

  describe("go back", () => {
    test("at the begin of history", () => {
      expect(
        reduceHistory(
          { index: 0, values: [] },
          makeRoutable(goBackInputHistory()),
        ),
      ).toMatchSnapshot();
    });

    test("anywhere in the history", () => {
      expect(
        reduceHistory(
          { index: 2, values: ["hello", "world"] },
          makeRoutable(goBackInputHistory()),
        ),
      ).toMatchSnapshot();
    });
  });

  describe("go forward", () => {
    test("anywhere in the history", () => {
      expect(
        reduceHistory(
          { index: 1, values: ["hello", "world"] },
          makeRoutable(goForwardInputHistory()),
        ),
      ).toMatchSnapshot();
    });

    test("at the end of history", () => {
      expect(
        reduceHistory(
          { index: 2, values: ["hello", "world"] },
          makeRoutable(goForwardInputHistory()),
        ),
      ).toMatchSnapshot();
    });
  });
});
