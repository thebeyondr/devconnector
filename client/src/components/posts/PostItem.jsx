import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postActions'

class PostItem extends Component {
  removePost = id => {
    this.props.deletePost(id)
  }
  handleLike = id => {
    this.props.addLike(id)
  }
  handleUnlike = id => {
    this.props.removeLike(id)
  }
  findUserLike (likes) {
    const { auth } = this.props
    return !!likes.filter(like => like.user === auth.user.id).length
  }
  render () {
    const { post, auth, showActions } = this.props
    return (
      <div className='card card-body mb-3'>
        <div className='row'>
          <div className='col-md-2'>
            <a href='profile.html'>
              <img
                className='rounded-circle d-none d-md-block'
                src={post.avatar}
                alt={post.name}
              />
            </a>
            <br />
            <p className='text-center'>{post.name}</p>
          </div>
          <div className='col-md-10'>
            <p className='lead'>
              {post.text}
            </p>
            {showActions
              ? <span>
                <button
                  type='button'
                  className='btn btn-light mr-1'
                  onClick={() => this.handleLike(post._id)}
                >
                  <i
                    className={`${this.findUserLike(post.likes) ? 'text-primary' : 'text-secondary'} fas fa-thumbs-up`}
                  />
                  <span className='badge badge-light'>
                    {post.likes.length}
                  </span>
                </button>
                <button
                  type='button'
                  className='btn btn-light mr-1'
                  onClick={() => this.handleUnlike(post._id)}
                >
                  <i className='text-secondary fas fa-thumbs-down' />
                </button>
                <Link to={`/post/${post._id}`} className='btn btn-info mr-1'>
                    Comments
                </Link>
                {post.owner === auth.user.id
                  ? <button
                    type='button'
                    className='btn btn-danger mr-1'
                    onClick={() => {
                      this.removePost(post._id)
                    }}
                  >
                    <i className='fas fa-times' />
                  </button>
                  : null}

              </span>
              : null}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
)
