import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "./pages/index";
import Random from "./pages/random";
import { Error } from "./comps";
function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Random Rabbit</title>
      </Helmet>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/app/:slug" component={Random} />
          {/* <Route render={() => <Error code="404" />} /> */}
        </Switch>
      </Router>
    </HelmetProvider>
  );
}

export default App;
