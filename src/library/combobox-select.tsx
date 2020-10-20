import * as React from 'react'
import { useDispatch } from 'react-redux'
import { get } from 'total-functions'

import { toggleBoolean } from 'src/utils/boolean'

import { changeInput } from 'src/redux/actions/fields'

import SvgChevronRight from 'src/svg/chevron-right'

import ComboboxSelectOption from 'src/library/combobox-select-option'

import type { SelectField, SelectOption } from 'src/library/types'

interface Props {
  id: string
  field: Readonly<SelectField<string, string>>
  options: readonly Readonly<SelectOption<string>>[]
  disabled?: boolean
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

function ComboboxSelect({
  id,
  field,
  options,
  disabled,
  selectArrowClassName,
  selectButtonClassName,
  selectClassName,
  selectDivClassName,
  selectValueClassName,
  listClassName,
  optionClassName,
  onChange,
  onBlur,
}: Props): JSX.Element {
  const dispatch = useDispatch()

  const onSelectChange = React.useCallback<
    (value: string, field: Readonly<SelectField<string, string>>) => void
  >(
    function callback(value, field) {
      dispatch(changeInput({ path: field.path, value }))

      if (typeof onChange === 'function') {
        onChange(value, field)
      }
    },
    [dispatch, onChange]
  )

  const onSelectBlur = React.useCallback<
    (value: string, field: Readonly<SelectField<string, string>>) => void
  >(
    function callback(value, field) {
      if (typeof onBlur === 'function') {
        onBlur(value, field)
      }
    },
    [onBlur]
  )

  const [open, setOpen] = React.useState<boolean>(false)
  const [activeIndex, setActiveIndex] = React.useState<number>(-1)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)

  React.useEffect(
    function effect(): void {
      if (disabled) {
        setOpen(false)
      }
    },
    [disabled]
  )

  const listRef = React.useRef<HTMLUListElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(
    function effect(): void {
      let index = options.findIndex(function findIndex(option): boolean {
        return option.value === field.value
      })

      if (index === -1 && options.length > 0 && open) {
        index = 0
      }

      if (open && listRef.current !== null) {
        listRef.current.focus()
      }

      setActiveIndex(index)
      setSelectedIndex(index)
    },
    [open, options, field.value]
  )

  const toggleDropdown = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(function callback(event) {
    event.stopPropagation()
    event.preventDefault()

    setOpen(toggleBoolean)
  }, [])

  const selectOption = React.useCallback<(index: number) => void>(
    function callback(index) {
      if (buttonRef.current !== null) {
        buttonRef.current.focus()
      }


      const option = get(options, index)

      if (option !== undefined) {
        onSelectChange(option.value, field)
      }
    
      setOpen(false)
    },
    [field, options, onSelectChange]
  )

  const onKeyDown = React.useCallback<
    React.KeyboardEventHandler<HTMLButtonElement | HTMLUListElement>
  >(
    function callback(event) {
      event.stopPropagation()

      switch (event.key) {
        case 'Enter':
        case ' ':
        case 'End':
        case 'Home':
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault()
          break
        default:
          break
      }

      switch (event.key) {
        case 'Enter':
        case ' ':
          setOpen(function set(open) {
            if (open) {
              setActiveIndex(function set(index) {
                if (index !== -1) {
                  selectOption(index)
                }

                return index
              })
            }

            return true
          })
          break

        case 'Escape': {
          setOpen(false)

          if (buttonRef.current !== null) {
            buttonRef.current.focus()
          }

          break
        }

        case 'End':
          setOpen(function set(open) {
            if (open) {
              setActiveIndex(options.length - 1)
            }

            return open
          })
          break

        case 'Home':
          setOpen(function set(open) {
            if (open) {
              setActiveIndex(0)
            }

            return open
          })
          break

        case 'ArrowUp':
          setOpen(function set(open) {
            if (open) {
              setActiveIndex(function set(index) {
                return (index - 1 + options.length) % options.length
              })
            }

            return true
          })
          break

        case 'ArrowDown':
          setOpen(function set(open) {
            if (open) {
              setActiveIndex(function set(index) {
                return (index + 1) % options.length
              })
            }

            return true
          })
          break

        default:
          break
      }
    },
    [selectOption, options.length]
  )

  const ref = React.useRef<HTMLDivElement>(null)

  const onDivBlur = React.useCallback<React.FocusEventHandler<HTMLDivElement>>(
    function callback(event) {
      if (
        ref.current !== null &&
        event.relatedTarget instanceof HTMLElement &&
        !ref.current.contains(event.relatedTarget)
      ) {
        event.stopPropagation()
        event.preventDefault()

        setOpen(false)

        setActiveIndex(function set(index) {
          if (onSelectBlur instanceof Function) {
            const option = index >= 0 ? get(options, index) : undefined

            onSelectBlur(
              option !== undefined ? option.value : field.value,
              field
            )
          }

          return index
        })
      }
    },
    [field, onSelectBlur, options]
  )

  const currentMemo = React.useMemo<Readonly<SelectOption<string>> | undefined>(
    function memo() {
      const value = field.value

      return options.find(function find(option): boolean {
        return option.value === value
      })
    },
    [field.value, options]
  )

  return (
    <div ref={ref} className={selectDivClassName} onBlur={onDivBlur}>
      <button
        id={field.id}
        ref={buttonRef}
        type='button'
        aria-haspopup='listbox'
        aria-labelledby={`${id}-label`}
        aria-controls={`${id}-owned_listbox`}
        aria-expanded={open}
        data-invalid={field.invalid || (field.valid ? false : undefined)}
        className={selectClassName}
        onClick={toggleDropdown}
        onKeyDown={onKeyDown}
      >
        <div className={selectValueClassName}>
          {currentMemo !== undefined && currentMemo.label !== undefined
            ? currentMemo.label
            : ''}
        </div>

        <div role='button' aria-hidden className={selectButtonClassName}>
          <div
            role='img'
            aria-hidden
            data-expanded={open}
            aria-controls={`${id}-owned_listbox`}
            className={selectArrowClassName}
          >
            <SvgChevronRight />
          </div>
        </div>
      </button>

      <ul
        ref={listRef}
        role='listbox'
        tabIndex={0}
        id={`${id}-owned_listbox`}
        aria-expanded={open}
        aria-activedescendant={
          activeIndex !== -1 ? `${id}-option-${activeIndex}` : undefined
        }
        className={listClassName}
        onKeyDown={onKeyDown}
      >
        {options.map(function mapper(option, index): JSX.Element {
          return (
            <ComboboxSelectOption
              key={option.value}
              index={index}
              id={id}
              option={option}
              active={open && index === activeIndex}
              selected={open && index === selectedIndex}
              onSelect={selectOption}
              className={optionClassName}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default React.memo(ComboboxSelect)
