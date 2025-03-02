import './App.css'
import { useEffect, useState } from 'react'
import TimeSetter from './TimeSetter'
import Display from './Display'
import AlarmSound from './assets/AlarmSound.mp3'

const defaultBreakTime = 5 * 60
const defaultSessionTime = 25 * 60
const min = 60
const max = 60 * 60
const interval = 60

function App() {
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

  return (
    <>
      <div className="clock">
        <div className="setters">
          <div className="break">
            <h4 id="break-label">Break Length</h4>
            <TimeSetter
              time={breakTime}
              setTime={changeBreakTime}
              min={min}
              max={max}
              interval={interval}
              type="break"
            />
          </div>
          <div className="session">
            <h4 id="session-label">Session Length</h4>
            <TimeSetter
              time={sessionTime}
              setTime={changeSessionTime}
              min={min}
              max={max}
              interval={interval}
              type="session"
            />
          </div>
        </div>
        <Display
          displayState={displayState}
          reset={reset}
          startStop={startStop}
        />
        <audio id="beep" src={AlarmSound} />
      </div>
      <div className="footer">
        <p>
          Coded by:{' '}
          <a
            target="_blank"
            href="https://github.com/joselriascos/FCC-Projects/tree/main/25-5-clock"
          >
            joselRiascos
          </a>
        </p>
      </div>
    </>
  )
}

export default App
