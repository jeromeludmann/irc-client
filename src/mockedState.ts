const mockedState = {
  servers: {
    server1: {
      status: {
        messages: ["Welcome to server1"],
        input: { value: "", history: [""] },
        unread: false,
      },
      channels: {
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
      status: {
        messages: ["Welcome to server2"],
        input: { value: "", history: [""] },
        unread: false,
      },
      channels: {},
    },
  },
  current: {
    server: "server1",
  },
};

export default mockedState;
