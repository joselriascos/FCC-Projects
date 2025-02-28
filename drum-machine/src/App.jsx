import './App.css'
import { DrumPad } from './Components/DrumPad/DrumPad'
import { PowerIcon } from './Components/Icons'
import { buttons } from './consts'
import { useAppContext } from '../src/hooks/useAppContext'
import { useApp } from './hooks/useApp'

function App() {
  const { toggleIsTurnedOn, volume } = useAppContext()
  const {
    displayText,
    drumRefs,
    isTurnedOn,
    changeDisplayText,
    handleChangeVolume,
  } = useApp()

  return (
    <>
      <div id="drum-machine">
        <div className="controls">
          <div className="power">
            <div
              style={{ backgroundColor: isTurnedOn ? 'red' : 'transparent' }}
            />
            <button onClick={toggleIsTurnedOn}>
              <PowerIcon />
            </button>
          </div>
          <p id="display">{isTurnedOn ? displayText : ''}</p>
        </div>
        <input
          disabled={!isTurnedOn}
          type="range"
          name="volume"
          id="volume"
          min={1}
          max={100}
          value={volume * 100}
          onChange={handleChangeVolume}
        />
        <div className="drum-pads-container">
          {buttons.map((button) => {
            const { audio, id, label } = button
            return (
              <DrumPad
                ref={(el) => {
                  if (el) drumRefs[id] = el
                }}
                key={id}
                sound={audio}
                id={id}
                label={label}
                changeDisplayText={changeDisplayText}
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
            href="https://github.com/joselriascos/FCC-Projects/tree/main/drum-machine"
          >
            joselRiascos
          </a>
        </p>
      </div>
    </>
  )
}

export default App
