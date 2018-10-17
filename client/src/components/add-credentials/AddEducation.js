import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from './../common/TextFieldGroup'
import TextAreaGroup from './../common/TextAreaGroup'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { addEducation } from '../../actions/profileActions'

/**
 * Add education form
 *
 * @class AddEducation
 * @extends {Component}
 */
class AddEducation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      to: '',
      from: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors })
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    const newEducation = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      to: this.state.to,
      from: this.state.from,
      current: this.state.current,
      description: this.state.description
    }

    this.props.addEducation(newEducation, this.props.history)
  }
  handleCheck = e => {
    this.setState(prevState => ({
      disabled: !prevState.disabled,
      current: !prevState.current
    }))
  }
  render () {
    const { errors } = this.state
    return (
      <div>
        <div className='add-experience'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <Link to='/dashboard' className='btn btn-light'>
                  Go back
                </Link>
                <h1 className='dispaly-4 text-center'>Add Education</h1>
                <p className='lead text-center'>
                  Add any education you have had in the past or currently attending
                </p>
                <small className='d-block pb-3'>* = required</small>
                <form onSubmit={this.handleSubmit}>
                  <TextFieldGroup
                    placeholder='School *'
                    name='school'
                    value={this.state.school}
                    onChange={this.handleChange}
                    error={errors.school}
                    info='eg. Southern Nordic University'
                  />
                  <TextFieldGroup
                    placeholder='Degree or Certification *'
                    name='degree'
                    value={this.state.degree}
                    onChange={this.handleChange}
                    error={errors.degree}
                    info='eg. BSc., MSc. etc.'
                  />
                  <TextFieldGroup
                    placeholder='Field of Study *'
                    name='fieldofstudy'
                    value={this.state.fieldofstudy}
                    onChange={this.handleChange}
                    error={errors.fieldofstudy}
                    info='eg. Computer Science'
                  />
                  <label htmlFor='from'>From *</label>
                  <TextFieldGroup
                    type='date'
                    name='from'
                    value={this.state.from}
                    onChange={this.handleChange}
                    error={errors.from}
                  />
                  <label htmlFor='to'>To</label>
                  <TextFieldGroup
                    type='date'
                    name='to'
                    value={this.state.to}
                    onChange={this.handleChange}
                    error={errors.to}
                    disabled={this.state.disabled ? 'disabled' : ''}
                  />
                  <div className='form-check mb-2'>
                    <input
                      type='checkbox'
                      name='current'
                      id='current'
                      className='form-check-input'
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.handleCheck}
                    />
                    <label htmlFor='current' className='form-check-label'>
                      I attend here
                    </label>
                  </div>
                  <TextAreaGroup
                    placeholder='Program Description'
                    name='description'
                    value={this.state.description}
                    onChange={this.handleChange}
                    error={errors.description}
                  />
                  <input
                    type='submit'
                    value='Add education'
                    className='btn btn-block btn-success'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToprops = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToprops, { addEducation })(
  withRouter(AddEducation)
)
