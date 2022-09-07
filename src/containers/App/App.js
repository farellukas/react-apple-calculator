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
  const [operatorIsSelected, setOperatorIsSelected] = useState(false)

  useEffect(() => {  // AC and C switching
    if (product === "0") {
      setButtons(prevButtons => ([
        ['AC', ...prevButtons[0].slice(1)],
        ...prevButtons.slice(1)
      ]))
    } else {
      setButtons(prevButtons => ([
        ['C', ...prevButtons[0].slice(1)],
        ...prevButtons.slice(1)
      ]))
    }
  }, [product]);

  useEffect(() => {
    if (history.length >= 3) {
      switch (history[1]) {
        case '+':
          setHistory(prevHistory => [(Number(history[0]) + Number(history[2])).toString(), ...prevHistory.slice(3)])
          break;
        case '-':
          setHistory(prevHistory => [(Number(history[0]) - Number(history[2])).toString(), ...prevHistory.slice(3)])
          break;
        case '*':
          setHistory(prevHistory => [(Number(history[0]) * Number(history[2])).toString(), ...prevHistory.slice(3)])
          break;
        case '/':
          setHistory(prevHistory => [(Number(history[0]) / Number(history[2])).toString(), ...prevHistory.slice(3)])
          break;
        default:
          break;
      }
    } 

    if (history.length === 2) {
      setProduct(history[0])
      if (history[history.length-1] === "=") {setHistory([])}
    }
  }, [history])

  function handleBtnClick(input) {
    if ('1234567890'.includes(input)) {  // numbers
      if (product === "0" || operatorIsSelected) {
        setProduct(input)
        setOperatorIsSelected(false)
      } else {
        setProduct(prevProduct => prevProduct + input)
      }
    } else if (input === "AC") {  // all clear
      setProduct("0")
      setHistory([])
      setOperatorIsSelected(false)
    } else if (input === "C") { // clear
      setProduct("0")
    } else if (input === "+/-") {  // change sign
      product !== "0" ? product[0] !== "-" ? setProduct(prevProduct => "-" + prevProduct) : setProduct(prevProduct => prevProduct.slice(1)) : setProduct(product)
    } else if (input === '.') {  // decimal
      !product.includes('.') ? setProduct(prevProduct => prevProduct + '.') : setProduct(product)
    } else if (input === '%') {  // percent
      product !== "0" ? setProduct(prevProduct => Number(prevProduct/100).toString()) : setProduct(product)
    } else {  // operators
      history.length && operatorIsSelected ? setHistory(prevHistory => [...prevHistory.slice(0, prevHistory.length-1), input]) : setHistory(prevHistory => [...prevHistory, product, input])
      setOperatorIsSelected(true)
    }
  }

  function handleDisplayClick(input) {
    if (input.length === 1 || input === "-0") {
      setProduct("0")
    } else if (input.length === 2 && input[0] === "-") {
      setProduct("-0")
    } else if (input !== "0") {
      setProduct(prevProduct => prevProduct.slice(0, -1))
    }
  }

  return (
    <div className="calc-wrapper">
      <Display value={product} onClick={handleDisplayClick} />
      <div className="btn-wrapper">     
        {buttons.map((row, rowIndex) => {
          return (
            <div className="btn-group" key={rowIndex}>
              {row.map((button, buttonIndex) => {
                return (<Button id={'btn-' + button} key={buttonIndex} value={button} onClick={handleBtnClick} className={buttonIndex === row.length-1 ? `btn-operators ${history[history.length-1] === button && operatorIsSelected ? "btn-selected" : ""}` : rowIndex === 0 ? "btn-misc" : ""} />)
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App