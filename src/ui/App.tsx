import React, { Component } from "react";
import Navigation from "@app/ui/Navigation";
import Channel from "@app/ui/Channel";

export default class App extends Component {
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
          <Channel />
        </div>
      </div>
    );
  }
}
