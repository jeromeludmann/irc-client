import React from "react";
import { shallow } from "enzyme";
import { getStore } from "@app/store";
import Input from "@app/components/input";

describe("Input container", () => {
  it("should render correctly", () => {
    expect(
      shallow(<Input />, { context: { store: getStore("server1") } })
    ).toMatchSnapshot();
  });
});
