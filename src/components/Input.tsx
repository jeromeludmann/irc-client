import React, { PureComponent, ChangeEvent, KeyboardEvent } from "react";

interface Props {
  value: string;
  placeholder?: string;
  onType: (input: string) => void;
  onEnter: (input: string) => void;
  onArrowUp: () => void;
  onArrowDown: () => void;
}

export default class Input extends PureComponent<Props> {
  private static ARROW = { UP: 38, DOWN: 40 };

  public render() {
    return (
      <input
        placeholder={this.props.placeholder}
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyDown}
      />
    );
  }

  private handleChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    this.props.onType(value);
  };

  private handleKeyPress = ({
    key,
    currentTarget: { value },
  }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      this.props.onEnter(value);
    }
  };

  private handleKeyDown = ({ keyCode }: KeyboardEvent<HTMLInputElement>) => {
    switch (keyCode) {
      case Input.ARROW.UP:
        return this.props.onArrowUp();
      case Input.ARROW.DOWN:
        return this.props.onArrowDown();
    }
  };
}
