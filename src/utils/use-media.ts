import * as React from 'react'

import { noop } from 'src/utils/noop'
import { isBrowser } from 'src/utils/isbrowser'

const mockMediaQueryList: MediaQueryList = {
  media: '',
  matches: false,
  onchange: noop,
  addListener: noop,
  addEventListener: noop,
  removeListener: noop,
  removeEventListener: noop,
  dispatchEvent(_event: Event): boolean {
    return true
  },
}

export function useMedia(query: string): MediaQueryList {
  return React.useMemo<MediaQueryList>(
    function memo() {
      return isBrowser ? window.matchMedia(query) : mockMediaQueryList
    },
    [query]
  )
}
