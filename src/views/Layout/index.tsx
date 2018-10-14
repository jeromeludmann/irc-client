import React, { Component } from 'react'
import Navigation from '@app/views/Navigation'
import Messages from '@app/views/Messages'
import Input from '@app/views/Input'
import { ChatBox, NavBox, MessagesBox, InputBox } from '@app/views/Layout/style'

export class Layout extends Component {
  public render() {
    return (
      <>
        <NavBox>
          <Navigation />
        </NavBox>

        <ChatBox>
          <MessagesBox>
            <Messages />
          </MessagesBox>

          <InputBox>
            <Input />
          </InputBox>
        </ChatBox>
      </>
    )
  }
}
