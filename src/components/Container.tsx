import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { switchWindow } from "@app/actions/ui-window";
import { RootState } from "@app/reducers";
import { ServerRouterState } from "@app/reducers/server-router";
import { WindowState } from "@app/reducers/window";
import Navigation from "@app/components/Navigation";
import MessageList from "@app/components/MessageList";
import Input from "@app/components/Input";
import {
  selectWindow,
  selectServers,
  selectUser,
} from "@app/reducers/selectors";
import { MessageListState } from "@app/reducers/buffer-messages";
import { selectMessages } from "@app/reducers/buffer-selectors";
import { selectValue } from "@app/reducers/input-selectors";
import {
  updateInputValue,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/ui-input";
import { Route } from "@app/Route";
import { UserState } from "@app/reducers/user";

interface StateProps {
  user: UserState;
  servers: ServerRouterState;
  window: WindowState;
  messages: MessageListState;
  inputValue: string;
}

interface DispatchProps {
  onBufferSwitch: (route: Route) => void;
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
          window={this.props.window}
          onBufferButtonClick={this.props.onBufferSwitch}
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
  window: selectWindow(state),
  servers: selectServers(state),
  inputValue: selectValue(state),
});

const mapDispatchToProps: DispatchProps = {
  onBufferSwitch: switchWindow,
  onInputType: updateInputValue,
  onInputEnter: enterInputValue,
  onInputArrowUp: goBackInputHistory,
  onInputArrowDown: goForwardInputHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
