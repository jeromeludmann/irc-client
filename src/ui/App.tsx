import React, { Component } from "react";
import Navigation from "@app/ui/Navigation";
import ChannelSwitcher from "@app/ui/ChannelSwitcher";

export default class App extends Component {
  public render() {
    return (
      <div style={{ fontFamily: "Menlo, Monaco, Courier", fontSize: "12px" }}>
        <Navigation />
        <ChannelSwitcher />
      </div>
    );
  }
}
