import React, { Component } from 'react'
import loadScript from 'load-script'
import moment from 'moment'

export default class Post extends Component {

  render () {
    const { post } = this.props

    if (post.scripts && post.scripts.length) {
      post.scripts.forEach(url => loadScript(url))
    }

    let tags

    if (post.tags) {
      console.log(post.tags)
      tags = (
        <span className='name'>Tagged: {post.tags}</span>
      )
    }

    let twitterUrl = `http://www.twitter.com/share?url=${post.url}&amp;text=${post.title}`

    let date = post.last_updated || post.date

    date = moment(date).format('D MMM YYYY')

    return (
      <article className='post-wrapper'>
        <h1><a href={post.url}>{post.title}</a></h1>
        <hr/>
        <aside>
          <span className='name'>Last updated: {date}</span>
          {tags}
        </aside>
        <section dangerouslySetInnerHTML={{__html: post.html}}></section>
      </article>
    )
  }
}
