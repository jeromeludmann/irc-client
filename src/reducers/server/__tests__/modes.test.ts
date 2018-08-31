import { reduceServerModes } from "@app/reducers/server/modes";

test("reduce modes", () => {
  expect(reduceServerModes(undefined)).toMatchSnapshot();
});
