import React from "react";
import { shallow, mount } from "enzyme";
import Navigation from "@app/components/navigation/Navigation";
import { STATUS } from "@app/Route";
import { channelsInitialState } from "@app/reducers/server/channels";
import { channelInitialState } from "@app/reducers/channel";

describe("Navigation component", () => {
  const props = {
    onChannelButtonClick: jest.fn(),
    servers: {
      server1: {
        name: "server.domain",
        channels: {
          ...channelsInitialState,
          "#channel": { ...channelInitialState, activity: true }
        }
      }
    },
    window: { serverKey: "server1", channelKey: STATUS }
  };

  it("should render correctly", () => {
    expect(shallow(<Navigation {...props} />)).toMatchSnapshot();
  });

  it("should handle button click event", () => {
    mount(<Navigation {...props} />)
      .find("button")
      .first()
      .simulate("click");
  });
});
