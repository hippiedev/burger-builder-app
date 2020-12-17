import React, { Component } from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./containers/Layout/Layout";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route exact path="/" component={BurgerBuilder} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
