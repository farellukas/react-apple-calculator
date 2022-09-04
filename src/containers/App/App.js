import React from 'react'
import Display from '../../components/Display/Display'
import Button from '../../components/Button/Button'

const BUTTONS = [
  ['AC', '+/-', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
]

function App() {
  return (
    <>
      <Display />
      <div className="btn-wrapper">     
        {BUTTONS.map((row, rowIndex) => {
          return (<div className="btn-group" key={rowIndex}>
            {row.map((button, buttonIndex) => {
              return (<Button key={buttonIndex} value={button} />)
            })}
          </div>)
        })}
      </div>
    </>
  )
}

export default App