import React from 'react'
import './style.css'

export default function index({width}) {

  return (
    <div className='percentage_container'>
        <div style={{width : `${width}%`}}></div>
    </div>
  )
}
