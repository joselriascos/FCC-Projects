import { useState, useEffect } from 'react'
import { useAppContext } from './useAppContext'

export function useApp() {
  const [displayText, setDisplayText] = useState()
  const drumRefs = {}
  const { isTurnedOn, changeVolume, toggleIsTurnedOn } = useAppContext()

  const changeDisplayText = (text) => {
    setDisplayText(text)
  }

  useEffect(() => {
    if (displayText) {
      const timeout = setTimeout(() => {
        setDisplayText('')
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [displayText])

  const handleChangeVolume = (e) => {
    const newVolume = e.target.value
    changeVolume(newVolume)
    setDisplayText('Volume: ' + newVolume + '%')
  }

  useEffect(() => {
    const handleKeydown = (event) => {
      event.preventDefault()
      const { key } = event
      if (key === 'Escape') {
        toggleIsTurnedOn()
      }
      if (!isTurnedOn) return
      const drumPad = drumRefs[key.toUpperCase()]
      drumPad?.playSound()
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [isTurnedOn, window, drumRefs])

  return {
    displayText,
    changeDisplayText,
    drumRefs,
    isTurnedOn,
    handleChangeVolume,
  }
}
