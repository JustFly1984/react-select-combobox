

import type {
  SelectField,
} from 'src/library/types'

import { options } from 'src/components/home'

interface ContactFieldState {
  // Fields
  combobox1: SelectField<string, string>
  combobox2: SelectField<string, string>
}

export const initialFields: ContactFieldState = {
  combobox1: {
    path: ['contact', 'combobox1'],
    id: 'select-combobox-1',
    name: 'select-combobox-1',
    label: 'Select Combobox 1',
    defaultValue: 'Select option',
    invalid: false,
    valid: false,
    value: options[0].value,
  },
  combobox2: {
    path: ['contact', 'combobox2'],
    id: 'select-combobox-2',
    name: 'select-combobox-2',
    label: 'Select Combobox 2',
    defaultValue: 'Select option',
    invalid: false,
    valid: false,
    value: '',
  },
}
