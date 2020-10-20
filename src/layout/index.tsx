import * as React from 'react'

import { reactMemo } from 'src/utils/react-memo'

interface Props {
  children: React.ReactNode
  isRestricted?: boolean
  layoutClassName: string
}

function Layout<T extends string>({
  children,
  layoutClassName,
}: Props): JSX.Element {
  return (
      <main className={layoutClassName}>
        {children}
      </main>
  )
}

export default reactMemo(Layout)
