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
  <div style={{ border: "1px dashed #ccc", width: "100%" }}>
    <MessageList scope={scope} />
    <Input scope={scope} />
    <div>messages counter: {count}</div>
  </div>
);

const mapStateToProps = (
  state: RootState,
  { scope }: OwnProps,
): StateProps => ({ count: getMessagesCount(scope, state) });

export default connect<StateProps, void, OwnProps>(mapStateToProps)(Channel);
