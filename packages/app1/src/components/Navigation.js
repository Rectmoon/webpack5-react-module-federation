import React from 'react'
import { Link } from 'react-router-dom'

const style = { border: '1px solid #000', padding: 12 }

const Navigation = () => (
  <div style={style}>
    <Link to='/'>Home</Link> - <Link to='/about'>About</Link>
  </div>
)

export default Navigation
