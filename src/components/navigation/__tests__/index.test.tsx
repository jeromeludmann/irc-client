import React from "react";
import { shallow } from "enzyme";
import { getStore } from "@app/store";
import Navigation from "@app/components/navigation";

describe("Navigation container", () => {
  it("should render correctly", () => {
    expect(
      shallow(<Navigation />, { context: { store: getStore("server1") } })
    ).toMatchSnapshot();
  });
});
