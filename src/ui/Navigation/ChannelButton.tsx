import React, { MouseEvent, Component } from "react";

interface Props {
  server: string;
  channel?: string;
  active: boolean;
  unread: boolean;
  onChannelClick: (server: string, channel?: string) => void;
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
          backgroundColor: active ? "red" : "#333",
          color: active ? "#111" : "red",
          fontWeight: unread ? "bold" : "normal",
          outline: "none",
          width: "100%",
          height: "24px",
          border: 0,
          fontSize: channel ? "12px" : "13px",
        }}
      >
        {channel || server}
      </button>
    );
  }

  private handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const server = e.currentTarget.getAttribute("data-server");
    const channel = e.currentTarget.getAttribute("data-channel") || undefined; // explicitly set to undefined if null

    if (server) {
      this.props.onChannelClick(server, channel);
    }
  };
}
