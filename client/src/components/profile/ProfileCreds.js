import React, { Component } from 'react'
import Moment from 'react-moment'

class ProfileCreds extends Component {
  render () {
    const { experience, education } = this.props
    const expItems = experience.map(exp => (
      <li className='list-group-item' key={exp._id}>
        <h4>{exp.company}</h4>
        <p>
          <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
          {' '}
          -
          {' '}
          {exp.to === null
            ? <span> Present</span>
            : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
        </p>
        <p><strong>Position: </strong>{exp.title}</p>
        {exp.location === ''
          ? null
          : <p><strong>Location: </strong>{exp.location}</p>}
        {exp.description === ''
          ? null
          : <p><strong>Description: </strong>{exp.description}</p>}
      </li>
    ))

    const eduItems = education.map(edu => (
      <li className='list-group-item' key={edu._id}>
        <h4>{edu.school}</h4>
        <p>
          <Moment format='YYYY/MM/DD'>{edu.from}</Moment>
          {' '}
          -
          {' '}
          {edu.to === null
            ? <span> Present</span>
            : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
        </p>
        <p><strong>Degree: </strong>{edu.degree}</p>
        <p><strong>Field of Study: </strong>{edu.fieldOfStudy}</p>
        {edu.description === ''
          ? null
          : <p><strong>Description: </strong>{edu.description}</p>}
      </li>
    ))
    return (
      <div className='row'>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Experience</h3>
          {expItems.length > 0
            ? <ul className='list-group'>{expItems}</ul>
            : <p className='text-center'>No experience listed</p>}
        </div>
        <div className='col-md-6'>
          <h3 className='text-center text-info'>Education</h3>
          {eduItems.length > 0
            ? <ul className='list-group'>{eduItems}</ul>
            : <p className='text-center'>No education listed</p>}
        </div>
      </div>
    )
  }
}

export default ProfileCreds
