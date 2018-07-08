import React from "react";
import { MessageList, MessageListItem } from "@app/components/messages/style";

interface Props {
  messages: string[];
}

export default ({ messages }: Props) => (
  // TODO
  // do NOT use index as a key
  // instead generate a timestamp on each message
  <MessageList>
    {messages.map((message, i) => (
      <MessageListItem key={i}>{message}</MessageListItem>
    ))}
  </MessageList>
);
