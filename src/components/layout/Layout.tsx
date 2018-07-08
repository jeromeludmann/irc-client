import React, { Component } from "react";
import { ServersState } from "@app/reducers/servers";
import { RouteState } from "@app/reducers/route";
import { MessagesState } from "@app/reducers/channel/messages";
import { Route } from "@app/Route";
import Navigation from "@app/components/navigation/Navigation";
import Input from "@app/components/input";
import MessageList from "@app/components/messages/MessageList";
import {
  ChatBox,
  NavBox,
  MessagesBox,
  InputBox,
} from "@app/components/layout/style";

interface Props {
  servers: ServersState;
  window: RouteState;
  messages: MessagesState;
  onChannelSwitch: (route: Route) => void;
}

export class Layout extends Component<Props> {
  public render() {
    return (
      <>
        <NavBox>
          <Navigation
            servers={this.props.servers}
            window={this.props.window}
            onChannelButtonClick={this.props.onChannelSwitch}
          />
        </NavBox>

        <ChatBox>
          <MessagesBox>
            <MessageList messages={this.props.messages} />
          </MessagesBox>

          <InputBox>
            <Input />
          </InputBox>
        </ChatBox>
      </>
    );
  }
}
