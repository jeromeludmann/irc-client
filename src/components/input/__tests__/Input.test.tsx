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

describe("input component", () => {
  let props: Props;
  let input: ReactWrapper;

  beforeEach(() => {
    props = {
      onArrowDown: jest.fn(),
      onArrowUp: jest.fn(),
      onEnter: jest.fn(),
      onType: jest.fn(),
      value: "hello",
    };

    input = mount(<Input {...props} />)
      .find("input")
      .first();
  });

  test("renders", () => {
    expect(shallow(<Input {...props} />)).toMatchSnapshot();
  });

  test("on arrow up", () => {
    input.simulate("keyDown", { keyCode: Input.ARROW.UP });
    expect(props.onArrowUp).toBeCalled();
  });

  test("on arrow down", () => {
    input.simulate("keyDown", { keyCode: Input.ARROW.DOWN });
    expect(props.onArrowDown).toBeCalled();
  });

  test("on type", () => {
    input.simulate("change", { target: { value: "a" } });
    expect(props.onType).toBeCalled();
  });

  test("on enter", () => {
    input.simulate("keyPress", { key: "Enter" });
    expect(props.onEnter).toBeCalled();
  });

  test("on any key other than enter", () => {
    input.simulate("keyPress", { key: "a" });
    expect(props.onEnter).not.toBeCalled();
  });
});
