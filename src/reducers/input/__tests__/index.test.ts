import { reduceInput } from "@app/reducers/input";

describe("reduce input", () => {
  test("", () => {
    expect(reduceInput(undefined, { type: "" })).toMatchSnapshot();
  });
});
