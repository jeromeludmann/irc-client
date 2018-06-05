import React from "react";
import { CommandInput } from "@app/CommandInput/connected";

interface Props {
  name: string;
  serverName: string;
  messages: string[];
  count: number;
}

export class Channel extends React.Component<Props, {}> {
  public render() {
    return (
      <div style={{ backgroundColor: "#ddd", padding: "10px", margin: "10px" }}>
        <span>{this.props.name}</span>

        <div>Messages: {this.props.count}</div>

        <ul>
          {this.props.messages.map(message => {
            return <li key={message}>{message}</li>;
          })}
        </ul>

        <CommandInput
          server={this.props.serverName}
          channel={this.props.name}
        />
      </div>
    );
  }
}
