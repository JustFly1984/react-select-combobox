import * as React from 'react'

import SelectCombobox from 'src/components/home/select-combobox'
import SelectCombobox2 from 'src/components/home/select-combobox-2'

import * as styles from 'src/styles/contactus.module.css'

import type { SelectOption } from 'src/library/types'

export const options: readonly [
  Readonly<SelectOption<string>>,
  Readonly<SelectOption<string>>,
  Readonly<SelectOption<string>>,
  Readonly<SelectOption<string>>,
  Readonly<SelectOption<string>>
] = [
  { value: 'option1', label: 'option1' },
  {
    value: 'option2',
    label: 'option2',
  },
  {
    value: 'option3',
    label: 'option3',
  },
  { value: 'option4', label: 'option4' },
  { value: 'option5', label: 'option5' },
]

function Home(): JSX.Element {
  return (
    <div>
      <div className={styles.box}>
        <SelectCombobox
          options={options}
          divClassName={styles.label}
          labelClassName={styles.labelText}
          selectDivClassName={styles.selectDiv}
          selectClassName={styles.select}
          selectValueClassName={styles.selectValue}
          selectButtonClassName={styles.selectButton}
          selectArrowClassName={styles.selectArrow}
          listClassName={styles.selectList}
          optionClassName={styles.selectOption}
          />
      </div>

      <div className={styles.box}>
        <SelectCombobox2
          options={options}
          divClassName={styles.label}
          labelClassName={styles.labelText}
          selectDivClassName={styles.selectDiv}
          selectClassName={styles.select}
          selectValueClassName={styles.selectValue}
          selectButtonClassName={styles.selectButton}
          selectArrowClassName={styles.selectArrow}
          listClassName={styles.selectList}
          optionClassName={styles.selectOption}
          />
      </div>
    </div>
  )
}

export default React.memo(Home)
