import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import localRoutes from './routes'
// import Navigation from 'app1/Navigation'
// import remoteRoutes from 'app1/routes'

const routes = [...localRoutes]
// const routes = [...localRoutes, ...remoteRoutes]

const App = () => (
  <Router>
    <div>
      <h1>App 2</h1>
      {/* <Navigation /> */}

      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      </React.Suspense>
    </div>
  </Router>
)

export default App
