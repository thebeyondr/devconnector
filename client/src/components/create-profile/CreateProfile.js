import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import TextFieldGroup from './../common/TextFieldGroup'
import SelectListGroup from './../common/SelectListGroup'
import TextAreaGroup from './../common/TextAreaGroup'
import InputGroup from './../common/InputGroup'
import { createProfile } from '../../actions/profileActions'
import { withRouter } from 'react-router-dom'

class CreateProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      bio: '',
      github: '',
      youtube: '',
      facebook: '',
      linkedin: '',
      instagram: '',
      twitter: '',
      errors: {}
    }
    this.OnChange = this.OnChange.bind(this)
    this.OnSubmit = this.OnSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  OnSubmit = event => {
    event.preventDefault()
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      bio: this.state.bio,
      github: this.state.github,
      youtube: this.state.youtube,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      twitter: this.state.twitter
    }
    this.props.createProfile(profileData, this.props.history)
  }

  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render () {
    const { errors, displaySocialInputs } = this.state
    let socialInputs
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder='Twitter handle'
            name='twitter'
            icon='fab fa-twitter'
            value={this.state.twitter}
            onChange={this.OnChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder='Facebook'
            name='facebook'
            icon='fab fa-facebook'
            value={this.state.facebook}
            onChange={this.OnChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder='LinkedIn'
            name='linkedin'
            icon='fab fa-linkedin'
            value={this.state.linkedin}
            onChange={this.OnChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder='YouTube'
            name='youtube'
            icon='fab fa-youtube'
            value={this.state.youtube}
            onChange={this.OnChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder='Instagram'
            name='instagram'
            icon='fab fa-instagram'
            value={this.state.instagram}
            onChange={this.OnChange}
            error={errors.instagram}
          />
        </div>
      )
    }
    const statusOptions = [
      { label: '* Select professional status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ]
    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>
                Create Your Profile
              </h1>
              <p className='lead text-center'>
                Let's get to know you!
              </p>
              <small className='d-block pb-3'>
                * = required fields
              </small>
              <form onSubmit={this.OnSubmit}>
                <TextFieldGroup
                  placeholder='Profile handle'
                  name='handle'
                  value={this.state.handle}
                  onChange={this.OnChange}
                  error={errors.handle}
                  info='A unique handle for your profile'
                />
                <SelectListGroup
                  placeholder='Status'
                  name='status'
                  value={this.state.status}
                  onChange={this.OnChange}
                  options={statusOptions}
                  error={errors.status}
                  info='Where are you on your developer journey?'
                />
                <TextFieldGroup
                  placeholder='Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.OnChange}
                  error={errors.company}
                  info='Could be your own or a company website'
                />
                <TextFieldGroup
                  placeholder='Website'
                  name='website'
                  value={this.state.website}
                  onChange={this.OnChange}
                  error={errors.website}
                  info='Example: johndoe.com'
                />
                <TextFieldGroup
                  placeholder='Location'
                  name='location'
                  value={this.state.location}
                  onChange={this.OnChange}
                  error={errors.location}
                  info='Where are you in the world? (eg. Ontario, Canada)'
                />
                <TextFieldGroup
                  placeholder='Skills'
                  name='skills'
                  value={this.state.skills}
                  onChange={this.OnChange}
                  error={errors.skills}
                  info='Please use comma separated values (eg. HTML,CSS,JS)'
                />
                <TextFieldGroup
                  placeholder='Github username'
                  name='github'
                  value={this.state.github}
                  onChange={this.OnChange}
                  error={errors.github}
                  info='You can link your latest repos this way'
                />
                <TextAreaGroup
                  placeholder='Brief bio'
                  name='bio'
                  value={this.state.bio}
                  onChange={this.OnChange}
                  error={errors.bio}
                  info='Tell us a little about yourself'
                />

                <div className='mb-3'>
                  <button
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                    className='btn btn-light'
                    type='button'
                  >
                    Add social links
                  </button>
                  <span className='text-muted ml-2'>Optional</span>
                </div>
                {socialInputs}
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-info btn-blobk mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
)
