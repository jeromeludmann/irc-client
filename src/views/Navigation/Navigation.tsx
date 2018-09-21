import React, { PureComponent, MouseEvent } from 'react'
import { isStatus, isRaw } from '@app/utils/Route'
import { List, ListItem, Button } from '@app/views/navigation/style'

interface Props {
  servers: {
    [serverKey: string]: {
      name: string
      buffers: { [buffer: string]: { activity: boolean } }
    }
  }
  window: {
    serverKey: string
    bufferKey: string
  }
  onWindowButtonClick: (
    { serverKey, bufferKey }: { serverKey: string; bufferKey: string },
  ) => void
}

export default class Navigation extends PureComponent<Props> {
  public render() {
    const { window, servers } = this.props

    return (
      <>
        {Object.keys(servers).map(serverKey => (
          <List key={serverKey}>
            {Object.keys(servers[serverKey].buffers).map(bufferKey => (
              <ListItem key={bufferKey}>
                <Button
                  onClick={this.handleClick}
                  data-server-key={serverKey}
                  data-buffer-key={bufferKey}
                  isActive={
                    serverKey === window.serverKey &&
                    bufferKey === window.bufferKey
                  }
                  hasActivity={servers[serverKey].buffers[bufferKey].activity}
                >
                  {isStatus(bufferKey)
                    ? servers[serverKey].name
                    : isRaw(bufferKey)
                      ? serverKey
                      : bufferKey}
                </Button>
              </ListItem>
            ))}
          </List>
        ))}
      </>
    )
  }

  private handleClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    this.props.onWindowButtonClick({
      serverKey: currentTarget.getAttribute('data-server-key')!,
      bufferKey: currentTarget.getAttribute('data-buffer-key')!,
    })
  }
}
