import React from "react";
import { connect } from "react-redux";
import { Scope } from "@app/types";
import { RootState } from "@app/state";
import { getMessages } from "@app/state/channel/messages";

type OwnProps = {
  scope: Scope;
};

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
  { scope }: OwnProps,
): StateProps => ({ messages: getMessages(scope, state) });

export default connect<StateProps, void, OwnProps>(mapStateToProps)(
  MessageList,
);
