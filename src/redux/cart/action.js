import * as constants from "./constants";
import * as dashboardConstants from "../dashboard/constants";

import CryptoJS from "crypto-js";

export const createNewCart = (cart, cb) => async (dispatch) => {
  const or = CryptoJS.AES.encrypt(
    JSON.stringify({ ...cart }),
    "hdfsur13413--32847djfh38--5^%#*%#fh3963"
  ).toString();
  try {
    dispatch({
      type: constants.CREATE_NEW_CART_CODE,
      payload: or,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};
export const getCartDetail = (code, cb) => async (dispatch) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      code,
      "hdfsur13413--32847djfh38--5^%#*%#fh3963"
    );
    const data = bytes.toString(CryptoJS.enc.Utf8);

    const dataRaw = JSON.parse(data);

    dispatch({
      type: dashboardConstants.CREATE_NEW_CART,
      payload: dataRaw,
    });
    cb();
  } catch (error) {
    console.log(error);
    cb();
  }
};

export const updateCart = (data, cb) => async (dispatch, getState) => {
  try {
    const cart = getState().dashboard.cart;

    const newCart = { ...cart, ...data };

    const or = CryptoJS.AES.encrypt(
      JSON.stringify({ ...newCart }),
      "hdfsur13413--32847djfh38--5^%#*%#fh3963"
    ).toString();
    dispatch({
      type: constants.UPDATE_CART_CODE,
      payload: or,
    });
    cb?.();
  } catch (error) {
    cb?.();

    console.log(error);
  }
};
