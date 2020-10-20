import * as React from 'react'

interface Props {
  value: string
  label: string
}

function SelectOption({ value, label }: Props): JSX.Element {
  return <option value={value}>{label}</option>
}

export default React.memo(SelectOption)
