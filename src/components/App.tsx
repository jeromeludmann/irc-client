import React, { Component } from "react";
import Navigation from "@app/components/navigation";
import MessageList from "@app/components/messages";
import Input from "@app/components/input";
import { ChatBox, NavBox, MessagesBox, InputBox } from "@app/components/style";

export class App extends Component {
  public render() {
    return (
      <>
        <NavBox>
          <Navigation />
        </NavBox>

        <ChatBox>
          <MessagesBox>
            <MessageList />
          </MessagesBox>

          <InputBox>
            <Input />
          </InputBox>
        </ChatBox>
      </>
    );
  }
}
