import data from '../data.json'
import React, { render } from 'react'
import App from './app'
import './styles/main.styl'

let url

if (typeof window !== 'undefined') {
  url = window.location.pathname
}

render(<App posts={data.posts} url={url}/>, document.body)
