import * as constants from "./constants";

let initState = null;

function removeUserAddress(state = initState, action) {
  let { payload } = action;
  switch (action.type) {
    case constants.DELETE_USER_ADDRESS_RESET:
      return null;
    case constants.DELETE_USER_ADDRESS:
      return { ...payload, success: true };
    case constants.DELETE_USER_ADDRESS_ERROR:
      return { ...payload, success: false };
    default:
      return state;
  }
}

export default removeUserAddress;
