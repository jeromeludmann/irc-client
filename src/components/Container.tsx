import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { switchWindow } from "@app/actions/route";
import { RootState } from "@app/reducers";
import { ServersState } from "@app/reducers/servers";
import { RouteState } from "@app/reducers/route";
import Navigation from "@app/components/Navigation";
import MessageList from "@app/components/MessageList";
import Input from "@app/components/Input";
import { selectRoute, selectServers } from "@app/reducers/_selectors";
import { MessagesState } from "@app/reducers/channel/messages";
import { selectMessages } from "@app/reducers/channel/_selectors";
import { selectValue } from "@app/reducers/input/_selectors";
import {
  updateInputValue,
  enterInputValue,
  goBackInputHistory,
  goForwardInputHistory,
} from "@app/actions/input";
import { Route, RAW } from "@app/Route";
import { UserState } from "@app/reducers/server/user";
import { selectUser } from "@app/reducers/server/_selectors";

interface StateProps {
  user: UserState;
  servers: ServersState;
  window: RouteState;
  messages: MessagesState;
  inputValue: string;
}

interface DispatchProps {
  onChannelSwitch: (route: Route) => void;
  onInputType: (value: string) => void;
  onInputEnter: (value: string) => void;
  onInputArrowUp: () => void;
  onInputArrowDown: () => void;
}

class Container extends Component<StateProps & DispatchProps> {
  public render() {
    const server = this.props.servers[this.props.window.serverKey];
    return (
      <>
        <div>host: {server.name}</div>
        <div>key: {this.props.window.serverKey}</div>
        <div>current nick: {this.props.user.nick}</div>
        <div>available user modes: {server.availableModes.user}</div>
        <div>available channel modes: {server.availableModes.channel}</div>

        <Navigation
          servers={this.props.servers}
          window={this.props.window}
          onChannelButtonClick={this.props.onChannelSwitch}
        />

        {this.props.window.channelKey !== RAW && (
          <Input
            value={this.props.inputValue}
            onType={this.props.onInputType}
            onEnter={this.props.onInputEnter}
            onArrowUp={this.props.onInputArrowUp}
            onArrowDown={this.props.onInputArrowDown}
          />
        )}
        <MessageList messages={this.props.messages} />
      </>
    );
  }
}

const mapStateToProps: MapStateToProps<StateProps, {}, RootState> = state => ({
  user: selectUser(state),
  messages: selectMessages(state),
  window: selectRoute(state),
  servers: selectServers(state),
  inputValue: selectValue(state),
});

const mapDispatchToProps: DispatchProps = {
  onChannelSwitch: switchWindow,
  onInputType: updateInputValue,
  onInputEnter: enterInputValue,
  onInputArrowUp: goBackInputHistory,
  onInputArrowDown: goForwardInputHistory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
