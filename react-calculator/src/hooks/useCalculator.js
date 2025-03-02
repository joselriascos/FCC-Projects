import { useAppContext } from './useAppContext'
import { evaluate } from 'mathjs'

export function useCalculator() {
  const {
    expression,
    changeDisplayText,
    resetDisplay,
    resetCalculator,
    setExpression,
    displayText,
  } = useAppContext()

  const operations = ['+', '-', 'x', '/']

  const replaceLastChar = (text) => {
    setExpression((prevState) => {
      const lastChars = prevState.slice(-2)
      const charsAreOperations = [...lastChars].every((char) =>
        operations.includes(char)
      )
      if (charsAreOperations) {
        return prevState.slice(0, -2) + text
      } else {
        return prevState.slice(0, -1) + text
      }
    })
    changeDisplayText((prevState) => {
      if (prevState === '-') {
        resetDisplay()
      }
    })
  }

  const concatDisplayText = (text) => {
    changeDisplayText((prevState) => {
      if (prevState.startsWith('0') && text !== '.' && prevState.length === 1) {
        return text
      }
      return prevState + text
    })
  }

  const concatExpression = (text) =>
    setExpression((prevState) => prevState + text)

  const handleButtonPress = (text) => {
    if (expression.indexOf('=') !== -1 && operations.includes(text)) {
      setExpression(displayText)
      resetDisplay()
    }
    if (expression.indexOf('=') !== -1 && !operations.includes(text)) {
      resetCalculator()
    }

    if (text === 'C') {
      resetCalculator()
      return
    }

    if (text === '%') {
      alert('Coming soon...')
      return
      // if (displayText !== '0' && displayText !== '' && displayText !== '-') {
      //   changeDisplayText((prevState) => {
      //     return parseFloat(prevState) / 100
      //   })
      //   concatExpression(text)
      // }
      // return
    }

    if (text === '/' || text === 'x' || text === '-' || text === '+') {
      const lastChar = expression.slice(-1)
      if (operations.includes(lastChar) && text === lastChar) return
      if (text !== '-' && displayText === '0') return
      if (
        (text === '-' && expression === '') ||
        (text === '-' && operations.includes(lastChar) && lastChar !== '-')
      ) {
        concatDisplayText(text)
        concatExpression(text)
        return
      }
      if (operations.includes(lastChar) && text !== lastChar) {
        replaceLastChar(text)
        return
      }

      resetDisplay()
      concatExpression(text)
      return
    }

    if (text === '.') {
      if (displayText.includes('.')) return
    }

    if (text === '=') {
      if (expression === '') return

      const evaluableExpression = expression
        .replace(/x/g, '*')
        .replace(/%/g, '/100')

      try {
        const result = evaluate(evaluableExpression)
        changeDisplayText(result)
        concatExpression(`=${result}`)
      } catch (error) {
        console.error(error)
        resetCalculator()
      }
      return
    }
    concatDisplayText(text)
    concatExpression(text)
  }

  return { handleButtonPress }
}
