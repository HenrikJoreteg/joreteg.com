import React, { Component } from 'react'
import Header from './header'
import Post from './post'
import Home from './home'
import Blog from './blog'

export default class Index extends Component {
  render () {
    const { posts, url } = this.props

    let page
    let headerHeight = 'short'

    if (!url || url === '/') {
      headerHeight = 'full'
      page = <Home posts={posts.slice(0, 5)}/>
    }

    if (!page && url === '/blog/archive') {
      page = <Blog posts={posts}/>
    }

    if (!page) {
      const found = posts.find(post => post.url === url)
      if (found) {
        page = <Post post={found}/>
      }
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
