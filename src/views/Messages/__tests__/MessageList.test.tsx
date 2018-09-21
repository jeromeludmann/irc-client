import React from "react";
import { shallow } from "enzyme";
import MessageList from "@app/views/Messages/Messages";

describe("MessageList component", () => {
  const messages = ["hello", "world"];

  it("should render correctly", () => {
    expect(shallow(<MessageList messages={messages} />)).toMatchSnapshot();
  });
});
