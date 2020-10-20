import { createAction } from 'redux-actions'

import {
  CHANGE_INPUT,
} from 'src/redux/action-types'

import type {
  FieldsPayload,
  ChangeInputField,
} from 'src/types/fields'

export const changeInput = createAction<FieldsPayload<ChangeInputField>>(
  CHANGE_INPUT
)
