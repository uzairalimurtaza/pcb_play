import { loadStripe } from "@stripe/stripe-js";
import React, { memo } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
function Index() {
  const { cart } = useSelector((state) => state.dashboard);
  const { items } = cart;

  const getStripe = async () => {
    return loadStripe(
      "pk_test_51LNyONIO1PjoFqcMzIYtx2f4FO0qQPuXscfWledr1Uqsm6tXzCkaH5HsTTy8AR30tdBnYYwEdPjXKDltTte74XoL002XBGXOWw"
    );
  };
  console.log(getStripe());
  const checkoutOptions = {
    lineItems: items.map((item) => ({
      price: `${item.price}`,
      quantity: item.quantity,
    })),
    successUrl: "https://localhost:3000/checkout",
    cancelUrl: "https://localhost:3000/cart",
    mode: "payment",
  };
  const redirectToCheckout = async () => {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    if (error) {
      console.warn("Error:", error);
    }
  };
  return (
    <Button
      onClick={redirectToCheckout}
      variant="danger"
      className="w-100  d-flex    justify-content-center align-items-center "
    >
      Pay Now
    </Button>
  );
}

export default memo(Index);
