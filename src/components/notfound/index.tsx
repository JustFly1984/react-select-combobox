import * as React from 'react'

import * as styles from 'src/styles/404.module.css'

import type { RouteComponentProps } from '@reach/router'

function NotFound(_: RouteComponentProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
      </div>
    </div>
  )
}

export default React.memo(NotFound)
