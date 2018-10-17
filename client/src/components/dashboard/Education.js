import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
  handleDelete = id => {
    this.props.deleteEducation(id)
  }
  render () {
    const education = this.props.education.length > 0
      ? this.props.education.map(edu => {
        return (
          <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{edu.fieldOfStudy}</td>
            <td>
              <Moment format='YYYY/MM/DD'>
                {edu.from}
              </Moment>
              {' '}
                -
              {' '}
              {edu.to !== null
                ? <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                : 'Now'}
            </td>
            <td>
              <button
                className='btn btn-danger btn-small'
                onClick={() => {
                  this.handleDelete(edu._id)
                }}
              >
                  Delete
              </button>
            </td>
          </tr>
        )
      })
      : <tr className='mt3'>
          Nothing here yet!
      </tr>
    return (
      <div>
        <h4 className='mb-3'>Education</h4>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>
                Period <small className='text-muted p'>(yyyy/mm/dd)</small>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    )
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
