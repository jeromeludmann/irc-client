import React from 'react'
import { User } from '@app/utils/Message'
import { List } from '@app/views/Navigation/style'
import { ListItem } from '@app/views/Nicklist/style'

interface Props {
  users: User[]
}

export default ({ users }: Props) => (
  <List>
    {users.map(user => (
      <ListItem key={user.nick}>{user.nick}</ListItem>
    ))}
  </List>
)
