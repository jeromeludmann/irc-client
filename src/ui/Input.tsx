import React from "react";
import { connect } from "react-redux";
import { ChannelScope } from "@app/types";
import { RootState } from "@app/state";
import {
  getValue,
  updateInput,
  sendInput,
} from "@app/state/server/channel/input";

type OwnProps = ChannelScope & {};

type StateProps = {
  value: string;
};

type DispatchProps = {
  onChange: (input: string, scope: ChannelScope) => void;
  onEnter: (input: string, scope: ChannelScope) => void;
};

class Input extends React.PureComponent<OwnProps & StateProps & DispatchProps> {
  public render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { server, channel } = this.props;
    this.props.onChange(e.currentTarget.value, { server, channel });
  };

  private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { server, channel } = this.props;
      this.props.onEnter(e.currentTarget.value, { server, channel });
    }
  };
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  value: getValue(state, {
    server: ownProps.server,
    channel: ownProps.channel,
  }),
});

const mapDispatchToProps: DispatchProps = {
  onChange: updateInput,
  onEnter: sendInput,
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
