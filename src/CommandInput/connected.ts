import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getValue } from "@app/CommandInput/selectors";
import { RootState } from "@app/reducers/rootReducer";
import { CommandInput as Component } from "@app/CommandInput/component";

interface OwnProps {
  serverName: string;
  channelName: string;
}

interface StateProps {
  value: string;
}

interface DispatchProps {
  onChange: (command: string) => void;
  onEnter: (command: string) => void;
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
  return {
    value: getValue(state, {
      server: ownProps.serverName,
      channel: ownProps.channelName,
    }),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    onChange(command: string) {
      dispatch({
        type: "COMMAND_CHANGED",
        payload: {
          server: ownProps.serverName,
          channel: ownProps.channelName,
          value: command,
        },
      });
    },
    onEnter(command: string) {
      dispatch({
        type: "COMMAND_SENT",
        payload: {
          server: ownProps.serverName,
          channel: ownProps.channelName,
          value: command,
        },
      });
    },
  };
}

export const CommandInput = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
