import * as React from 'react'

import type { DangerHtml } from 'src/types/common'

interface Props {
  htmlAttributes: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHtmlElement>,
    HTMLHtmlElement
  >
  headComponents: React.ReactNode
  bodyAttributes: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLBodyElement>,
    HTMLBodyElement
  >
  preBodyComponents: React.ReactNode
  body: string
  postBodyComponents: React.ReactNode
}

function Html(props: Props): JSX.Element {
  const html = React.useMemo<DangerHtml>(
    function memo() {
      return { __html: props.body }
    },
    [props.body]
  )

  return (
    // eslint-disable-next-line jsx-a11y/html-has-lang
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet='utf-8' />

        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />

        {props.headComponents}
      </head>

      <body {...props.bodyAttributes}>
        {props.preBodyComponents}

        <div key='body' id='___gatsby' dangerouslySetInnerHTML={html} />

        {props.postBodyComponents}
      </body>
    </html>
  )
}

export default React.memo(Html)
