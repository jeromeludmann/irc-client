import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import { ServerListTypes } from "@app/actions/server";
import { ConnectedServer } from "@app/ui/tmp/ConnectedServer";

interface StateProps {
  serverNames: string[];
}

interface DispatchProps {
  onClick: (serverName: string) => void;
}

class App extends React.Component<StateProps & DispatchProps, {}> {
  public render() {
    return (
      <div>
        <button onClick={this.handleClick}>Add server</button>

        {this.props.serverNames.map(name => (
          <ConnectedServer key={name} name={name} />
        ))}
      </div>
    );
  }

  private handleClick = () => {
    this.props.onClick(`irc.${Date.now()}`);
  };
}

function mapStateToProps(state: RootState): StateProps {
  return {
    serverNames: state.servers ? Object.keys(state.servers) : [],
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onClick(server: string) {
      dispatch({
        type: ServerListTypes.ADD,
        scope: { server },
      });
    },
  };
}

export default connect<StateProps, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
