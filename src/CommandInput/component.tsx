import React from "react";

interface Props {
  value: string;
  onChange: (command: string) => void;
  onEnter: (command: string) => void;
}

export class CommandInput extends React.PureComponent<Props> {
  public render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.currentTarget.value);
  };

  private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.props.onEnter(e.currentTarget.value);
    }
  };
}
