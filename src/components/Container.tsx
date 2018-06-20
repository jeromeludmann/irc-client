import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { setWindow } from "@app/actions/ui/active-window";
import { RootState } from "@app/reducers";
import { ServerRouterState } from "@app/reducers/server-router";
import { ActiveWindowState } from "@app/reducers/active";
import Navigation from "@app/components/Navigation";
import MessageList from "@app/components/MessageList";
import Input from "@app/components/Input";
import {
  selectActiveWindow,
  selectServers,
  selectUser,
} from "@app/reducers/selectors";
import { MessageListState } from "@app/reducers/window/messages";
import { selectMessages } from "@app/reducers/window/selectors";
import { selectValue } from "@app/reducers/input/selectors";
import {
  changeInputValue,
  sendInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/ui/input";
import { Route } from "@app/Route";
import { UserState } from "@app/reducers/user";

interface StateProps {
  user: UserState;
  servers: ServerRouterState;
  active: ActiveWindowState;
  messages: MessageListState;
  inputValue: string;
}

interface DispatchProps {
  onWindowSwitch: (route: Route) => void;
  onInputType: (value: string) => void;
  onInputEnter: (value: string) => void;
  onInputArrowUp: () => void;
  onInputArrowDown: () => void;
}

class Container extends Component<StateProps & DispatchProps> {
  public render() {
    return (
      <>
        <div>nick: {this.props.user.nick}</div>

        <Navigation
          servers={this.props.servers}
          active={this.props.active}
          onWindowButtonClick={this.props.onWindowSwitch}
        />

        <Input
          value={this.props.inputValue}
          onType={this.props.onInputType}
          onEnter={this.props.onInputEnter}
          onArrowUp={this.props.onInputArrowUp}
          onArrowDown={this.props.onInputArrowDown}
        />

        <MessageList messages={this.props.messages} />
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  user: selectUser(state),
  messages: selectMessages(state),
  active: selectActiveWindow(state),
  servers: selectServers(state),
  inputValue: selectValue(state),
});

const mapDispatchToProps: DispatchProps = {
  onWindowSwitch: setWindow,
  onInputType: changeInputValue,
  onInputEnter: sendInputValue,
  onInputArrowUp: goBackInputHistory,
  onInputArrowDown: goForwardInputHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
