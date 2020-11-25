import React from "react";
import classes from "./CheckoutSummary.module.css";
import Burger from "../../Burger";
import Button from "../../../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you like it!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.checkoutCancelledHandler} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.checkoutContinuedHandler} btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
