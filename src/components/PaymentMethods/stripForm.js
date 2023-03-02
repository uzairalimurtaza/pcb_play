import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { memo, useContext } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CheckoutContext } from "../../context/CheckoutContext";
import { placeOrderByStripe } from "../../redux/auth/action";
function Index() {
  const stripe = useStripe();
  const elements = useElements();

  const { state } = useContext(CheckoutContext);
  const { addressId } = state;
  const dispatch = useDispatch();
  const stopLoader = (data) => {
    window.location.href = "/thank-you/" + data._id;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
    } else {
      dispatch(
        placeOrderByStripe(
          {
            paymentId: paymentMethod.id,
            addressId,
          },
          stopLoader
        )
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-3">
        <CardElement />
      </div>
      <Button
        type="submit"
        disabled={!stripe || !elements}
        variant="danger"
        className="w-100  d-flex    justify-content-center align-items-center "
      >
        Pay Now
      </Button>
    </form>
  );
}

export default memo(Index);
