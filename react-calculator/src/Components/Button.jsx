export function Button({
  id,
  col,
  row,
  colspan = 1,
  rowspan = 1,
  children,
  ...rest
}) {
  return (
    <button
      id={id}
      style={{
        gridColumn: `${col} / span ${colspan}`,
        gridRow: `${row} / span ${rowspan}`,
        borderRadius: (colspan > 1 || rowspan > 1) && '9999px',
      }}
      {...rest}
    >
      {children}
    </button>
  )
}
