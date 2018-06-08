const mockedState = {
  servers: {
    "irc.empty": {
      channels: {
        status: {
          messages: [],
          input: {
            value: "",
            lastValue: "",
            history: [],
            historyIndex: 0,
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
            lastValue: "",
            history: ["Welcome!"],
            historyIndex: 1,
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
            lastValue: "",
            history: ["Hello", "World!"],
            historyIndex: 2,
          },
          unread: false,
        },
      },
    },
  },
  current: {
    server: "irc.empty",
    channel: "status",
  },
};

export default mockedState;
