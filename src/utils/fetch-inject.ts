import { get } from 'total-functions'

function addElement(
  type: 'script' | 'style',
  content: string,
  resolve: () => void,
  reject: OnErrorEventHandler
): void {
  const element = document.createElement(type)

  element.onload = resolve
  element.onerror = reject

  if (element instanceof HTMLScriptElement) {
    element.async = true
    element.defer = true
  }

  element.appendChild(document.createTextNode(content))

  const list = document.getElementsByTagName(type)

  const item = list.length > 0 ? get(list, 0) : undefined

  if (item !== undefined && item.parentNode !== null) {
    item.parentNode.insertBefore(element, item)
  } else {
    document.head.appendChild(element)
  }
}

interface Resource {
  type: string
  content: string
}

function mountResources(
  resources: readonly Readonly<Resource>[]
): Promise<void[]> {
  const list: Promise<void>[] = []

  for (const { type, content } of resources) {
    list.push(
      new Promise<void>(function executor(resolve, reject) {
        const elemType = type.includes('text/css') ? 'style' : 'script'

        addElement(elemType, content, resolve, reject)
      })
    )
  }

  return Promise.all(list)
}

// imported in gatsby-browser.js
export function fetchInject(inputs: readonly string[]): Promise<void[]> {
  const resources: Promise<Resource>[] = []

  for (const input of inputs) {
    resources.push(
      window
        .fetch(input)
        .then<Resource>(function onfulfilled(response: Response) {
          const type =
            response.headers.get('content-type') ||
            response.headers.get('Content-Type') ||
            ''

          // eslint-disable-next-line promise/no-nesting
          return response
            .text()
            .then<Resource>(function onfulfilled(content: string) {
              return { type, content }
            })
        })
    )
  }

  return Promise.all(resources).then(mountResources)
}
