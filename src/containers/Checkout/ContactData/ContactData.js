import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import CircularProgress from "@material-ui/core/CircularProgress";
import Input from "../../../components/UI/Input/Input";
import 'react-router';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
          elementType: 'input',
          elementConfig: {
              type: 'text',
              placeholder: 'Your Name',
          },
          value: "",
      }, 
      street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Street',
        },
        value: "",
    },
      zipCode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'ZIP Code',
        },
        value: "",
    },
      country: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Country',
        },
        value: "",
    },
      email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Your Email',
        },
        value: "",
    },
      deeliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'Cheapest', displayValue: 'Cheapest'},
        ]
        },
        value: "",
    },
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
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        console.log(this.props);
      })
      .catch((error) =>
        this.setState({
          loading: false,
        })
      );
  };

  render() {
    let buttonContent = "Order";
    if (this.state.loading) {
      buttonContent = (
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
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form>
          <Input
            inputtype="input"
            type="text"
            name="name"
            placeholder="Your name"
          />
          <Input
            inputtype="input"
            type="email"
            name="email"
            placeholder="Your email"
          />
          <Input
            inputtype="input"
            type="text"
            name="street"
            placeholder="Street"
          />
          <Input
            inputtype="input"
            type="text"
            name="postal"
            placeholder="Postal"
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
