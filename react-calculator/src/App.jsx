import './App.css'
import { buttons } from './utils/consts'
import { Button } from './Components/Button'
import { useAppContext } from './hooks/useAppContext'

function App() {
  const { displayText, expression } = useAppContext()

  return (
    <>
      <div className="calculator">
        <div className="display-container">
          <p className="expression">{expression}</p>
          <p id="display">{displayText}</p>
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
                text={text}
              />
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
