import * as constants from "./constants";
import moment from "moment";
let initState = {
  user: null,
  addressess: [],
};

function authReducer(state = initState, action) {
  let { payload } = action;
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        user: payload,
      };
    case constants.ADD_USER_ADDRESS:
      const newAddresses = state.addressess.concat(payload);
      return {
        ...state,
        addressess: newAddresses?.sort((a, b) => {
          return moment(a.createdAt).isAfter(b.createdAt) ? -1 : 1;
        }),
      };
    case constants.GET_ALL_ADDRESSES:
      return {
        ...state,
        addressess: payload,
      };
    case constants.DELETE_USER_ADDRESS:
      const filtered = state.addressess.filter(
        (address) => address._id !== payload
      );

      return {
        ...state,
        addressess: filtered,
      };
    case constants.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
      };
    case constants.MAKE_DEFAULT_ADDRESS:
      const maped = state.addressess.map((address) => {
        if (address._id === payload._id) {
          return {
            ...address,
            ...payload,
          };
        } else {
          return {
            ...address,
            isDefault: false,
          };
        }
      });

      return {
        ...state,
        addressess: maped,
      };

    case constants.UPDATE_USER_ADDRESS:
      const updatedAddress = state.addressess.map((address) => {
        if (address._id === payload._id) {
          return {
            ...address,
            ...payload,
          };
        } else {
          return {
            ...address,
          };
        }
      });

      return {
        ...state,
        addressess: updatedAddress,
      };
    default:
      return state;
  }
}

export default authReducer;
