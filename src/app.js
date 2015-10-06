import React, { Component } from 'react'
import Header from './header'
import Post from './post'
import Home from './home'
import Blog from './blog'
import FourOhFour from './404'

export default class Index extends Component {
  render () {
    const { posts, url } = this.props

    let page
    let headerHeight = 'short'

    if (!url || url === '/') {
      headerHeight = 'full'
      page = <Home posts={posts.slice(0, 5)}/>
    }

    if (!page && url === '/blog/all') {
      page = <Blog posts={posts}/>
    }

    if (!page && url === '/404') {
      page = <FourOhFour />
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
        <main>
          {page}
        </main>
      </div>
    )
  }
}
