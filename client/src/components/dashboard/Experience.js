import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'react-moment'
import { deleteExperience } from '../../actions/profileActions'

class Experience extends Component {
  handleDelete = id => {
    this.props.deleteExperience(id)
  }
  render () {
    const experience = this.props.experience.length > 0
      ? this.props.experience.map(exp => {
        return (
          <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
              <Moment format='YYYY/MM/DD'>
                {exp.from}
              </Moment>
              {' '}
                -
              {' '}
              {exp.to !== null
                ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
                : 'Now'}
            </td>
            <td>
              <button
                className='btn btn-danger btn-small'
                onClick={() => {
                  this.handleDelete(exp._id)
                }}
              >
                  Delete
              </button>
            </td>
          </tr>
        )
      })
      : <tr>
        <td>
            Your experiences will appear here. Try adding some from the options above.
        </td>
      </tr>
    return (
      <div>

        <h4 className='mb-3'>Experience</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>
                Period <small className='text-muted p'>(yyyy/mm/dd)</small>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    )
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array.isRequired
}

export default connect(null, { deleteExperience })(Experience)
