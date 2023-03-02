import React, { memo, useContext } from "react";
import { Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CheckoutContext } from "../../context/CheckoutContext";
import { placeOrderByIyzipay } from "../../redux/auth/action";
import PaypalButton from "./PaypalButton";

function Index() {
  const { state } = useContext(CheckoutContext);
  const { card, paymentMethod, addressId } = state;

  const cardisValid = () => {
    if (card.number && card.name && card.expiry && card.cvc) {
      return true;
    }
    return false;
  };
  const dispatch = useDispatch();
  const [loader, setLoader] = React.useState(false);
  const stopLoader = (data) => {
    window.location.href = "/thank-you/" + data._id;
    setLoader(false);
  };
  const buyNowHandler = () => {
    setLoader(true);
    dispatch(
      placeOrderByIyzipay(
        {
          paymentMethod,
          card,
          addressId,
        },
        stopLoader
      )
    );
  };
  if (!addressId) {
    return (
      <Col lg={12} className="mx-auto my-3">
        <div className="w-100 text-center">
          <p
            style={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: " 14px",
              lineHeight: "21px",

              color: "#979797",
            }}
          >
            * please select a delivery address to continue
          </p>
        </div>
      </Col>
    );
  }
  return (
    <Col lg={12} className="mx-auto my-3">
      {paymentMethod === "credit-card" ? (
        <>
          {cardisValid() ? (
            <Button
              onClick={buyNowHandler}
              disabled={loader}
              variant="danger"
              className="  w-100 d-flex    justify-content-center align-items-center "
            >
              {loader ? "Processing..." : "Pay Now"}
            </Button>
          ) : (
            <Button
              disabled
              variant="danger"
              className="w-100  d-flex    justify-content-center align-items-center "
            >
              Pay Now
            </Button>
          )}
        </>
      ) : paymentMethod === "paypal" ? (
        <PaypalButton />
      ) : (
        <div className="w-100 text-center">
          <p
            style={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: " 14px",
              lineHeight: "21px",

              color: "#979797",
            }}
          >
            * please select a payment method to continue
          </p>
        </div>
      )}
    </Col>
  );
}

export default memo(Index);
