import data from '../data.json'
import React from 'react'
import { render } from 'react-dom'
import Index from './index'

if (typeof window !== 'undefined') {
  data.url = window.location.pathname
}

render(<Index data={data}/>, document.body)
