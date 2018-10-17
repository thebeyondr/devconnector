import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import TextFieldGroup from './../common/TextFieldGroup'
import TextAreaGroup from './../common/TextAreaGroup'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import {addExperience} from '../../actions/profileActions'

/**
 * Add experience form
 *
 * @class AddExperience
 * @extends {Component}
 */
class AddExperience extends Component {
  constructor (props) {
    super(props)
    this.state = {
      company: '',
      title: '',
      location: '',
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
      this.setState({errors: this.props.errors})
    }
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault()
    const newExperience = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      to: this.state.to,
      from: this.state.from,
      current: this.state.current,
      description: this.state.description
    }

    this.props.addExperience(newExperience, this.props.history)
  }
  handleCheck = e => {
    this.setState(prevState => ({
      disabled: !prevState.disabled,
      current: !prevState.current
    }))
  }
  render () {
    const {errors} = this.state
    return (
      <div>
        <div className='add-experience'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <Link to='/dashboard' className='btn btn-light'>
                  Go back
                </Link>
                <h1 className='dispaly-4 text-center'>Add Experience</h1>
                <p className='lead text-center'>
                  Add any experience you have had in the past or you currently hold
                </p>
                <small className='d-block pb-3'>* = required</small>
                <form onSubmit={this.handleSubmit}>
                  <TextFieldGroup
                    placeholder='Company *'
                    name='company'
                    value={this.state.company}
                    onChange={this.handleChange}
                    error={errors.company}
                    info='Could be your own or a company website'
                  />
                  <TextFieldGroup
                    placeholder='Job Title *'
                    name='title'
                    value={this.state.title}
                    onChange={this.handleChange}
                    error={errors.title}
                    info='Name of your position. eg. Developer'
                  />
                  <TextFieldGroup
                    placeholder='Location'
                    name='location'
                    value={this.state.location}
                    onChange={this.handleChange}
                    error={errors.location}
                    info='Location of this job. eg. Texas, USA'
                  />
                  <label htmlFor='from'>From</label>
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
                      I work here
                    </label>
                  </div>
                  <TextAreaGroup
                    placeholder='Job Description'
                    name='description'
                    value={this.state.description}
                    onChange={this.handleChange}
                    error={errors.description}
                  />
                  <input
                    type='submit'
                    value='Add this experience'
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
AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToprops = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToprops, {addExperience})(
  withRouter(AddExperience)
)
