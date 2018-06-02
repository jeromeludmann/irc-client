import { connect } from "react-redux";
import { RootState } from "@app/reducers/rootReducer";
import { getMessages } from "@app/Channel/selectors";
import { Channel as Component } from "@app/Channel/component";

interface OwnProps {
  serverName: string;
  name: string;
}

interface StateProps {
  messages: string[];
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
  return {
    messages: getMessages(state, {
      server: ownProps.serverName,
      channel: ownProps.name,
    }),
  };
}

export const Channel = connect<StateProps, void, OwnProps>(
  mapStateToProps,
)(Component);
