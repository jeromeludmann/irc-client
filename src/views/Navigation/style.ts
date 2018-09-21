import styled, { css } from 'styled-components'

export const List = styled.ul`
  margin-bottom: 10px;
  padding: 0;
  list-style: none;
`

export const ListItem = styled.li`
  margin: 5px 0;
  list-style: none;
`

interface ButtonProps {
  isActive: boolean
  hasActivity: boolean
}

export const Button = styled.button`
  outline: none;
  border: 1px solid #ddd;
  width: 100%;
  height: 30px;
  cursor: pointer;
  color: #bbb;
  background-color: white;
  font-weight: normal;
  &:hover {
    color: red;
  }

  ${(props: ButtonProps) =>
    props.isActive &&
    css`
      color: #333;
      font-weight: bold;
    `};

  ${(props: ButtonProps) =>
    props.hasActivity &&
    css`
      background-color: yellow;
    `};
`
