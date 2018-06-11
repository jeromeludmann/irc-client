const mockedState = {
  servers: {
    "irc.empty": {
      channels: {
        status: {
          messages: [],
          input: {
            value: "",
            dirtyValue: "",
            history: { values: [], index: 0 },
          },
          unread: false,
        },
      },
    },
    "irc.filled": {
      channels: {
        status: {
          messages: [{ timestamp: 0, value: "Welcome!" }],
          input: {
            value: "",
            dirtyValue: "",
            history: { values: ["Welcome!"], index: 1 },
          },
          unread: false,
        },
        "#general": {
          messages: [
            { timestamp: 0, value: "Hello" },
            { timestamp: 1, value: "World!" },
          ],
          input: {
            value: "",
            dirtyValue: "",
            history: { values: ["Hello", "World!"], index: 2 },
          },
          unread: false,
        },
      },
    },
  },
  active: {
    server: "irc.empty",
    channel: "status",
  },
};

export default mockedState;
