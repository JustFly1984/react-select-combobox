// Fields

type PathStep = string | number

type Path = readonly PathStep[]

interface Option<V, L> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  value: V
  label: L
}

export type SelectOption<T> = Option<string, T>


export interface SelectField<V extends string, L extends string> {
  path: Path
  value: V
  defaultValue: string
  label: L
  placeholder?: L
  disabled?: boolean
  required?: boolean
  invalid: boolean
  valid: boolean
  name: string
  id: string
}
