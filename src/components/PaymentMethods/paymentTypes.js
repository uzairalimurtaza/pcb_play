import React, { memo, useEffect } from "react";
import { Row } from "react-bootstrap";
import { CreditCardIcon, PaypalIcon, StripeIcon } from "../../assets";
import PaymentType from "./paymentType";

const types = [
  {
    name: "credit card",
    icon: CreditCardIcon,
    value: "credit-card",
  },
  {
    name: "paypal",
    icon: PaypalIcon,
    value: "paypal",
  },
  {
    name: "stripe",
    icon: StripeIcon,
    value: "stripe",
  },
];
function Index({ onChange, value }) {
  const [active, setActive] = React.useState("");
  const handleChange = (e) => {
    setActive(e);
  };
  useEffect(() => {
    if (value) {
      setActive(value);
    }
  }, [value]);
  useEffect(() => {
    onChange(active);
  }, [active, onChange]);
  return (
    <Row>
      {types.map((type, index) => (
        <PaymentType
          value={active}
          onChange={handleChange}
          key={index}
          type={type}
        />
      ))}
    </Row>
  );
}

export default memo(Index);
