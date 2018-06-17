import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { setActiveRoute } from "@app/actions/ui/active-route";
import { RootState } from "@app/state";
import { ServerRouterState } from "@app/state/server-router";
import { ActiveRouteState } from "@app/state/active";
import Navigation from "@app/ui/Navigation";
import MessageList from "@app/ui/MessageList";
import Input from "@app/ui/Input";
import { selectActiveRoute, selectServers } from "@app/state/selectors";
import { MessageListState } from "@app/state/channel/messages";
import { selectMessages } from "@app/state/channel/selectors";
import { selectValue } from "@app/state/input/selectors";
import {
  changeInputValue,
  sendInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/ui/input";

interface StateProps {
  servers: ServerRouterState;
  active: ActiveRouteState;
  messages: MessageListState;
  inputValue: string;
}

interface DispatchProps {
  onWindowSwitch: (server: string, channel: string) => void;
  onInputType: (value: string) => void;
  onInputEnter: (value: string) => void;
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

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  messages: selectMessages(state),
  active: selectActiveRoute(state),
  servers: selectServers(state),
  inputValue: selectValue(state),
});

const mapDispatchToProps: DispatchProps = {
  onWindowSwitch: setActiveRoute,
  onInputType: changeInputValue,
  onInputEnter: sendInputValue,
  onInputArrowUp: goBackInputHistory,
  onInputArrowDown: goForwardInputHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
