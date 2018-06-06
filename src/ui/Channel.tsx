import React from "react";
import { connect } from "react-redux";
import { ChannelScope } from "@app/types";
import { RootState } from "@app/state";
import { getMessagesCount } from "@app/state/channel/messages";
import MessageList from "@app/ui/MessageList";
import Input from "@app/ui/Input";

type OwnProps = {
  scope: ChannelScope;
};

interface StateProps {
  count: number;
}

const Channel = ({ scope, count }: OwnProps & StateProps) => (
  <div style={{ backgroundColor: "#ddd", padding: "10px", margin: "10px" }}>
    <span>{scope.channel}</span>
    <div>Messages: {count}</div>
    <MessageList scope={scope} />
    <Input scope={scope} />
  </div>
);

const mapStateToProps = (
  state: RootState,
  { scope }: OwnProps,
): StateProps => ({ count: getMessagesCount(scope, state) });

export default connect<StateProps, void, OwnProps>(mapStateToProps)(Channel);
