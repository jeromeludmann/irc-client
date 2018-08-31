import { reduceInputDirtyValue } from "@app/reducers/input/dirtyValue";
import { updateInputValue, enterInputValue } from "@app/actions/ui";

describe("reduce input dirty value by dispatching", () => {
  const extraStates = {
    input: {
      value: "",
      dirtyValue: "",
      history: { index: 0, values: [] },
    },
  };

  describe("update input value", () => {
    test("anywhere in the history", () => {
      expect(
        reduceInputDirtyValue(undefined, updateInputValue("hello"), {
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
        reduceInputDirtyValue(undefined, updateInputValue("hello"), {
          input: {
            value: "",
            dirtyValue: "",
            history: { index: 2, values: ["hello", "world"] },
          },
        }),
      ).toMatchSnapshot();
    });
  });

  test("enter input value", () => {
    expect(
      reduceInputDirtyValue(undefined, enterInputValue("hello"), extraStates),
    ).toMatchSnapshot();
  });
});
