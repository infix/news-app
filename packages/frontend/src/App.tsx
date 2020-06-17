import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { NewsPage } from "./pages/NewsPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Favourites } from "./pages/Favourites";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={NewsPage} />
      <Route path="/login" render={Login} />
      <Route path="/register" render={Register} />
      <Route path="/favourites" render={Favourites} />
    </Switch>
  </Router>
);

export default App;
