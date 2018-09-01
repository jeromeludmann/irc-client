import React from "react";
import { mount, ReactWrapper, shallow } from "enzyme";
import Input from "@app/components/input/Input";

interface Props {
  onArrowDown: () => void;
  onArrowUp: () => void;
  onEnter: () => void;
  onType: () => void;
  value: string;
}

describe("Input component", () => {
  let props: Props;
  let input: ReactWrapper;

  beforeEach(() => {
    props = {
      onArrowDown: jest.fn(),
      onArrowUp: jest.fn(),
      onEnter: jest.fn(),
      onType: jest.fn(),
      value: "hello"
    };

    input = mount(<Input {...props} />)
      .find("input")
      .first();
  });

  it("should render correctly", () => {
    expect(shallow(<Input {...props} />)).toMatchSnapshot();
  });

  it("should handle change event", () => {
    input.simulate("change", { target: { value: "a" } });
    expect(props.onType).toBeCalled();
  });

  it("should handle ↩ key press event", () => {
    input.simulate("keyPress", { key: "Enter" });
    expect(props.onEnter).toBeCalled();
  });

  it("should handle some key press event", () => {
    input.simulate("keyPress", { key: "a" });
    expect(props.onEnter).not.toBeCalled();
  });

  it("should handle ↑ key", () => {
    input.simulate("keyDown", { keyCode: Input.ARROW.UP });
    expect(props.onArrowUp).toBeCalled();
  });

  it("should handle ↓ key", () => {
    input.simulate("keyDown", { keyCode: Input.ARROW.DOWN });
    expect(props.onArrowDown).toBeCalled();
  });
});
