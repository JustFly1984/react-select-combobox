import * as React from 'react'

import Label from 'src/library/label'

import ComboboxSelect from 'src/library/combobox-select-2'

import type { SelectField, SelectOption } from 'src/library/types'

interface Props {
  field: Readonly<SelectField<string, string>>
  options: readonly Readonly<SelectOption<string>>[]
  disabled?: boolean
  divClassName: string
  labelClassName: string
  selectDivClassName: string
  selectClassName: string
  selectButtonClassName: string
  selectValueClassName: string
  selectArrowClassName: string
  listClassName: string
  optionClassName: string
  onChange?(value: string, field: Readonly<SelectField<string, string>>): void
  onBlur?(value: string, field: Readonly<SelectField<string, string>>): void
}

function ComboboxSelectWithLabel({
  field,
  options,
  disabled,
  divClassName,
  labelClassName,
  selectDivClassName,
  selectClassName,
  selectButtonClassName,
  selectValueClassName,
  selectArrowClassName,
  listClassName,
  optionClassName,
  onChange,
  onBlur,
}: Props): JSX.Element {
  // Do not use memoization, in this case, it’s not worth it
  const { required = true } = field

  return (
    <div className={divClassName}>
      <Label
        id={field.id}
        label={field.label}
        className={labelClassName}
        required={required}
      />

      <ComboboxSelect
        id={field.id}
        field={field}
        options={options}
        disabled={disabled}
        selectDivClassName={selectDivClassName}
        selectClassName={selectClassName}
        selectButtonClassName={selectButtonClassName}
        selectValueClassName={selectValueClassName}
        selectArrowClassName={selectArrowClassName}
        listClassName={listClassName}
        optionClassName={optionClassName}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default React.memo(ComboboxSelectWithLabel)
