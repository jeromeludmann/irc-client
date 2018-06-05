import { connect } from "react-redux";
import { RootState } from "@app/reducers/rootReducer";
import { MessageList as Component } from "@app/MessageList/component";
import { ChannelScope } from "@app/types";
import { getMessages } from "@app/MessageList/selectors";

type OwnProps = ChannelScope & {};

interface StateProps {
  messages: string[];
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  messages: getMessages(state, {
    server: ownProps.server,
    channel: ownProps.channel,
  }),
});

export const MessageList = connect<StateProps, void, OwnProps>(mapStateToProps)(
  Component,
);
