import React from "react";

interface Props {
  server: string;
  channel: string;
  value: string;
  onChange: (
    command: string,
    scope: { server: string; channel: string },
  ) => void;
  onEnter: (
    command: string,
    scope: { server: string; channel: string },
  ) => void;
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
    const { server, channel } = this.props;
    this.props.onChange(e.currentTarget.value, { server, channel });
  };

  private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { server, channel } = this.props;
      this.props.onEnter(e.currentTarget.value, { server, channel });
    }
  };
}
