import React from 'react'
import './Button.css'

function Button(props) {
  function handleClick() {
    props.onClick(props.value)
  }

  return (
    <button className="calc-btn" id={props.id} onClick={handleClick}>{props.value}</button>
  )
}

export default Button