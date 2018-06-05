import { connect } from "react-redux";
import { getValue } from "@app/CommandInput/selectors";
import { RootState } from "@app/reducers/rootReducer";
import { CommandInput as Component } from "@app/CommandInput/component";
import { updateCommand, sendCommand } from "@app/CommandInput/actions";
import { ChannelScope } from "@app/types";

type OwnProps = ChannelScope & {};

interface StateProps {
  value: string;
}

interface DispatchProps {
  onChange: (command: string, scope: ChannelScope) => void;
  onEnter: (command: string, scope: ChannelScope) => void;
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  value: getValue(state, {
    server: ownProps.server,
    channel: ownProps.channel,
  }),
});

const mapDispatchToProps: DispatchProps = {
  onChange: updateCommand,
  onEnter: sendCommand,
};

export const CommandInput = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
