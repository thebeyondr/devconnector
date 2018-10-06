import React from 'react'

/**
 * Footer component of the app. Has copyright info & date
 * @component Footer 👣
 */
const Footer = () => {
  return (
    <footer className='bg-dark text-white mt-5 p-4 text-center'>
      Copyright © {new Date().getFullYear()} Dev Connector
    </footer>
  )
}

export default Footer
