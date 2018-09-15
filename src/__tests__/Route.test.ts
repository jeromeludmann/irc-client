import { isPrivate } from "@app/utils/Route";

const nick = "nickname";
const channel = "#general";

describe("Route", () => {
  test("isPrivate", () => {
    expect(isPrivate(nick)).toBeTruthy();
    expect(isPrivate(channel)).toBeFalsy();
  });
});
