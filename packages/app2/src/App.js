import React from "lib-app/react";
import { BrowserRouter as Router, Route, Switch } from "lib-app/react-router-dom";
import { NameContextProvider } from "lib-app/contexts";
import Welcome from "./components/Welcome";

import localRoutes from "./routes";
import Navigation from "app1/Navigation";
import remoteRoutes from "app1/routes";

const routes = [...localRoutes, ...remoteRoutes];

const App = () => (
  <Router>
    <div>
      <h1>App 2</h1>
      <Navigation />
      <NameContextProvider.Provider value="Rectmoon">
        <Welcome />
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
