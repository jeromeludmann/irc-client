import { reduceInputValue } from "@app/reducers/input/value";
import {
  updateInputValue,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/ui";

describe("reduce input value by dispatching", () => {
  const extraStates = {
    input: {
      value: "",
      dirtyValue: "",
      history: { index: 0, values: [] },
    },
  };

  test("update input value", () => {
    expect(
      reduceInputValue(undefined, updateInputValue("hello"), extraStates),
    ).toMatchSnapshot();
  });

  test("enter input value", () => {
    expect(
      reduceInputValue(undefined, enterInputValue("hello"), extraStates),
    ).toMatchSnapshot();
  });

  describe("go back input history", () => {
    test("at the begin of history", () => {
      expect(
        reduceInputValue(undefined, goBackInputHistory(), {
          input: {
            value: "",
            dirtyValue: "",
            history: { index: 0, values: ["hello"] },
          },
        }),
      ).toMatchSnapshot();
    });

    test("anywhere in the history", () => {
      expect(
        reduceInputValue(undefined, goBackInputHistory(), {
          input: {
            value: "",
            dirtyValue: "",
            history: { index: 1, values: ["hello", "world"] },
          },
        }),
      ).toMatchSnapshot();
    });
  });

  describe("go forward input history", () => {
    test("anywhere in the history", () => {
      expect(
        reduceInputValue(undefined, goForwardInputHistory(), {
          input: {
            value: "",
            dirtyValue: "",
            history: { index: 1, values: ["hello", "world"] },
          },
        }),
      ).toMatchSnapshot();
    });

    test("at the end of history", () => {
      expect(
        reduceInputValue(undefined, goForwardInputHistory(), {
          input: {
            value: "",
            dirtyValue: "",
            history: { index: 2, values: ["hello", "world"] },
          },
        }),
      ).toMatchSnapshot();
    });
  });
});
