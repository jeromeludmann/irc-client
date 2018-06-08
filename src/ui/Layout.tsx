import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "@app/state";
import Navigation from "@app/ui/Navigation";
import MessageList from "@app/ui/MessageList";
import Input from "@app/ui/Input";

interface StateProps {
  server: string;
  channel: string;
}

class Layout extends Component<StateProps> {
  public render() {
    return (
      <div
        style={{
          backgroundColor: "#111",
          color: "#ccc",
          fontFamily: "Menlo, Monaco, Courier",
          fontSize: "12px",
          position: "fixed",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          padding: "0",
        }}
      >
        <div
          style={{
            position: "absolute",
            margin: 0,
            top: 0,
            bottom: 0,
            width: "100px",
            padding: "10px",
          }}
        >
          <Navigation />
        </div>

        <div
          style={{
            position: "absolute",
            left: "120px",
            right: 0,
            top: 0,
            bottom: 0,
            border: 0,
            borderLeft: "1px solid #666",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              borderBottom: "1px dashed #333",
            }}
          >
            <MessageList {...this.props} />
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
            <Input route={this.props} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ current }: RootState): StateProps => ({
  server: current.server,
  channel: current.channel,
});

export default connect<StateProps>(mapStateToProps)(Layout);
