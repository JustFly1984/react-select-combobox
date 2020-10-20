import * as React from 'react'

import { scrollToElement } from 'src/utils/scroll'

import type { SelectOption } from 'src/library/types'

interface Props {
  id: string
  className: string
  index: number

  option: Readonly<SelectOption<string>>

  selected: boolean
  active: boolean

  onSelect(index: number): void
}

function Option<T extends string>({
  selected,
  onSelect,
  option,
  active,
  index,
  id,
  className,
}: Props): JSX.Element {
  const itemRef = React.useRef<HTMLLIElement>(null)

  React.useEffect(
    function effect(): void {
      if (active) {
        scrollToElement(itemRef.current)
      }
    },
    [active]
  )

  const onClick = React.useCallback<React.MouseEventHandler<HTMLLIElement>>(
    function callback() {
      onSelect(index)
    },
    [index, onSelect]
  )

  return (
    <li
      role='option'
      ref={itemRef}
      id={`${id}-option-${index}`}
      aria-current={active}
      aria-selected={selected}
      className={className}
      onKeyDown={undefined}
      onClick={onClick}
    >
      {option.label}
    </li>
  )
}

export default React.memo(Option)
