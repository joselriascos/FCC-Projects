import './App.css'
import TimeSetter from './Components/TimeSetter'
import Display from './Components/Display'
import AlarmSound from './assets/AlarmSound.mp3'
import { initialConf } from './utils/consts'
import { useApp } from './hooks/useApp'

const { min, max, interval } = initialConf

function App() {
  const {
    breakTime,
    sessionTime,
    displayState,
    reset,
    startStop,
    changeBreakTime,
    changeSessionTime,
  } = useApp()

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
