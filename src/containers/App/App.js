import React, { useEffect, useState } from 'react'
import Display from '../../components/Display/Display'
import Button from '../../components/Button/Button'
import './App.css'

function App() {
  const [product, setProduct] = useState("0")
  const [history, setHistory] = useState([])
  const [buttons, setButtons] = useState([
                                  ['AC', '+/-', '%', '/'],
                                  ['7', '8', '9', '*'],
                                  ['4', '5', '6', '-'],
                                  ['1', '2', '3', '+'],
                                  ['0', '.', '=']
                                ])

  function handleClick(input) {
    if ('1234567890'.includes(input)) {  // numbers
      if (product === "0") {
        setProduct(input)
        setButtons(prevButtons => ([
          ['AC', ...prevButtons[0].slice(1)],
          ...prevButtons.slice(1)
        ]))
      } else {
        setProduct(prevProduct => prevProduct + input)
        setButtons(prevButtons => ([
          ['C', ...prevButtons[0].slice(1)],
          ...prevButtons.slice(1)
        ]))
      }
    } else if (input === "AC") {  // all clear
      setProduct("0")
    } else if (input === "C") { // clear
      setProduct("0")
    } else if (input === "+/-") {  // change sign
      product !== "0" ? product[0] !== "-" ? setProduct(prevProduct => "-" + prevProduct) : setProduct(prevProduct => prevProduct.slice(1)) : setProduct(product)
    } else if (input === '.') {  // decimal
      !product.includes('.') ? setProduct(prevProduct => prevProduct + '.') : setProduct(product)
    } else if (input === '%') {  // percent
      product !== "0" ? setProduct(prevProduct => Number(prevProduct/100).toString()) : setProduct(product)
    }
  }

  return (
    <div className="calc-wrapper">
      <Display value={product} />
      <div className="btn-wrapper">     
        {buttons.map((row, rowIndex) => {
          return (
            <div className="btn-group" key={rowIndex}>
              {row.map((button, buttonIndex) => {
                return (<Button id={'btn-' + button} key={buttonIndex} value={button} onClick={handleClick} />)
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App