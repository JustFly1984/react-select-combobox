import * as React from 'react'

import { reactMemo } from 'src/utils/react-memo'
import { useTouch } from 'src/utils/use-touch'

import ComboboxSelectWithLabel from 'src/library/combobox-select-with-label-2'
import SelectWithLabel from 'src/library/select-with-label-2'

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

function Select({
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
  const isTouch: boolean = useTouch()

  if (isTouch) {
    return (
      <SelectWithLabel
        field={field}
        options={options}
        disabled={disabled}
        divClassName={divClassName}
        labelClassName={labelClassName}
        selectClassName={selectClassName}
        selectButtonClassName={selectButtonClassName}
        selectValueClassName={selectValueClassName}
        selectArrowClassName={selectArrowClassName}
        onChange={onChange}
        onBlur={onBlur}
      />
    )
  }

  return (
    <ComboboxSelectWithLabel
      field={field}
      options={options}
      disabled={disabled}
      divClassName={divClassName}
      labelClassName={labelClassName}
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
  )
}

export default reactMemo(Select)
