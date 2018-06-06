import React from "react";
import { connect } from "react-redux";
import { ChannelScope } from "@app/types";
import { RootState } from "@app/state";
import { getMessages } from "@app/state/channel/messages";

type OwnProps = {
  scope: ChannelScope;
};

interface StateProps {
  messages: string[];
}

const MessageList = ({ messages }: OwnProps & StateProps) => (
  <ul>{messages.map(message => <li key={message}>{message}</li>)}</ul>
);

const mapStateToProps = (
  state: RootState,
  { scope }: OwnProps,
): StateProps => ({ messages: getMessages(scope, state) });

export default connect<StateProps, void, OwnProps>(mapStateToProps)(
  MessageList,
);
