import React from 'react'
import './Display.css'

function Display(props) {
  return (
    <div className="display-wrapper">
      <h1 className="display">{props.value}</h1>
    </div>
  )
}

export default Display