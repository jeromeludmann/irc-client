import React from "react";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import { getMessages } from "@app/state/channel/messages";

interface OwnProps {
  server: string;
  channel: string;
}

interface StateProps {
  messages: string[];
}

const MessageList = ({ messages }: OwnProps & StateProps) => (
  <ul style={{ listStyle: "none", padding: "5px 10px" }}>
    {messages.map(message => <li key={message}>{message}</li>)}
  </ul>
);

const mapStateToProps = (
  state: RootState,
  { server, channel }: OwnProps,
): StateProps => ({ messages: getMessages(state, server, channel) });

export default connect<StateProps, void, OwnProps>(mapStateToProps)(
  MessageList,
);
