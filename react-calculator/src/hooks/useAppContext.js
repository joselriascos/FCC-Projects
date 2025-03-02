import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export function useAppContext() {
  const { setDisplayText, setExpression, displayText, expression } =
    useContext(AppContext)

  const changeDisplayText = (text) => {
    if (displayText.length >= 12) return
    setDisplayText(text)
  }

  const resetDisplay = () => {
    setDisplayText('0')
  }

  const resetCalculator = () => {
    resetDisplay()
    setExpression('')
  }

  return {
    changeDisplayText,
    resetDisplay,
    resetCalculator,
    displayText,
    expression,
    setExpression,
  }
}
