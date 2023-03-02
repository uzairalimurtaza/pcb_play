import React, { createContext, useReducer } from "react";
import * as constants from "./constants";

const initialState = {
  card: {
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  },
  paymentMethod: "credit-card",
  addressId: null,
};

const CheckoutContext = createContext(initialState);
const { Provider } = CheckoutContext;

const CheckOutProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case constants.SET_CARD:
        return {
          ...state,
          card: {
            ...state.card,
            ...action.payload,
          },
        };
      case constants.SET_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload,
        };
      case constants.SET_USER_ADDRESS:
        return {
          ...state,
          addressId: action.payload,
        };
      default:
        return state;
    }
  }, initialState);
  const value = {
    state,
    dispatch,
    constants,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { CheckoutContext, CheckOutProvider };
