import React from "react";
import { connect } from "react-redux";
import { ChannelScope } from "@app/types";
import { RootState } from "@app/state";
import { getMessages } from "@app/state/server/channel/message-list";

type OwnProps = ChannelScope & {};

interface StateProps {
  messages: string[];
}

class MessageList extends React.PureComponent<OwnProps & StateProps> {
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

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  messages: getMessages(state, {
    server: ownProps.server,
    channel: ownProps.channel,
  }),
});

export default connect<StateProps, void, OwnProps>(mapStateToProps)(
  MessageList,
);
