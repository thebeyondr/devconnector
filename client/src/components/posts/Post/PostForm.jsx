import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import TextAreaGroup from './../../common/TextAreaGroup'
import { addPost } from './../../../actions/postActions'

class PostForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      errors: {}
    }
  }
  componentDidUpdate (prevState) {
    if (this.props.errors !== prevState.errors) {
      this.setState({ errors: this.props.errors })
    }
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleSubmit = e => {
    e.preventDefault()
    const { text } = this.state
    const { user } = this.props.auth
    const newPost = {
      text,
      name: user.name,
      avatar: user.avatar
    }
    this.props.addPost(newPost)
    this.setState({ text: '' })
  }
  render () {
    const { text, errors } = this.state
    return (
      <div className='post-form mb-3'>
        <div className='card card-info'>
          <div className='card-header bg-info text-white'>
            Say Something...
          </div>
          <div className='card-body'>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <TextAreaGroup
                  placeholder='Create a post'
                  name='text'
                  value={text}
                  onChange={this.handleChange}
                  error={errors.text}
                />
              </div>
              <button type='submit' className='btn btn-dark'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, { addPost })(PostForm)
