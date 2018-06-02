import { connect } from "react-redux";
import { RootState } from "@app/reducers/rootReducer";
import { getMessages } from "@app/Channel/selectors";
import { Channel as Component } from "@app/Channel/component";

interface OwnProps {
  server: string;
  name: string;
}

interface StateProps {
  messages: string[];
  count: number;
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  messages: getMessages(state, {
    server: ownProps.server,
    channel: ownProps.name,
  }),
  count: getMessagesCount(state, {
    server: ownProps.server,
    channel: ownProps.name,
  }),
});

export const Channel = connect<StateProps, void, OwnProps>(mapStateToProps)(
  Component,
);
