import * as React from 'react'
import { useDispatch } from 'react-redux'

import { changeInput } from 'src/redux/actions/fields'

import Option from 'src/library/select-option'

import type { SelectField, SelectOption } from 'src/library/types'

interface Props {
  field: Readonly<SelectField<string, string>>
  options: readonly Readonly<SelectOption<string>>[]
  disabled?: boolean
  required?: boolean
  selectValueClassName: string
  onChange?(value: string, field: Readonly<SelectField<string, string>>): void
  onBlur?(value: string, field: Readonly<SelectField<string, string>>): void
}

function Select({
  field,
  onChange,
  onBlur,
  options,
  disabled,
  required,
  selectValueClassName,
}: Props): JSX.Element {
  const dispatch = useDispatch()

  const onSelectChange = React.useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >(
    function callback({ target: { value } }) {
      dispatch(
        changeInput({
          path: field.path,
          value,
        })
      )

      if (onChange instanceof Function) {
        onChange(value, field)
      }
    },
    [field, onChange, dispatch]
  )

  const onSelectBlur = React.useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >(
    function callback({ target: { value } }) {
      dispatch(
        changeInput({
          path: field.path,
          value,
        })
      )

      if (onBlur instanceof Function) {
        onBlur(value, field)
      }
    },
    [field, onBlur, dispatch]
  )

  return (
    <select
      id={field.id}
      value={field.value}
      disabled={disabled}
      className={selectValueClassName}
      onChange={onSelectChange}
      onBlur={onSelectBlur}
      required={required}
    >
      <option value='' hidden>
        {field.defaultValue}
      </option>

      {options.map(function mapper({ value, label }): JSX.Element {
        return <Option key={value} value={value} label={label} />
      })}
    </select>
  )
}

export default React.memo(Select)
