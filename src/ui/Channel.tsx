import React from "react";
import { connect } from "react-redux";
import { Scope } from "@app/types";
import { RootState } from "@app/state";
import MessageList from "@app/ui/MessageList";
import Input from "@app/ui/Input";

interface StateProps {
  scope: Scope;
}

const Channel = ({ scope }: StateProps) => (
  <>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        borderBottom: "1px dashed #333",
      }}
    >
      <MessageList scope={scope} />
    </div>

    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid #666",
      }}
    >
      <Input scope={scope} />
    </div>
  </>
);

const mapStateToProps = ({ current }: RootState): StateProps => ({
  scope: {
    server: current.server,
    channel: current.channel,
  },
});

export default connect<StateProps, void>(mapStateToProps)(Channel);
