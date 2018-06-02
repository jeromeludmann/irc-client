import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getValue } from "@app/CommandInput/selectors";
import { RootState } from "@app/reducers/rootReducer";
import { CommandInput as Component } from "@app/CommandInput/component";

interface OwnProps {
  server: string;
  channel: string;
}

interface StateProps {
  value: string;
}

interface DispatchProps {
  onChange: (
    command: string,
    scope: { server: string; channel: string },
  ) => void;
  onEnter: (
    command: string,
    scope: { server: string; channel: string },
  ) => void;
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  value: getValue(state, {
    server: ownProps.server,
    channel: ownProps.channel,
  }),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChange(
    command: string,
    { server, channel }: { server: string; channel: string },
  ) {
    dispatch({
      type: "COMMAND_CHANGED",
      payload: {
        server,
        channel,
        value: command,
      },
    });
  },
  onEnter(
    command: string,
    { server, channel }: { server: string; channel: string },
  ) {
    dispatch({
      type: "COMMAND_SENT",
      payload: {
        server,
        channel,
        value: command,
      },
    });
  },
});

export const CommandInput = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
