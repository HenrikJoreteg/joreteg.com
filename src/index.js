import React, { Component } from 'react'
import Header from './header'
import Post from './post'
import './styles/main.styl'

export default class Index extends Component {
  render () {
    const { posts, url } = this.props.data

    let page
    let headerHeight = 'full'

    if (!url || url === '/') {
      const latest = posts.slice(-5).reverse()
      page = (
        <section className='recent-posts'>
          <h3>Recent Posts</h3>
          {latest.map(post =>
            <article>
              <h1><a href={post.url}>{post.title}</a></h1>
              <div className='preview' dangerouslySetInnerHTML={{__html: post.preview}}></div>
            </article>
          )}
        </section>
      )
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
