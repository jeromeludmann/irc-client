import React from "react";
import { connect } from "react-redux";
// types
import { ChannelScope } from "@app/types";
// state
import { RootState } from "@app/state";
import { getMessages } from "@app/state/channel/messages";

type OwnProps = {
  scope: ChannelScope;
};

interface StateProps {
  messages: string[];
}

class MessageList extends React.PureComponent<OwnProps & StateProps> {
  public render() {
    return (
      <ul>
        {this.props.messages.map(message => <li key={message}>{message}</li>)}
      </ul>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  { scope }: OwnProps,
): StateProps => ({ messages: getMessages(scope, state) });

export default connect<StateProps, void, OwnProps>(mapStateToProps)(
  MessageList,
);
