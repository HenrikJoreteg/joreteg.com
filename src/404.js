import React, { Component } from 'react'

export default class FourOhFour extends Component {
  render () {
    return (
      <section>
        <h1>404, so sad</h1>
        <p>Maybe try the <a href='/blog/all'>list of all posts</a> or just <a href='/'>go home</a>.</p>
      </section>
    )
  }
}
