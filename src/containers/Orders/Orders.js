import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Order from "../../components/Burger/Order/Order";
import axios from "../../axios-orders";
import {connect} from 'react-redux';
import withErrorHandler from "../../hoc/Auxillary/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';

export class Orders extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }
  render() {
    let orders = (
      <div>
        {this.props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
    if (this.props.loading) {
      orders = (
        <CircularProgress
          style={{ margin: "0 auto", display: "block" }}
          variant="indeterminate"
          disableShrink
          color="secondary"
          size={20}
          thickness={4}
          {...this.props}
        />
      );
    }
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps =  dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
