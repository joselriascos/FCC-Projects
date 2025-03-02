import { useCalculator } from '../hooks/useCalculator'

export function Button({
  id,
  col,
  row,
  colspan = 1,
  rowspan = 1,
  text,
  ...rest
}) {
  const { handleButtonPress } = useCalculator()

  return (
    <button
      id={id}
      style={{
        gridColumn: `${col} / span ${colspan}`,
        gridRow: `${row} / span ${rowspan}`,
        borderRadius: (colspan > 1 || rowspan > 1) && '9999px',
      }}
      onClick={() => handleButtonPress(text)}
      {...rest}
    >
      {text}
    </button>
  )
}
