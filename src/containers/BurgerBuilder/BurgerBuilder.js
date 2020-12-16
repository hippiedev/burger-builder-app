import React, { Component } from "react";
import { Aux } from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "../../components/UI/Modal/Modal";
import axios from "../../axios-orders";
import OrderSummary from "../../components/Burger/Order/OrderSummary/OrderSummary";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import withErrorHandler from "../../hoc/Auxillary/withErrorHandler/withErrorHandler";
/*
import axios from "../../axios-orders";
import withErrorHanler from "../../hoc/Auxillary/withErrorHandler/withErrorHandler";
*/


class BurgerBuilder extends Component {
  state = {
    totalPrice: 0,
    purchasing: false,
  };
  
  componentDidMount() {
    this.props.onInitIngredients()
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    }
    else {
      this.props.history.push('/auth');
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
      this.props.history.push('/checkout');
      this.props.onInitPurchase()
  };
  
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }
  

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p>
    ) : (
      <CircularProgress
        style={{ margin: "0 auto", display: "block" }}
        variant="indeterminate"
        disableShrink
        color="secondary"
        size={40}
        thickness={4}
        {...this.props}
      />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = (
        <CircularProgress
          style={{ margin: "0 auto", display: "block" }}
          variant="indeterminate"
          disableShrink
          color="secondary"
          size={40}
          thickness={4}
          {...this.props}
        />
      );
    }

    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased,
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
