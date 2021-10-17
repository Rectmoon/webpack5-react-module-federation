import React from 'lib-app/react'

const HomePage = React.lazy(() => import('./views/HomePage'))

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
  }
]

export default routes
