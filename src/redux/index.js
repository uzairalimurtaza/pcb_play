import { combineReducers } from "redux";
import auth from "./auth/reducer";
import dashboard from "./dashboard/reducer";
import cart from "./cart/reducer";
import removeUserAddress from "./auth/deleteUserAddress";
const createReducer = combineReducers({
  auth,
  dashboard,
  cart,
  removeUserAddress,
});

export default createReducer;
