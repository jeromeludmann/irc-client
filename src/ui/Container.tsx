import React, { Component } from "react";
import { connect } from "react-redux";
import { setActiveWindow } from "@app/actions";
import { RootState } from "@app/state";
import { selectServers, ServerListState } from "@app/state/servers";
import { ActiveState } from "@app/state/active";
import { selectActiveRoute } from "@app/state/selectors";
import { selectMessages, MessageListState } from "@app/state/channel/messages";
import { selectValue } from "@app/state/input/selectors";
import { ValueState } from "@app/state/input/value";
import Navigation from "@app/ui/Navigation";
import MessageList from "@app/ui/MessageList";
import Input from "@app/ui/Input";
import {
  sendValue,
  goBackHistory,
  goForwardHistory,
  updateValue,
} from "@app/effects/input";

interface StateProps {
  servers: ServerListState;
  active: ActiveState;
  messages: MessageListState;
  inputValue: ValueState;
}

interface DispatchProps {
  onWindowSwitch: (server: string, channel: string) => void;
  onInputType: (input: string) => void;
  onInputEnter: (input: string) => void;
  onInputArrowUp: () => void;
  onInputArrowDown: () => void;
}

class Container extends Component<StateProps & DispatchProps> {
  public render() {
    return (
      <>
        <Navigation
          servers={this.props.servers}
          active={this.props.active}
          onChannelClick={this.props.onWindowSwitch}
        />

        <MessageList messages={this.props.messages} />

        <Input
          value={this.props.inputValue}
          onType={this.props.onInputType}
          onEnter={this.props.onInputEnter}
          onArrowUp={this.props.onInputArrowUp}
          onArrowDown={this.props.onInputArrowDown}
        />
      </>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  messages: selectMessages(state),
  active: selectActiveRoute(state),
  servers: selectServers(state),
  inputValue: selectValue(state),
});

const mapDispatchToProps: DispatchProps = {
  onWindowSwitch: setActiveWindow, // TODO it should be an effect
  onInputType: updateValue,
  onInputEnter: sendValue,
  onInputArrowUp: goBackHistory,
  onInputArrowDown: goForwardHistory,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
