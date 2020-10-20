import * as React from 'react'

interface IdentityFunction {
  <T>(fn: T): T
}

export const reactMemo = React.memo as IdentityFunction
