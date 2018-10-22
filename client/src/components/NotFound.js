import React from 'react'

const NotFound = () => {
  return (
    <div>
      <h1 className='display-4'>Sorry!</h1>
      <p>This page does not exist.</p>
      <a href='/dashboard' className='btn btn-light'>Dashboard</a>
    </div>
  )
}

export default NotFound
