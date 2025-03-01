import './App.css'
import { evaluate } from 'mathjs'
import { buttons } from './utils/consts'
import { Button } from './Components/Button'

function App() {
  return (
    <>
      <div className="calculator">
        <div className="display-container">
          <p className="expression">Expresión acumulada</p>
          <p className="display">RESULTADO</p>
        </div>
        <div className="buttons-container">
          {buttons.map((button) => {
            const { id, text, col, row, colspan, rowspan, color } = button
            const className = `btn ${color}`

            return (
              <Button
                id={id}
                col={col}
                row={row}
                colspan={colspan}
                rowspan={rowspan}
                key={id}
                className={className}
              >
                {text}
              </Button>
            )
          })}
        </div>
      </div>
      <div className="footer">
        <p>
          Coded by:{' '}
          <a
            target="_blank"
            href="https://github.com/joselriascos/FCC-Projects/tree/main/react-calculator"
          >
            joselRiascos
          </a>
        </p>
      </div>
    </>
  )
}

export default App
