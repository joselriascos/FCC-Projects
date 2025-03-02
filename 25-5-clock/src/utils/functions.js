export const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes < 10 ? '0' + minutes.toString() : minutes.toString()}:${
    seconds < 10 ? '0' + seconds.toString() : seconds.toString()
  }`
}
