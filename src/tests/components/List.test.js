import React from 'react'
import ReactDOM from 'react-dom'
import List from '../../components/list/List'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
