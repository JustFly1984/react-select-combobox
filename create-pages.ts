/* eslint-env node */
import * as path from 'path'

import type { CreatePagesArgs } from 'gatsby'

// @see https://www.gatsbyjs.org/docs/actions/#createPage
const LandingTemplate = path.resolve('./src/templates/index.tsx')
const NotFoundTemplate = path.resolve('./src/templates/404.tsx')

interface PageTemplate {
  path: string
  matchPath?: string
  component: string
}

interface PageContext {
  
}

interface Page extends PageTemplate {
  context: PageContext
}

function createPages({ actions: { createPage } }: CreatePagesArgs): void {
  function createEachPage(pages: Page[]): void {
    for (const page of pages) {
      console.info('page.path:', page.path)

      createPage<PageContext>(page)
    }
  }

  const pagesList: Page[] = [
    {
      path: '/',
      component: LandingTemplate,
      context: {},
    },
  ]

  pagesList.push({
    path: '/404.html',
    matchPath: '/*',
    component: NotFoundTemplate,
    context: {},
  })

  createEachPage(pagesList)
}

export default createPages
