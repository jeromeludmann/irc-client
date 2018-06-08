import React, { KeyboardEvent, ChangeEvent } from "react";
import { connect } from "react-redux";
import { ChannelRoute } from "@app/Route";
import { RootState } from "@app/state";
import { selectValue } from "@app/state/input/selectors";
import {
  updateValue,
  sendValue,
  goForwardHistory,
  goBackHistory,
} from "@app/effects/input";

interface OwnProps {
  route: ChannelRoute;
}

interface StateProps {
  value: string;
}

interface DispatchProps {
  onType: (route: ChannelRoute, input: string) => void;
  onEnter: (route: ChannelRoute, input: string) => void;
  onArrowUp: (route: ChannelRoute) => void;
  onArrowDown: (route: ChannelRoute) => void;
}

const mapStateToProps = (
  state: RootState,
  { route }: OwnProps,
): StateProps => ({
  value: selectValue(route, state),
});

const mapDispatchToProps: DispatchProps = {
  onType: updateValue,
  onEnter: sendValue,
  onArrowUp: goBackHistory,
  onArrowDown: goForwardHistory,
};

class Input extends React.PureComponent<OwnProps & StateProps & DispatchProps> {
  private static ARROW = { UP: 38, DOWN: 40 };

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
        onKeyDown={this.handleKeyDown}
      />
    );
  }

  private handleChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    this.props.onType(this.props.route, value);
  };

  private handleKeyPress = ({
    key,
    currentTarget: { value },
  }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      this.props.onEnter(this.props.route, value);
    }
  };

  private handleKeyDown = ({ keyCode }: KeyboardEvent<HTMLInputElement>) => {
    switch (keyCode) {
      case Input.ARROW.UP:
        return this.props.onArrowUp(this.props.route);
      case Input.ARROW.DOWN:
        return this.props.onArrowDown(this.props.route);
    }
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Input);
