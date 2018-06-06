import React from "react";
import { connect } from "react-redux";
import { ChannelScope } from "@app/types";
import { changeInput, sendInput } from "@app/actions/input";
import { RootState } from "@app/state";
import { getValue } from "@app/state/input";

type OwnProps = {
  scope: ChannelScope;
};

type StateProps = {
  value: string;
};

type DispatchProps = {
  onChange: (scope: ChannelScope, input: string) => void;
  onEnter: (scope: ChannelScope, input: string) => void;
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
    this.props.onChange(this.props.scope, e.currentTarget.value);
  };

  private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.props.onEnter(this.props.scope, e.currentTarget.value);
    }
  };
}

const mapStateToProps = (
  state: RootState,
  { scope }: OwnProps,
): StateProps => ({ value: getValue(state, scope) });

const mapDispatchToProps: DispatchProps = {
  onChange: changeInput,
  onEnter: sendInput,
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
