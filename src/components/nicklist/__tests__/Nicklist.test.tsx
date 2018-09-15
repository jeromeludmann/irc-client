import React from "react";
import { shallow } from "enzyme";
import Nicklist from "@app/components/nicklist/Nicklist";
import { User } from "@app/utils/Message";

describe("Nicklist component", () => {
  const users: User[] = [
    { nick: "nick1", user: "user1", host: "host1" },
    { nick: "nick2", user: "user2", host: "host2" },
    { nick: "nick3", user: "user3", host: "host3" }
  ];

  it("should render correctly", () => {
    expect(shallow(<Nicklist users={users} />)).toMatchSnapshot();
  });
});
