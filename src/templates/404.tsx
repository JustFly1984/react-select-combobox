import * as React from 'react'

import Layout from 'src/layout'

import NotFound from 'src/components/notfound'

function NotFoundPage(): JSX.Element {
  return (
    <Layout
      layoutClassName=''
    >
      <NotFound />
    </Layout>
  )
}

export default React.memo(NotFoundPage)
