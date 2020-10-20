import * as React from 'react'

interface Props {
  id: string
  label: string
  required: boolean
  className: string
}

function Label({
  id,
  label,
  required,
  className,
}: Props): JSX.Element {
  return (
    <label id={`${id}-label`} htmlFor={id} className={className}>
      {label}
      {required ? ' *' : ''}
    </label>
  )
}

export default React.memo(Label)
