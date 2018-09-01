import { isPrefixServer, isPrefixUser } from "@app/Message";

describe("Message", () => {
  const server = "irc.network";
  const user = { nick: "nick", user: "user", host: "host" };

  describe("isPrefixServer", () => {
    it("should return true", () => {
      expect(isPrefixServer(server)).toBeTruthy();
    });

    it("should return false", () => {
      expect(isPrefixServer(user)).toBeFalsy();
    });
  });

  describe("isPrefixUser", () => {
    it("should return true", () => {
      expect(isPrefixUser(user)).toBeTruthy();
    });

    it("should return false", () => {
      expect(isPrefixUser(server)).toBeFalsy();
    });
  });
});
