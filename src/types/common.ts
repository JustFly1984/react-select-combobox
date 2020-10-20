import type { Action } from 'redux'

import type { AppState } from 'src/redux/reducers'

export type ReduxState = AppState

interface ActionPayload<T> {
  payload: T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReduxAction<T = any> = Action<string> & ActionPayload<T>

export type DangerHtml = Exclude<
  React.DOMAttributes<HTMLElement>['dangerouslySetInnerHTML'],
  void
>