import React, { MouseEvent, Component } from "react";

interface Props {
  server: string;
  channel: string;
  active: boolean;
  unread: boolean;
  onChannelClick: (server: string, channel: string) => void;
}

export default class ChannelButton extends Component<Props> {
  public render() {
    const { server, channel, active, unread } = this.props;
    return (
      <button
        onClick={this.handleClick}
        data-server={server}
        data-channel={channel}
        style={{
          backgroundColor: active ? "#ccc" : "#333",
          color: active ? "#111" : "#ccc",
          fontWeight: unread ? "bold" : "normal",
          outline: "none",
          width: "100%",
          height: "24px",
          border: 0,
          fontSize: channel ? "12px" : "13px",
        }}
      >
        {channel === "status" ? server : channel}
      </button>
    );
  }

  private handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const server = e.currentTarget.getAttribute("data-server");
    const channel = e.currentTarget.getAttribute("data-channel"); // explicitly set to undefined if null

    if (server && channel) {
      this.props.onChannelClick(server, channel);
    }
  };
}
