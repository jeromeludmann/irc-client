import React from "react";
import { connect } from "react-redux";
// types
import { ChannelScope } from "@app/types";
// state
import { RootState } from "@app/state";
import { getMessagesCount } from "@app/state/channel";
// ui
import MessageList from "@app/ui/MessageList";
import Input from "@app/ui/Input";

type OwnProps = {
  scope: ChannelScope;
};

interface StateProps {
  count: number;
}

class Channel extends React.Component<OwnProps & StateProps, {}> {
  public render() {
    return (
      <div style={{ backgroundColor: "#ddd", padding: "10px", margin: "10px" }}>
        <span>{this.props.scope.channel}</span>
        <div>Messages: {this.props.count}</div>
        <MessageList scope={this.props.scope} />
        <Input scope={this.props.scope} />
      </div>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  { scope }: OwnProps,
): StateProps => ({ count: getMessagesCount(scope, state) });

export default connect<StateProps, void, OwnProps>(mapStateToProps)(Channel);
