import React, { Fragment, memo, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Col } from "react-bootstrap";
import { CheckoutContext } from "../../context/CheckoutContext";

function Index({ type, onChange, value }) {
  const Icon = type?.icon || Fragment;
  const { dispatch, constants } = useContext(CheckoutContext);
  return (
    <Col sm={4} md={6} xxl={2} xs={6} lg={4} className=" my-1">
      <button
        onClick={() => {
          onChange(type?.value);
          dispatch({
            type: constants.SET_PAYMENT_METHOD,
            payload: type?.value,
          });
        }}
        className={`payment-type-btn  ${
          value === type?.value ? "active" : ""
        } `}
      >
        <Icon />

        <label
          style={{
            pointerEvents: "none",
          }}
        >
          {type?.name}
        </label>
        <div className="payment-tick">
          <FaCheckCircle color="#22621A" />
        </div>
      </button>
    </Col>
  );
}

export default memo(Index);
