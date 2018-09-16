import {
  connectToServer,
  setConnectionEstablished,
  lookup
} from "@app/actions/socket";

describe("socket actions", () => {
  describe("should generate ConnectServerAction", () => {
    it("with the existing connection", () => {
      expect(connectToServer("server1", "irc.network", 6667)).toMatchSnapshot();
    });

    it("with a new connection", () => {
      expect(
        connectToServer("server1", "irc.network", 6667, true)
      ).toMatchSnapshot();
    });
  });

  it("should generate ConnectionEstablishedAction", () => {
    expect(setConnectionEstablished("server1")).toMatchSnapshot();
  });

  it("should generate LookupFailedAction", () => {
    expect(
      lookup(
        "server1",
        new Error("error while looking up"),
        "address",
        "family",
        "irc.network"
      )
    ).toMatchSnapshot();
  });
});
