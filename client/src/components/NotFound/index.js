import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

function NotFound() {
    
  return (
    <div className='not-found-container'>
      <img alt="not found" src="https://www.sitesbay.com/files/404.gif" className='not-image' />
      <h1>Oops! something went wrong</h1>
      <Link to="/">
      <button className='button'>Go to Home</button>
      </Link>
    </div>
  )
}

export default NotFound
