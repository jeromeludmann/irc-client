import React, { PureComponent, MouseEvent } from "react";
import { STATUS, RAW } from "@app/Route";
import { List, ListItem, Button } from "@app/components/navigation/style";

interface Props {
  servers: {
    [serverKey: string]: {
      name: string;
      channels: { [channelKey: string]: { activity: boolean } };
    };
  };
  window: {
    serverKey: string;
    channelKey: string;
  };
  onChannelButtonClick: (
    { serverKey, channelKey }: { serverKey: string; channelKey: string }
  ) => void;
}

export default class Navigation extends PureComponent<Props> {
  public render() {
    const { window, servers } = this.props;

    return (
      <>
        {Object.keys(servers).map(serverKey => (
          <List key={serverKey}>
            {Object.keys(servers[serverKey].channels).map(channelKey => (
              <ListItem key={channelKey}>
                <Button
                  onClick={this.handleClick}
                  data-server-key={serverKey}
                  data-channel-key={channelKey}
                  isActive={
                    serverKey === window.serverKey &&
                    channelKey === window.channelKey
                  }
                  hasActivity={servers[serverKey].channels[channelKey].activity}
                >
                  {channelKey === STATUS
                    ? servers[serverKey].name
                    : channelKey === RAW
                      ? serverKey
                      : channelKey}
                </Button>
              </ListItem>
            ))}
          </List>
        ))}
      </>
    );
  }

  private handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const serverKey = e.currentTarget.getAttribute("data-server-key") as string;
    const channelKey = e.currentTarget.getAttribute(
      "data-channel-key"
    ) as string;

    this.props.onChannelButtonClick({ serverKey, channelKey });
  };
}
