import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import localRoutes from "./routes";
import remoteRoutes from "app2/routes";

const routes = [...localRoutes, ...remoteRoutes];

console.log({
  routes,
  NODE_ENV: process.env.NODE_ENV,
});

const App = () => (
  <Router>
    <div>
      <h1>App 1</h1>
      <Navigation />
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
