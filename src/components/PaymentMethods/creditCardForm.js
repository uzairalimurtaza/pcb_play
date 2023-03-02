import valid from "card-validator";
import React, { memo, useContext } from "react";
import { Form, Row } from "react-bootstrap";
import { MastercardIcon } from "../../assets";
import { CheckoutContext } from "../../context/CheckoutContext";

function Index() {
  const { dispatch, constants } = useContext(CheckoutContext);
  const handleSubmit = () => {};

  const [error, setError] = React.useState({
    cardNumber: null,
    cardName: null,
    cardExpiry: null,
    cardCvv: null,
  });
  const handleChangeCardNumber = (e) => {
    const { value } = e.target;
    const { isValid } = valid.number(value);
    if (!isValid) {
      setError({ ...error, cardNumber: "enter valid card number" });
    } else {
      setError({ ...error, cardNumber: null });
      dispatch({ type: constants.SET_CARD, payload: { number: value } });
    }
  };
  const handleChangeCardName = (e) => {
    const { value } = e.target;
    const { isValid } = valid.cardholderName(value);
    if (!isValid) {
      setError({ ...error, cardName: "enter valid name" });
    } else {
      setError({ ...error, cardName: null });
      dispatch({ type: constants.SET_CARD, payload: { name: value } });
    }
  };
  const handleChangeCardExpiry = (e) => {
    const { value } = e.target;
    const { isValid } = valid.expirationDate(value);
    if (!isValid) {
      setError({ ...error, cardExpiry: "enter valid expiry date" });
    } else {
      setError({ ...error, cardExpiry: null });

      dispatch({ type: constants.SET_CARD, payload: { expiry: value } });
    }
  };
  const handleChangeCardCvv = (e) => {
    const { value } = e.target;
    const { isValid } = valid.cvv(value);
    if (!isValid) {
      setError({ ...error, cardCvv: "enter valid cvv" });
    } else {
      setError({ ...error, cardCvv: null });
      dispatch({ type: constants.SET_CARD, payload: { cvc: value } });
    }
  };

  return (
    <Row className="my-4">
      <Form
        onSubmit={handleSubmit}
        className="payment-form w-50 gap-4 d-flex flex-column"
      >
        <Form.Group>
          <Form.Label>
            card number
            <span
              style={{
                color: "red",
                marginLeft: "10px",
              }}
            >
              *
            </span>
          </Form.Label>
          <div className="d-flex credit-card-number">
            <Form.Control
              type="text"
              onChange={handleChangeCardNumber}
              placeholder="1234 5678 9874 1234"
            />
            <div className="d-flex">
              <MastercardIcon />
              <MastercardIcon />
            </div>
          </div>
          {error.cardNumber && (
            <Form.Text className="text-danger">{error.cardNumber}</Form.Text>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>
            name on card
            <span
              style={{
                color: "red",
                marginLeft: "10px",
              }}
            >
              *
            </span>
          </Form.Label>

          <Form.Control
            type="text"
            onChange={handleChangeCardName}
            placeholder="enter your name"
          />
          {error.cardName && (
            <Form.Text className="text-danger">{error.cardName}</Form.Text>
          )}
        </Form.Group>
        <div className="d-flex gap-2">
          <Form.Group className="w-50">
            <Form.Label>
              expiry
              <span
                style={{
                  color: "red",
                  marginLeft: "10px",
                }}
              >
                *
              </span>
            </Form.Label>
            <Form.Control
              type="text"
              onKeyDown={(e) => {
                if (e.target.value.length === 2 && e.keyCode !== 8) {
                  e.target.value = e.target.value + "/";
                }
              }}
              onChange={handleChangeCardExpiry}
              placeholder="MM / YY"
            />
            {error.cardExpiry && (
              <Form.Text className="text-danger">{error.cardExpiry}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="w-50">
            <Form.Label>
              cvc
              <span
                style={{
                  color: "red",
                  marginLeft: "10px",
                }}
              >
                *
              </span>
            </Form.Label>
            <Form.Control
              type="number"
              onChange={handleChangeCardCvv}
              placeholder="cvc"
            />
            {error.cardCvv && (
              <Form.Text className="text-danger">{error.cardCvv}</Form.Text>
            )}
          </Form.Group>
        </div>
      </Form>
    </Row>
  );
}

export default memo(Index);
