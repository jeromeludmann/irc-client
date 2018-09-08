import { reduceInput, inputInitialState } from "@app/reducers/channel/input";
import {
  updateInputValue,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/ui";

describe("reduce input", () => {
  const historyValues = ["hello", "world"];

  describe("update input value", () => {
    it("anywhere in history", () => {
      expect(
        reduceInput(
          {
            ...inputInitialState,
            history: { index: 1, values: historyValues },
          },
          updateInputValue("hello"),
        ),
      ).toMatchSnapshot();
    });

    it("at the end of history", () => {
      expect(
        reduceInput(
          {
            ...inputInitialState,
            history: { index: 2, values: historyValues },
          },
          updateInputValue("hello"),
        ),
      ).toMatchSnapshot();
    });
  });

  describe("enter input value", () => {
    expect(reduceInput(undefined, enterInputValue("hello"))).toMatchSnapshot();
  });

  describe("go back input history", () => {
    it("at the begin of history", () => {
      expect(
        reduceInput(
          {
            ...inputInitialState,
            history: { index: 0, values: historyValues },
          },
          goBackInputHistory(),
        ),
      ).toMatchSnapshot();
    });

    it("anywhere in history", () => {
      expect(
        reduceInput(
          {
            ...inputInitialState,
            history: { index: 1, values: historyValues },
          },
          goBackInputHistory(),
        ),
      ).toMatchSnapshot();
    });
  });

  describe("go forward input history", () => {
    it("anywhere in the history", () => {
      expect(
        reduceInput(
          {
            ...inputInitialState,
            history: { index: 1, values: historyValues },
          },
          goForwardInputHistory(),
        ),
      ).toMatchSnapshot();
    });

    it("at the end of history", () => {
      expect(
        reduceInput(
          {
            ...inputInitialState,
            history: { index: 2, values: historyValues },
          },
          goForwardInputHistory(),
        ),
      ).toMatchSnapshot();
    });
  });
});
