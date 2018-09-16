import { reduceServerModes } from "@app/reducers/modes";

test("reduce modes", () => {
  expect(reduceServerModes(undefined)).toMatchSnapshot();
});
