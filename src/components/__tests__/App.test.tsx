import React from "react";
import { shallow } from "enzyme";
import { App } from "@app/components/App";

describe("App component", () => {
  it("should render correctly", () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
