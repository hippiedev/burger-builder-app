import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./containers/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom";
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/auth" component={Auth} />
            <Route path="/orders" component={Orders} />
            <Route exact path="/" component={BurgerBuilder} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
