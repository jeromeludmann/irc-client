import React from "react";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import { getMessages } from "@app/state/channel/messages";

interface OwnProps {
  server: string;
  channel: string;
}

interface StateProps {
  messages: Message[];
}

interface Message {
  timestamp: number;
  value: string;
}

const MessageList = ({ messages }: OwnProps & StateProps) => {
  return (
    <ul style={{ listStyle: "none", padding: "5px 10px" }}>
      {messages.map(message => (
        <li key={message.timestamp}>
          {message.timestamp} | {message.value}
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (
  state: RootState,
  { server, channel }: OwnProps,
): StateProps => ({ messages: getMessages(state, server, channel) });

export default connect<StateProps, void, OwnProps>(mapStateToProps)(
  MessageList,
);
