import { produce } from 'immer'
import { get } from 'total-functions'

import { getIn, mergeDeep } from 'src/utils/object'

import {
  CHANGE_INPUT,
} from 'src/redux/action-types'

import type {
  FieldsPayload,
  FieldsReducer,
  ChangeInputField,
} from 'src/types/fields'

import type { ReduxAction } from 'src/types/common'

import * as contact from 'src/redux/reducers/contact'

const reducersFields = {
  contact,
} as const

function pluck<
  T extends Record<string, FieldsReducer>,
  V extends keyof T[keyof T] & keyof FieldsReducer,
  R extends { [K in keyof T]: V extends keyof T[K] ? T[K][V] : never }
>(objects: T, key: V): R {
  return Object.entries(objects).reduce<R>(
    function reducer(acc, [name, data]) {
      // eslint-disable-next-line total-functions/no-unsafe-type-assertion
      acc[name as keyof R] = data[key] as R[keyof R]

      return acc
    },
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    {} as R
  )
}

const initialState = pluck(reducersFields, 'initialFields')

// Automatically get type from state
export type FieldsStateType = typeof initialState

// Create alias
type DraftState = {
  -readonly [K in keyof FieldsStateType]: FieldsStateType[K]
}

interface ActionHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (draft: DraftState, payload: FieldsPayload<any>): void
}

const handlers: Readonly<Record<string, ActionHandler | undefined>> = {
  [CHANGE_INPUT](
    draft: DraftState,
    { path, value, ...rest }: FieldsPayload<ChangeInputField>
  ): void {
    mergeDeep(getIn(draft, path), { value, ...rest })
  },
} as const

export default produce(function producer(
  draft: DraftState = initialState,
  action: ReduxAction
): DraftState {
  const handler = get(handlers, action.type)

  if (handler !== undefined) {
    handler(draft, action.payload)
  }

  return draft
})
