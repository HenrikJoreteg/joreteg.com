import React, { Component } from 'react'
import loadScript from 'load-script'
import moment from 'moment'

export default class Post extends Component {

  render () {
    const { post } = this.props

    if (post.scripts && post.scripts.length && typeof document !== 'undefined') {
      post.scripts.forEach(url => loadScript(url))
    }

    let tags

    if (post.tags) {
      tags = (
        <span> | <span className='name'>tagged: {post.tags}</span></span>
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
        <footer>
          <hr/>
          <h4>Thanks for reading, you may want to:</h4>
          <ul>
            <li><a href='http://twitter.com/henrikjoreteg'>follow me on twitter</a></li>
            <li><a href='http://consulting.joreteg.com'>read about my consulting services</a></li>
            <li><a href='http://read.humanjavascript.com'>check out my book</a></li>
            <li><a href='/blog/all'>see my other posts</a></li>
            <li><a href='https://gumroad.com/henrikjoreteg/follow'>get an email when I ship new stuff</a></li>
          </ul>
        </footer>
      </article>
    )
  }
}
