import { withPrefix } from 'gatsby'

import { fetchInject } from 'src/utils/fetch-inject'

import 'src/styles/reset.css'
import 'src/styles/root.css'

// should be imported relative!!!
export { wrapRootElement } from './wrap-root-element-ssr'

function onrejected(err) {
  console.error(err instanceof Error ? err.stack : err)
}

function importIntlDeps() {
  const modules = []

  if (!Intl.PluralRules) {
    modules.push(
      import('intl-pluralrules')
        .then(function onfulfilled() {
          return import('@formatjs/intl-pluralrules/polyfill')
        })
        .then(function onfulfilled() {
          return Promise.all([
            import('@formatjs/intl-pluralrules/locale-data/en'),
            import('@formatjs/intl-pluralrules/locale-data/ru'),
          ])
        })
    )
  }

  if (!Intl.RelativeTimeFormat) {
    modules.push(
      import('@formatjs/intl-relativetimeformat/polyfill').then(
        function onfulfilled() {
          return Promise.all([
            import('@formatjs/intl-relativetimeformat/locale-data/en'),
            import('@formatjs/intl-relativetimeformat/locale-data/ru'),
          ])
        }
      )
    )
  }

  return Promise.all(modules)
}

function importModules() {
  const modules = []

  if (process.env.NODE_ENV === 'development') {
    modules.push(
      import('react-perf-devtool')
        .then(function onfulfilled(devtool) {
          devtool.registerObserver()

          return
        })
        .catch(onrejected)
    )
  }

  if (!window.IntersectionObserver) {
    modules.push(import('intersection-observer'))
  }

  const intlImport = (window.Intl ? Promise.resolve() : import('intl')).then(
    importIntlDeps
  )

  modules.push(intlImport)

  return Promise.all(modules)
}

function initApp() {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.document.addEventListener(
      'touchmove',
      function listener(event) {
        if (event.scale !== 1) {
          event.preventDefault()
        }
      },
      { passive: false }
    )
  }

  fetchInject([withPrefix('/fonts/roboto.min.css')])
}

export function onClientEntry() {
  return importModules().then(initApp).catch(onrejected)
}
