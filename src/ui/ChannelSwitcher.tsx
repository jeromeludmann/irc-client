import React from "react";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import Channel from "@app/ui/Channel";

interface StateProps {
  server: string;
  channel: string;
}

const ChannelSwitcher = ({ server, channel }: StateProps) => (
  <Channel scope={{ server, channel }} />
);

function mapStateToProps({ current }: RootState): StateProps {
  return {
    server: current.server,
    channel: current.channel,
  };
}

export default connect<StateProps>(mapStateToProps)(ChannelSwitcher);
