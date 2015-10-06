import React, { Component } from 'react'
import classnames from 'classnames'

export default class Header extends Component {
  render () {
    let imageUrl
    let isShort = this.props.height === 'short'

    if (isShort) {
      imageUrl = 'https://static.joreteg.com/large_short_background.jpg'
    } else {
      imageUrl = 'https://static.joreteg.com/large_background.jpg'
    }

    return (
      <header className={classnames({short: isShort})}>
        <div>
          <img src={imageUrl}/>
        </div>
        <h2>{this.props.title}</h2>
        <p>{this.props.subtitle}</p>
        <p><a href='/blog/all'>all posts</a> | <a href='http://twitter.com/henrikjoreteg'>twitter</a> | <a href='mailto:henrik@joreteg.com'>email</a> | <a href='http://consulting.joreteg.com'>hire</a> | <a href='http://humanjavascript.com'>book</a> | <a href='http://learn.humanjavascript.com'>tutorials</a></p>
      </header>
    )
  }
}

Header.defaultProps = {
  title: 'Hi, I’m Henrik Joreteg',
  subtitle: 'Mobile web consultant, developer, and speaker'
}
