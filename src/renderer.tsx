import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { injectGlobal } from 'styled-components'
import { Layout } from '@app/views/Layout'
import { store } from '@app/store'

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root'),
)

// tslint:disable-next-line
injectGlobal`
  * {
    box-sizing: border-box;
    font-family: Menlo, Monaco, Courier;
    font-size: 12px;
  }
`
