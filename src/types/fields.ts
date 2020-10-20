type PathStep = string | number

type Path = readonly PathStep[]

interface FieldsPayloadAny {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type FieldsPayload<T = FieldsPayloadAny> = {
  path: Path
} & T

interface FieldsState {

}

export interface FieldsReducer<
  FieldsStateValue extends FieldsState = FieldsState
> {
  initialFields: FieldsStateValue
  fetchRequest?(draft: FieldsState, payload: FieldsPayload): void
  fetchSuccess?(draft: FieldsState, payload: FieldsPayload): void
  fetchFailure?(draft: FieldsState, payload: FieldsPayload): void
}

export interface ChangeInputField {
  value: string | number
  valid?: boolean
  invalid?: boolean
}
