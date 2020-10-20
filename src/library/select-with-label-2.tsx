import * as React from 'react'

import Label from 'src/library/label'

import Select from 'src/library/select-2'

import SvgChevronRight from 'src/svg/chevron-right'

import type { SelectField, SelectOption } from 'src/library/types'

interface Props {
  field: Readonly<SelectField<string, string>>
  options: readonly Readonly<SelectOption<string>>[]
  disabled?: boolean
  divClassName: string
  labelClassName: string
  selectClassName: string
  selectButtonClassName: string
  selectValueClassName: string
  selectArrowClassName: string
  onChange?(value: string, field: Readonly<SelectField<string, string>>): void
  onBlur?(value: string, field: Readonly<SelectField<string, string>>): void
}

function SelectWithLabel({
  field,
  options,
  disabled,
  divClassName,
  labelClassName,
  selectClassName,
  selectValueClassName,
  selectButtonClassName,
  selectArrowClassName,
  onChange,
  onBlur,
}: Props): JSX.Element {
  const { required = true } = field

  return (
    <div className={divClassName}>
      <Label
        id={field.id}
        label={field.label}
        className={labelClassName}
        required={required}
      />

      <div
        aria-invalid={field.invalid || (field.valid ? false : undefined)}
        className={selectClassName}
      >
        <Select
          field={field}
          options={options}
          disabled={disabled}
          required={required}
          selectValueClassName={selectValueClassName}
          onChange={onChange}
          onBlur={onBlur}
        />

        <div role='button' className={selectButtonClassName}>
          <div role='img' aria-hidden className={selectArrowClassName}>
            <SvgChevronRight />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SelectWithLabel)
