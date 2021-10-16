import React from "lib-app/react";
import { NameContextProvider } from "lib-app/contexts";
import { BrowserRouter as Router, Route, Switch } from "lib-app/react-router-dom";

import Navigation from "./components/Navigation";
import localRoutes from "./routes";
import remoteRoutes from "app2/routes";

const routes = [...localRoutes, ...remoteRoutes];
const Welcome = React.lazy(() => import("app2/Welcome"));

const App = () => (
  <Router>
    <div>
      <h1>App 1</h1>
      <Navigation />

      <NameContextProvider.Provider value="Billy">
        <React.Suspense fallback="Loading Name">
          <Welcome />
        </React.Suspense>
      </NameContextProvider.Provider>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {routes.map((route) => (
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
);

export default App;
