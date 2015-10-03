import React, { Component } from 'react'
import Header from './header'
import Post from './post'
import Home from './home'

export default class Index extends Component {
  render () {
    const { posts, url } = this.props

    let page
    let headerHeight = 'full'

    if (!url || url === '/') {
      page = <Home posts={posts.slice(-5).reverse()}/>
    }

    if (!page) {
      const found = posts.find(post => post.url === url)

      if (found) {
        page = <Post post={found}/>
      }

      headerHeight = 'short'
    }

    return (
      <div>
        <Header height={headerHeight}/>
        <div className='container'>
          {page}
        </div>
      </div>
    )
  }
}
