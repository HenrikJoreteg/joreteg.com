import React, { Component } from 'react'
import moment from 'moment'

export default class Blog extends Component {
  render () {
    const { posts } = this.props

    return (
      <section className='post-list'>
        {posts.map(post => {
          let date = moment(post.date)
          return (
            <li>
              <time dateTime={date.format('YYYY-MM-DD HH:mm')}>{date.format('D MMM YYYY').toUpperCase()}</time>
              <a href={post.url}>{post.title}</a>
            </li>
          )
        })}
      </section>
    )
  }
}
