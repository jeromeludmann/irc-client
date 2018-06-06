import React from "react";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import { getServers } from "@app/state/servers";
import ChannelButton from "@app/ui/Navigation/ChannelButton";

interface StateProps {
  current: {
    server: string;
    channel?: string;
  };
  servers: {
    [server: string]: {
      status: {
        unread: boolean;
      };
      channels: {
        [channel: string]: {
          unread: boolean;
        };
      };
    };
  };
}

interface DispatchProps {
  onChannelClick: (server: string, channel?: string) => void;
}

const Navigation = ({
  current,
  servers,
  onChannelClick,
}: StateProps & DispatchProps) => (
  <>
    {Object.keys(servers).map(server => (
      <ul
        key={server}
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        <li style={{ marginTop: "6px" }}>
          <ChannelButton
            server={server}
            active={server === current.server && !current.channel}
            unread={servers[server].status.unread}
            onChannelClick={onChannelClick}
          />
        </li>

        {Object.keys(servers[server].channels).map(channel => (
          <li key={`${server}/${channel}`} style={{ marginTop: "3px" }}>
            <ChannelButton
              server={server}
              channel={channel}
              active={server === current.server && channel === current.channel}
              unread={servers[server].channels[channel].unread}
              onChannelClick={onChannelClick}
            />
          </li>
        ))}
      </ul>
    ))}
  </>
);

const mapStateToProps = (state: RootState): StateProps => ({
  current: state.current,
  servers: getServers(state),
});

const mapDispatchToProps = {
  onChannelClick: (server: string, channel?: string) => {
    return {
      type: "APP/SWITCH_CHANNEL", // TODO extract action
      payload: { server, channel },
    };
  },
};

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);
