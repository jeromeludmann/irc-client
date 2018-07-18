import { isPrivate } from "@app/Route";

const nick = "nickname";
const channel = "#general";

describe("Route", () => {
  test("isPrivate", () => {
    expect(isPrivate(nick)).toBeTruthy();
    expect(isPrivate(channel)).toBeFalsy();
  });
});
