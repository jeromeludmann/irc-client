import React, { PureComponent, MouseEvent, CSSProperties } from "react";

interface Props {
  servers: {
    [serverKey: string]: {
      buffers: { [bufferKey: string]: { unread: boolean } };
    };
  };
  window: {
    serverKey: string;
    bufferKey: string;
  };
  onBufferButtonClick: (
    { serverKey, bufferKey }: { serverKey: string; bufferKey: string },
  ) => void;
}

export default class Navigation extends PureComponent<Props> {
  public render() {
    const { window, servers } = this.props;

    return (
      <>
        {Object.keys(servers).map(serverKey => (
          <ul key={serverKey} style={{ listStyle: "none", padding: "0" }}>
            {Object.keys(servers[serverKey].buffers).map(bufferKey => {
              const isActive =
                serverKey === window.serverKey &&
                bufferKey === window.bufferKey;
              const isUnread = servers[serverKey].buffers[bufferKey].unread;
              const style: CSSProperties = {
                outline: "none",
                border: "1px solid #ddd",
                width: "100px",
                color: isActive ? "black" : "#bbb",
                backgroundColor: isUnread ? "yellow" : "#fff",
              };

              return (
                <li key={bufferKey} style={{ marginBottom: "5px" }}>
                  <button
                    onClick={this.handleClick}
                    data-server-key={serverKey}
                    data-buffer-key={bufferKey}
                    style={style}
                  >
                    {bufferKey}
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
    const bufferKey = e.currentTarget.getAttribute("data-buffer-key");

    if (serverKey && bufferKey) {
      this.props.onBufferButtonClick({ serverKey, bufferKey });
    }
  };
}
