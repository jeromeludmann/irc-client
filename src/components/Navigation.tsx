import React, { PureComponent, MouseEvent, CSSProperties } from "react";
import { STATUS } from "@app/Route";

interface Props {
  servers: {
    [serverKey: string]: {
      name: string;
      channels: { [channelKey: string]: { unread: boolean } };
    };
  };
  window: {
    serverKey: string;
    channelKey: string;
  };
  onChannelButtonClick: (
    { serverKey, channelKey }: { serverKey: string; channelKey: string },
  ) => void;
}

export default class Navigation extends PureComponent<Props> {
  public render() {
    const { window, servers } = this.props;

    return (
      <>
        {Object.keys(servers).map(serverKey => (
          <ul key={serverKey} style={{ listStyle: "none", padding: "0" }}>
            {Object.keys(servers[serverKey].channels).map(channelKey => {
              const isActive =
                serverKey === window.serverKey &&
                channelKey === window.channelKey;
              const isUnread = servers[serverKey].channels[channelKey].unread;
              const style: CSSProperties = {
                outline: "none",
                border: "1px solid #ddd",
                width: "200px",
                height: "30px",
                color: isActive ? "black" : "#bbb",
                backgroundColor: isUnread ? "yellow" : "#fff",
              };

              return (
                <li key={channelKey} style={{ marginBottom: "5px" }}>
                  <button
                    onClick={this.handleClick}
                    data-server-key={serverKey}
                    data-channel-key={channelKey}
                    style={style}
                  >
                    {channelKey === STATUS
                      ? servers[serverKey].name
                      : channelKey}
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
    const serverKey = e.currentTarget.getAttribute("data-server-key");
    const channelKey = e.currentTarget.getAttribute("data-channel-key");

    if (serverKey && channelKey) {
      this.props.onChannelButtonClick({ serverKey, channelKey });
    }
  };
}
