import React from "react";
import { shallow } from "enzyme";
import { getStore } from "@app/store";
import MessageList from "@app/components/messages";

describe("MessageList container", () => {
  it("should render correctly", () => {
    expect(
      shallow(<MessageList />, { context: { store: getStore("server1") } })
    ).toMatchSnapshot();
  });
});
