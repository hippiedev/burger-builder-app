import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import CircularProgress from "@material-ui/core/CircularProgress";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Jonathan",
        address: "test street",
        zipCode: "10291",
        country: "Nigeria",
      },
      email: "test@test.com",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        console.log(response);
      })
      .catch((error) =>
        this.setState({
          loading: false,
        })
      );
  };
  
  render() {
    let buttonContent = 'Order'; 
    if (this.state.loading) {
        buttonContent = <CircularProgress
        style={{ margin: "0 auto", display: "block" }}
        variant="indeterminate"
        disableShrink
        color="secondary"
        size={20}
        thickness={4}
        {...this.props}
      />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="your name"
          />
          <input
            className={classes.Input}
            type="email"
            name="email"
            placeholder="your email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="your street"
          />
          <input
            className={classes.Input}
            type="text"
            name="postal"
            placeholder="your postal"
          />
          <Button btnType="Success" clicked={this.orderHandler}>
            {buttonContent}
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
