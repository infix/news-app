import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { NewsPage } from "./pages/NewsPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Favourites } from "./pages/Favourites";

import { ApolloProvider } from "@apollo/react-hooks";
import { apolloClient } from "./apolloClient";

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <Switch>
        <Route path="/" exact>
          <NewsPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/favourites">
          <Favourites />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);
