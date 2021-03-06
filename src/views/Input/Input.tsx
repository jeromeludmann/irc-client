import React, { PureComponent, ChangeEvent, KeyboardEvent } from 'react'
import { InputField } from '@app/views/Input/style'

interface Props {
  placeholder?: string
  onType: (input: string) => void
  onEnter: (input: string) => void
  onArrowUp: () => void
  onArrowDown: () => void
}

interface DefaultProps {
  value?: string
}

export default class Input extends PureComponent<Props & DefaultProps> {
  public static defaultProps: DefaultProps = {
    value: '',
  }

  public static ARROW = {
    UP: 38,
    DOWN: 40,
  }

  public render() {
    return (
      <InputField
        placeholder={this.props.placeholder || 'Your command/message here'}
        type="text"
        value={this.props.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyDown}
      />
    )
  }

  private handleChange = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    this.props.onType(value)
  }

  private handleKeyPress = ({
    key,
    currentTarget: { value },
  }: KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      this.props.onEnter(value)
    }
  }

  private handleKeyDown = ({ keyCode }: KeyboardEvent<HTMLInputElement>) => {
    switch (keyCode) {
      case Input.ARROW.UP:
        return this.props.onArrowUp()
      case Input.ARROW.DOWN:
        return this.props.onArrowDown()
    }
  }
}
