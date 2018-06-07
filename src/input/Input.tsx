import React from "react";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import { getValue } from "@app/state/input";
import { changeInput, sendInput } from "@app/input/actions";

type OwnProps = {
  server: string;
  channel: string;
};

type StateProps = {
  value: string;
};

type DispatchProps = {
  onChange: (input: string, server: string, channel: string) => void;
  onEnter: (input: string, server: string, channel: string) => void;
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
    this.props.onChange(
      e.currentTarget.value,
      this.props.server,
      this.props.channel,
    );
  };

  private handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      this.props.onEnter(
        e.currentTarget.value,
        this.props.server,
        this.props.channel,
      );
    }
  };
}

const mapStateToProps = (
  state: RootState,
  { server, channel }: OwnProps,
): StateProps => ({ value: getValue(state, server, channel) });

const mapDispatchToProps: DispatchProps = {
  onChange: changeInput,
  onEnter: sendInput,
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
