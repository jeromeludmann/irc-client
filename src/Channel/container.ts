import { connect } from "react-redux";
import { RootState } from "@app/reducers/rootReducer";
import { getMessagesCount } from "@app/Channel/selectors";
import { Channel as Component } from "@app/Channel/component";
import { ChannelScope } from "@app/types";

type OwnProps = ChannelScope & {};

interface StateProps {
  count: number;
}

const mapStateToProps = (
  state: RootState,
  { server, channel }: OwnProps,
): StateProps => ({
  count: getMessagesCount(state, { server, channel }),
});

export const Channel = connect<StateProps, void, OwnProps>(mapStateToProps)(
  Component,
);
