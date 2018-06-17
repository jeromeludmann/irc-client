export const mocked = {
  servers: {
    "irc.empty": {
      modes: [],
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
      modes: [],
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
    server: "default",
    channel: "status",
  },
};
