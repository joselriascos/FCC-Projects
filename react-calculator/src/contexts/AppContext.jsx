import { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [expression, setExpression] = useState('')
  const [displayText, setDisplayText] = useState('0')

  return (
    <AppContext.Provider
      value={{ expression, displayText, setExpression, setDisplayText }}
    >
      {children}
    </AppContext.Provider>
  )
}
