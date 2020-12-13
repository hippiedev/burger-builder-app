import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Order from "../../components/Burger/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/Auxillary/withErrorHandler/withErrorHandler";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
    if (this.state.loading) {
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

export default withErrorHandler(Orders, axios);
