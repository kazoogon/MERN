import React, { Component } from 'react'
import PropsTypes from 'prop-types';
import CommentItem from './CommentItem'

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;

    return comments.map(comment => (
			<div>
			<CommentItem key={comment._id} comment={comment} postId={postId} />
			</div>
		))
  }
}

CommentFeed.propsTypes = {
	comments: PropsTypes.array.isRequired,
	postId: PropsTypes.string.isRequired
}

export default CommentFeed

