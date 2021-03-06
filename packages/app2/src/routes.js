import React from 'react'

const AboutPage = React.lazy(() => import('./views/AboutPage'))

const routes = [
  {
    path: '/about',
    component: AboutPage,
    exact: true
  }
]

export default routes
