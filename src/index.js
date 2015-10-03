import React, { Component } from 'react'
import moment from 'moment'
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
          {latest.map(post => {
            let date = moment(post.date)
            return (
              <article>
                <time dateTime={date.format('YYYY-MM-DD HH:mm')}>{date.format('D MMM YYYY')}</time>
                <h1><a href={post.url}>{post.title}</a></h1>
                <div className='preview' dangerouslySetInnerHTML={{__html: post.preview}}></div>
                <a href={post.url}>keep reading »</a>
              </article>
            )
          })}
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
