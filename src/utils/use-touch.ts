import * as React from 'react'

import { useMedia } from 'src/utils/use-media'

export function useTouch(): boolean {
  const media = useMedia('(hover: none), (pointer: none), (pointer: coarse)')

  const [matches, setMatches] = React.useState<boolean>(media.matches)

  React.useEffect(
    function effect(): () => void {
      function onChange(this: MediaQueryList): void {
        setMatches(this.matches)
      }

      media.addListener(onChange)

      return function cleanup(): void {
        media.removeListener(onChange)
      }
    },
    [media]
  )

  return matches
}
