import React, { memo, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../../redux/cart/action";
import { CheckoutContext } from "../../context/CheckoutContext";
import { placeOrderByPaypal } from "../../redux/auth/action";
function Index() {
  const dispatch = useDispatch();
  const { state } = useContext(CheckoutContext);
  const { cart } = useSelector((state) => state.dashboard);
  const { items } = cart;
  const { paymentMethod, addressId } = state;
  const stopLoader = (data) => {
    window.location.href = "/thank-you/" + data._id;
  };
  const placeOrderByPaypalHandler = () => {
    dispatch(
      placeOrderByPaypal(
        {
          addressId,
          paymentMethod,
        },
        stopLoader
      )
    );
  };
  console.log(items);
  const onApproveHandler = async (data, actions) => {
    const order = await actions.order.capture();
    dispatch(
      updateCart(
        {
          paypal: order,
        },
        placeOrderByPaypalHandler
      )
    );
  };
  const purchase_units = items
    .map((item) => {
      return {
        description: `${item.partNumber}-${item.blockType}`,
        reference_id: item.productId,
        amount: {
          value: parseFloat(item.total).toFixed(2),
        },
      };
    })
    .concat([
      {
        description: "Service fee",
        reference_id: `pcb-service-fee`,

        amount: {
          value: cart.serviceFee,
        },
      },
    ]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AQogz81GNLmLiYPf9pw2K00JoWCaf6glfNzVzjGHme0xsYHqoox61flnMr2ZkpQ68odYldD7Q2SB3-t9",

        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units,
          });
        }}
        onApprove={onApproveHandler}
      />
    </PayPalScriptProvider>
  );
}

export default memo(Index);
