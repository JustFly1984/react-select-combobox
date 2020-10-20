import * as React from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import Select from 'src/library/select-field'

import type { ReduxState } from 'src/types/common'

import type { SelectField, SelectOption } from 'src/library/types'

interface SelectorProps {
  disabled: boolean
  field: Readonly<SelectField<string, string>>
}

interface Props {
  options: readonly Readonly<SelectOption<string>>[]
  divClassName: string
  labelClassName: string
  selectDivClassName: string
  selectClassName: string
  selectValueClassName: string
  selectButtonClassName: string
  selectArrowClassName: string
  listClassName: string
  optionClassName: string
}

function select({
  fields: {
    contact: { combobox1 },
  },
}: ReduxState): SelectorProps {
  return {
    disabled: false,
    field: combobox1,
  }
}

function SelectCombobox({
  options,
  divClassName,
  labelClassName,
  selectDivClassName,
  selectClassName,
  selectValueClassName,
  selectButtonClassName,
  selectArrowClassName,
  listClassName,
  optionClassName,
}: Props): JSX.Element {
  const { disabled, field } = useSelector<ReduxState, SelectorProps>(
    select,
    shallowEqual
  )

  return (
    <Select
      options={options}
      disabled={disabled}
      field={field}
      divClassName={divClassName}
      labelClassName={labelClassName}
      selectDivClassName={selectDivClassName}
      selectClassName={selectClassName}
      selectValueClassName={selectValueClassName}
      selectButtonClassName={selectButtonClassName}
      selectArrowClassName={selectArrowClassName}
      listClassName={listClassName}
      optionClassName={optionClassName}
    />
  )
}

export default React.memo(SelectCombobox)
