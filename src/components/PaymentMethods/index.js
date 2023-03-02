import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { memo } from "react";
import { Col } from "react-bootstrap";
import CreditCardForm from "./creditCardForm";
import "./index.css";
import PaymentTypes from "./paymentTypes";
import StripForm from "./stripForm";

function Index() {
  const [type, setType] = React.useState("credit-card");
  const stripePromise = loadStripe(
    "pk_test_51LNyONIO1PjoFqcMzIYtx2f4FO0qQPuXscfWledr1Uqsm6tXzCkaH5HsTTy8AR30tdBnYYwEdPjXKDltTte74XoL002XBGXOWw"
  );
  const typeChangeHandle = (e) => {
    setType(e);
  };

  const paymentForm = (value) => {
    switch (value) {
      case "credit-card":
        return <CreditCardForm />;

      case "stripe":
        return (
          <Elements stripe={stripePromise}>
            <StripForm />
          </Elements>
        );
      default:
        return null;
    }
  };
  return (
    <Col lg={12}>
      <PaymentTypes value={type} onChange={typeChangeHandle} />
      {paymentForm(type)}
    </Col>
  );
}

export default memo(Index);
