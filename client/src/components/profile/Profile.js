import React, { Component } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileGithub from './ProfileGithub'
import ProfileCreds from './ProfileCreds'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { getProfileByHandle } from '../../actions/profileActions'
import Spinner from './../common/Spinner'

class Profile extends Component {
  componentDidMount () {
    const { handle } = this.props.match.params
    handle && this.props.getProfileByHandle(handle)
  }

  componentDidUpdate () {
    this.props.profile.profile === null &&
      !this.props.profile.loading &&
      this.props.history.push('/not-found')
  }

  render () {
    const { profile, loading } = this.props.profile
    let profileContent
    if (profile === null || loading) {
      profileContent = <Spinner />
    } else {
      profileContent = (
        <div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/developers' className='btn btn-light btn-small'>
                All Profiles
              </Link>
            </div>
            <div className='col-md-6' />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
          {profile.github ? <ProfileGithub username={profile.github} /> : null}

        </div>
      )
    }
    return (
      <div className='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>{profileContent}</div>
          </div>
        </div>

      </div>
    )
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileByHandle })(Profile)
