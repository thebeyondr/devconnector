import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from './../../actions/profileActions'
import Spinner from './../common/Spinner'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  componentDidMount () {
    this.props.getCurrentProfile()
  }
  render () {
    const { user } = this.props.auth
    const { profile, loading } = this.props.profile
    let dashboardContent

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      // Check is user has a profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h1>DISPLAY PROFILE</h1>
      } else {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Hello, {user.name}!</p>
            <p className='text-muted'>
              You haven't set up a profile yet. Please add some info to get started.
            </p>
            <Link to='/create-profile' className='btn btn-lg btn-info'>
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
