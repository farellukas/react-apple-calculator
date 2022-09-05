import React, { useState } from 'react'
import Display from '../../components/Display/Display'
import Button from '../../components/Button/Button'
import './App.css'

const BUTTONS = [
  ['AC', '+/-', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
]

function App() {
  const [product, setProduct] = useState("0")

  function handleClick(input) {
    if ('1234567890'.includes(input)) {  // numbers
      product !== "0" ? setProduct(prevProduct => prevProduct + input) : setProduct(input)
    } else if (input === "AC") {  // clear
      setProduct("0")
    } else if (input === "+/-") {  // change sign
      product !== "0" ? product[0] !== "-" ? setProduct(prevProduct => "-" + prevProduct) : setProduct(prevProduct => prevProduct.slice(1)) : setProduct(product)
    } else if (input === '.') {  // decimal
      !product.includes('.') ? setProduct(prevProduct => prevProduct + '.') : setProduct(product)
    }
  }

  return (
    <div className="calc-wrapper">
      <Display value={product} />
      <div className="btn-wrapper">     
        {BUTTONS.map((row, rowIndex) => {
          return (<div className="btn-group" key={rowIndex}>
            {row.map((button, buttonIndex) => {
              return (<Button id={'btn-' + button} key={buttonIndex} value={button} onClick={handleClick} />)
            })}
          </div>)
        })}
      </div>
    </div>
  )
}

export default App