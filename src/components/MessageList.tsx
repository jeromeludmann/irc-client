import React from "react";

interface Props {
  messages: string[];
}

export default ({ messages }: Props) => (
  // TODO do not use index
  <ul
    style={{
      fontFamily: "Menlo, Monaco, Courier",
      fontSize: "12px",
      listStyle: "none",
      padding: "0",
    }}
  >
    {messages.map((message, i) => <li key={i}>{message}</li>)}
  </ul>
);
