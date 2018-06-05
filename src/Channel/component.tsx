import React from "react";
import { CommandInput } from "@app/CommandInput/container";
import { MessageList } from "@app/MessageList/container";
import { ChannelScope } from "@app/types";

type Props = ChannelScope & {
  count: number;
};

export class Channel extends React.Component<Props, {}> {
  public render() {
    return (
      <div style={{ backgroundColor: "#ddd", padding: "10px", margin: "10px" }}>
        <span>{this.props.channel}</span>
        <div>Messages: {this.props.count}</div>
        <MessageList server={this.props.server} channel={this.props.channel} />
        <CommandInput server={this.props.server} channel={this.props.channel} />
      </div>
    );
  }
}
