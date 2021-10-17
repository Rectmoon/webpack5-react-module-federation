import React from 'lib-app/react'

const AboutPage = React.lazy(() => import('./views/AboutPage'))

const routes = [
  {
    path: '/about',
    component: AboutPage,
    exact: true
  }
]

export default routes
