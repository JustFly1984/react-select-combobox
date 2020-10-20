import * as React from 'react'
import { Provider } from 'react-redux'
import { Store, applyMiddleware, compose, createStore, Middleware } from 'redux'
import createDebounce from 'redux-debounced'
import thunk from 'redux-thunk'

import { isDevelopment } from 'src/utils/isdevelopment'
import { isBrowser } from 'src/utils/isbrowser'

import reducers, { AppState } from 'src/redux/reducers'

declare global {
  interface Document {
    msHidden: boolean
    webkitHidden: boolean
  }

  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?(): Middleware
    devToolsExtension?: boolean
  }
}

function noop(func: Middleware): Middleware {
  return func
}

const devtools =
  isBrowser && isDevelopment && window.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : noop
    : noop

function configureStore(): Store<AppState> {
  return createStore(
    reducers,
    undefined,
    compose(applyMiddleware(createDebounce(), thunk), devtools)
  )
}

const store = configureStore()

interface Props {
  element: React.ReactNode
}

export function wrapRootElement(props: Props): JSX.Element {
  return (
    <Provider store={store}>
     {props.element}
    </Provider>
  )
}
