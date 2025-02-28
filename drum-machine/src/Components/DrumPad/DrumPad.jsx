import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { useAppContext } from '../../hooks/useAppContext'
import './DrumPad.css'

export const DrumPad = forwardRef(
  ({ sound, id, label, changeDisplayText }, ref) => {
    const [pressed, setPressed] = useState(false)
    const audioRef = useRef()
    const { isTurnedOn, volume } = useAppContext()

    useEffect(() => {
      audioRef.current.volume = volume
    }, [volume])

    useImperativeHandle(ref, () => ({
      playSound,
    }))

    const playSound = () => {
      if (!audioRef || !isTurnedOn) return
      setPressed(true)
      setTimeout(() => {
        setPressed(false)
      }, 200)
      audioRef.current.currentTime = 0
      audioRef.current.play()
      changeDisplayText(label)
    }
    return (
      <button
        className={`drum-pad ${pressed ? 'pressed' : ''}`}
        onClick={playSound}
      >
        <audio ref={audioRef} src={sound} hidden id={id} />
        {id}
      </button>
    )
  }
)
