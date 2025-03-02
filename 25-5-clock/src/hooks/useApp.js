import { initialConf } from '../utils/consts'
import { useEffect, useState } from 'react'

const { defaultBreakTime, defaultSessionTime } = initialConf

export function useApp() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime)
  const [sessionTime, setSessionTime] = useState(defaultSessionTime)
  const [displayState, setDisplayState] = useState({
    time: sessionTime,
    timeType: 'Session',
    timerRunning: false,
  })

  useEffect(() => {
    let timerId
    if (!displayState.timerRunning) return

    if (displayState.timerRunning) {
      timerId = window.setInterval(decrementDisplay, 1000)
    }

    return () => window.clearInterval(timerId)
  }, [displayState.timerRunning])

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.querySelector('#beep')
      audio.currentTime = 2
      audio.play().catch((error) => console.log(error))
      setDisplayState((prevState) => ({
        ...prevState,
        time: prevState.timeType === 'Session' ? breakTime : sessionTime,
        timeType: prevState.timeType === 'Session' ? 'Break' : 'Session',
      }))
    }
  }, [displayState, breakTime, sessionTime])

  const reset = () => {
    setBreakTime(defaultBreakTime)
    setSessionTime(defaultSessionTime)
    setDisplayState({
      time: defaultSessionTime,
      timeType: 'Session',
      timerRunning: false,
    })
    const audio = document.querySelector('#beep')
    audio.pause()
    audio.currentTime = 0
  }

  const startStop = () => {
    setDisplayState((prevState) => ({
      ...prevState,
      timerRunning: !prevState.timerRunning,
    }))
  }

  const changeBreakTime = (time) => {
    if (displayState.timerRunning) return
    setBreakTime(time)
  }

  const decrementDisplay = () => {
    setDisplayState((prevState) => ({
      ...prevState,
      time: prevState.time - 1,
    }))
  }

  const changeSessionTime = (time) => {
    if (displayState.timerRunning) return
    setSessionTime(time)
    setDisplayState({
      time: time,
      timeType: 'Session',
      timerRunning: false,
    })
  }

  return {
    breakTime,
    sessionTime,
    displayState,
    reset,
    startStop,
    changeBreakTime,
    changeSessionTime,
  }
}
