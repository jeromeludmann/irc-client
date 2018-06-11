import React, { PureComponent, MouseEvent } from "react";

interface Props {
  servers: {
    [server: string]: {
      channels: {
        [channel: string]: {
          unread: boolean;
        };
      };
    };
  };
  active: {
    server: string;
    channel: string;
  };
  onChannelClick: (server: string, channel: string) => void;
}

export default class Navigation extends PureComponent<Props> {
  public render() {
    const { active, servers } = this.props;

    return (
      <>
        {Object.keys(servers).map(server => (
          <ul key={server}>
            {Object.keys(servers[server].channels).map(channel => {
              const isActive =
                server === active.server && channel === active.channel;
              // const isUnread = servers[server].channels[channel].unread;

              return (
                <li key={`${server}/${channel}`}>
                  <button
                    onClick={this.handleClick}
                    data-server={server}
                    data-channel={channel}
                  >
                    {channel === "status" ? server : channel}{" "}
                    {isActive && <span>&lt;</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
      </>
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
