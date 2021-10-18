import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { NameContextProvider } from 'contexts'

import Navigation from './components/Navigation'
import localRoutes from './routes'
import remoteRoutes from 'app2/routes'

const routes = [...localRoutes, ...remoteRoutes]
// const Welcome = React.lazy(() => import('app2/Welcome'))

const App = () => {
  const [name, setName] = React.useState('Billy666')

  return (
    <Router>
      <div>
        <h1>Hello Rectmoon</h1>

        <Navigation />

        {/* <NameContextProvider.Provider value={{ name, setName }}>
          <React.Suspense fallback='Loading Name'>
            <Welcome />
          </React.Suspense>
        </NameContextProvider.Provider> */}

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
