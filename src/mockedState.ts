const mockedState = {
  servers: {
    server1: {
      channels: {
        status: {
          messages: ["Welcome to server1"],
          input: { value: "", history: [""] },
          unread: false,
        },
        "#chan1": {
          messages: ["Hello"],
          input: { value: "", history: [""] },
          unread: false,
        },
        "#chan2": {
          messages: ["world!"],
          input: { value: "", history: [""] },
          unread: false,
        },
      },
    },
    server2: {
      channels: {
        status: {
          messages: ["Welcome to server2"],
          input: { value: "", history: [""] },
          unread: false,
        },
      },
    },
  },
  current: {
    server: "server1",
    channel: "status",
  },
};

export default mockedState;
