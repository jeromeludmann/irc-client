import React from "react";
import { ChannelScope } from "@app/types";

type Props = ChannelScope & {
  messages: string[];
};

export class MessageList extends React.PureComponent<Props> {
  public render() {
    return (
      <ul>
        {this.props.messages.map(message => {
          return <li key={message}>{message}</li>;
        })}
      </ul>
    );
  }
}
