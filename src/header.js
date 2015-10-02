import React, { Component } from 'react'

export default class Header extends Component {
  render () {
    const { height } = this.props

    let imageUrl

    if (height === 'short') {
      imageUrl = 'http://static.joreteg.com/large_short_background.jpg'
    } else {
      imageUrl = 'http://static.joreteg.com/large_background.jpg'
    }

    return (
      <header>
        <img className='bannerImage' src={imageUrl}/>
        <h2>{this.props.title}</h2>
        <p>{this.props.subtitle}</p>
        <p><a href="http://twitter.com/henrikjoreteg">tweet</a> | <a href='mailto:henrik@joreteg.com'>email</a> | <a href='consulting@joreteg.com'>hire</a></p>
      </header>
    )
  }
}

Header.defaultProps = {
  title: 'Hi, I’m Henrik Joreteg',
  subtitle: 'Mobile web consultant, developer, and speaker'
}
