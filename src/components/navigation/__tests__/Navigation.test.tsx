import React from "react";
import { shallow, mount } from "enzyme";
import Navigation from "@app/components/navigation/Navigation";
import { BufferKey } from "@app/utils/Route";
import { bufferRouterInitialState } from "@app/reducers/bufferRouter";
import { bufferInitialState } from "@app/reducers/buffer";

describe("Navigation component", () => {
  const props = {
    onChannelButtonClick: jest.fn(),
    servers: {
      server1: {
        name: "server.domain",
        channels: {
          ...bufferRouterInitialState,
          "#channel": { ...bufferInitialState, activity: true }
        }
      }
    },
    window: { serverKey: "server1", channelKey: BufferKey.STATUS }
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
