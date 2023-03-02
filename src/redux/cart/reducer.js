import * as constants from "./constants";

let initState = null;

function authReducer(state = initState, action) {
  let { payload } = action;
  switch (action.type) {
    case constants.CREATE_NEW_CART_CODE:
      return payload;
    case constants.UPDATE_CART_CODE:
      return payload;
    default:
      return state;
  }
}

export default authReducer;
