import React from "react";
import { connect } from "react-redux";
import { Scope } from "@app/types";
import { changeInput, sendInput } from "@app/actions/input";
import { RootState } from "@app/state";
import { getValue } from "@app/state/input";

type OwnProps = {
  scope: Scope;
};

type StateProps = {
  value: string;
};

type DispatchProps = {
  onChange: (scope: Scope, input: string) => void;
  onEnter: (scope: Scope, input: string) => void;
};

class Input extends React.PureComponent<OwnProps & StateProps & DispatchProps> {
  public render() {
    return (
      <input
        style={{
          width: "100%",
          height: "30px",
          border: 0,
          outline: "none",
          fontFamily: "Menlo, Monaco, Courier",
          backgroundColor: "#111",
          color: "#ccc",
          padding: "5px 10px",
        }}
        placeholder="Your message here"
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
