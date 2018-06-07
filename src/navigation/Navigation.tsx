import React, { Component, MouseEvent } from "react";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import { getServers } from "@app/state/servers";
import { setActiveWindow } from "@app/navigation/actions";

interface StateProps {
  current: {
    server: string;
    channel: string;
  };
  servers: {
    [server: string]: {
      channels: {
        [channel: string]: {
          unread: boolean;
        };
      };
    };
  };
}

interface DispatchProps {
  onChannelClick: (server: string, channel: string) => void;
}

class Navigation extends Component<StateProps & DispatchProps> {
  public render() {
    const { current, servers } = this.props;

    return (
      <>
        {Object.keys(servers).map(server => (
          <ul
            key={server}
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "6px",
            }}
          >
            {Object.keys(servers[server].channels).map(channel => {
              const active =
                server === current.server && channel === current.channel;
              const unread = servers[server].channels[channel].unread;

              return (
                <li key={`${server}/${channel}`} style={{ marginTop: "3px" }}>
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

const mapStateToProps = (state: RootState): StateProps => ({
  current: state.current,
  servers: getServers(state),
});

const mapDispatchToProps = {
  onChannelClick: setActiveWindow,
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
