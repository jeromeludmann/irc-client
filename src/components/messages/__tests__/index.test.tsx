import React from "react";
import { shallow } from "enzyme";
import { store } from "@app/store";
import MessageList from "@app/components/messages";

describe("MessageList container", () => {
  it("should render correctly", () => {
    expect(shallow(<MessageList />, { context: { store } })).toMatchSnapshot();
  });
});
