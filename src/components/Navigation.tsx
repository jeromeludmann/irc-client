import React, { PureComponent, MouseEvent, CSSProperties } from "react";

interface Props {
  servers: {
    [s: string]: {
      windows: { [w: string]: { unread: boolean } };
    };
  };
  active: {
    server: string;
    window: string;
  };
  onWindowButtonClick: (
    { server, window }: { server: string; window: string },
  ) => void;
}

export default class Navigation extends PureComponent<Props> {
  public render() {
    const { active, servers } = this.props;

    return (
      <>
        {Object.keys(servers).map(server => (
          <ul key={server} style={{ listStyle: "none", padding: "0" }}>
            {Object.keys(servers[server].windows).map(window => {
              const isActive =
                server === active.server && window === active.window;
              const isUnread = servers[server].windows[window].unread;
              const style: CSSProperties = {
                outline: "none",
                border: "1px solid #ddd",
                width: "100px",
                color: isActive ? "black" : "#bbb",
                backgroundColor: isUnread ? "yellow" : "#fff",
              };

              return (
                <li key={window} style={{ marginBottom: "5px" }}>
                  <button
                    onClick={this.handleClick}
                    data-server={server}
                    data-window={window}
                    style={style}
                  >
                    {window}
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
    const window = e.currentTarget.getAttribute("data-window");

    if (server && window) {
      this.props.onWindowButtonClick({ server, window });
    }
  };
}
