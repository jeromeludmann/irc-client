import React from "react";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import { getMessagesCount } from "@app/state/channel";
import { ChannelScope } from "@app/types";
import Input from "@app/ui/input";
import MessageList from "@app/ui/MessageList";

type OwnProps = ChannelScope & {};

interface StateProps {
  count: number;
}

class Channel extends React.Component<OwnProps & StateProps, {}> {
  public render() {
    return (
      <div style={{ backgroundColor: "#ddd", padding: "10px", margin: "10px" }}>
        <span>{this.props.channel}</span>
        <div>Messages: {this.props.count}</div>
        <MessageList server={this.props.server} channel={this.props.channel} />
        <Input server={this.props.server} channel={this.props.channel} />
      </div>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  { server, channel }: OwnProps,
): StateProps => ({
  count: getMessagesCount(state, { server, channel }),
});

export default connect<StateProps, void, OwnProps>(mapStateToProps)(Channel);
