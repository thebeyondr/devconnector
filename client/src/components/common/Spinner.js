import React from 'react'
import spinner from './loader.gif'

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt='Loading....'
        title='Loading....'
        style={{ width: '100px', margin: 'auto', display: 'block' }}
      />
    </div>
  )
}

export default Spinner
