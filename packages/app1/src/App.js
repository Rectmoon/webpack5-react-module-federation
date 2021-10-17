import React from 'lib-app/react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'lib-app/react-router-dom'
import { NameContextProvider } from 'lib-app/contexts'

import Navigation from './components/Navigation'
import localRoutes from './routes'
import remoteRoutes from 'app2/routes'

const routes = [...localRoutes, ...remoteRoutes]
const Welcome = React.lazy(() => import('app2/Welcome'))

const App = () => {
  const [name, setName] = React.useState('Billy666')

  return (
    <Router>
      <div>
        <h1>App 1</h1>
        <Navigation />

        <NameContextProvider.Provider value={{ name, setName }}>
          <React.Suspense fallback='Loading Name'>
            <Welcome />
          </React.Suspense>
        </NameContextProvider.Provider>

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
}

export default App
