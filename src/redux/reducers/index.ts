import { combineReducers } from 'redux'
import { enableMapSet, enableES5 } from 'immer'

import { isES6 } from 'src/utils/es6'

import fields, { FieldsStateType } from 'src/redux/reducers/fields'

if (!isES6) {
  enableES5()
}

enableMapSet()

export interface AppState {
  fields: FieldsStateType
}

export default combineReducers<AppState>({
  fields,
})
