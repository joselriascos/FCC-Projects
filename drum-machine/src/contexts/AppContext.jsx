import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [isTurnedOn, setIsTurnedOn] = useState(true)
  const [volume, setVolume] = useState(1)

  const changeVolume = (value) => {
    setVolume(value / 100)
  }

  const toggleIsTurnedOn = () => {
    setIsTurnedOn(!isTurnedOn)
  }

  return (
    <AppContext.Provider
      value={{ isTurnedOn, volume, changeVolume, toggleIsTurnedOn }}
    >
      {children}
    </AppContext.Provider>
  )
}
