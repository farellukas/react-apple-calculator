import React from 'react'
import './Display.css'

function Display(props) {
  function handleClick() {
    props.onClick(props.value)
  }

  return (
    <div className="display-wrapper">
      <h1 className="display" onClick={handleClick}>{props.value}</h1>
    </div>
  )
}

export default Display