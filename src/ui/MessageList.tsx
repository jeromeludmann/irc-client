import React from "react";

interface Props {
  messages: Message[];
}

interface Message {
  timestamp: number;
  value: string;
}

export default ({ messages }: Props) => (
  <ul>
    {messages.map(message => (
      <li key={message.timestamp}>
        {message.timestamp} | {message.value}
      </li>
    ))}
  </ul>
);
