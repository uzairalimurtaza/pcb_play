import AuthApi from "./authApi";
import * as constants from "./constants";
import * as cartConstants from "../cart/constants";
import * as dashboardConstants from "../dashboard/constants";

const authApi = new AuthApi();
export const userSignup = (user, cb) => async (dispatch) => {
  try {
    const { data } = await authApi.userSignup(user);
    console.log(data);
    dispatch({
      type: constants.SET_USER,
      payload: data?.data.data,
    });
    localStorage.setItem("userAuth", data?.data?.token);
    cb();
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const addUserAddress = (address, cb) => async (dispatch) => {
  try {
    const { data } = await authApi.addUserAddress(address);
    dispatch({
      type: constants.ADD_USER_ADDRESS,
      payload: data?.data,
    });
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const resetRemoveAddress = () => async (dispatch) => {
  dispatch({
    type: constants.DELETE_USER_ADDRESS_RESET,
    payload: null,
  });
};

export const deleteUserAddress = (id, cb) => async (dispatch) => {
  try {
    const { data } = await authApi.deleteUserAddress(id);

    dispatch({
      type: constants.DELETE_USER_ADDRESS,
      success: true,
    });

    cb(data);
  } catch (error) {
    dispatch({
      type: constants.DELETE_USER_ADDRESS_ERROR,
      success: false,
    });
    cb(error?.response?.data);
  }
};

export const updateAddressById = (address, id, cb) => async (dispatch) => {
  try {
    await authApi.updateAddressById(address, id);

    dispatch({
      type: constants.UPDATE_USER_ADDRESS,
      payload: {
        ...address,
        _id: id,
      },
    });

    cb();
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const placeOrderByIyzipay =
  (order, cb) => async (dispatch, getState) => {
    const cart = getState().cart;
    try {
      order = {
        ...order,
        code: cart,
      };
      const { data } = await authApi.placeOrderByIyzipay(order);

      cb(data.data);
    } catch (error) {
      cb(error?.response?.data);
    }
  };
export const placeOrderByStripe = (order, cb) => async (dispatch, getState) => {
  const cart = getState().cart;
  try {
    order = {
      ...order,
      code: cart,
    };
    const { data } = await authApi.placeOrderByStripe(order);

    cb(data.data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const addToFavorites = (cb) => async (dispatch, getState) => {
  const cart = getState().cart;
  try {
    const { data } = await authApi.addToFavorites({
      code: cart,
    });
    console.log(data.data);
    cb(data.data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const uppdateUserProfile = (user, cb) => async (dispatch, getState) => {
  const id = getState().auth.user._id;

  try {
    const { data } = await authApi.uppdateUserProfile(user, id);
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};
export const uppdateUserPassword = (user, cb) => async (dispatch, getState) => {
  const id = getState().auth.user._id;
  try {
    const response = await authApi.uppdateUserPassword({
      userId: id,
      newpassword: user.password,
      oldpassword: user.oldPassword,
    });
    cb(response.data);
  } catch (error) {
    cb(error?.response?.data);
  }
};
export const placeOrderByPaypal = (order, cb) => async (dispatch, getState) => {
  const cart = getState().cart;
  try {
    order = {
      ...order,
      code: cart,
    };
    const { data } = await authApi.placeOrderByPaypal(order);

    cb(data.data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const getOrderbyId = (orderId, cb) => async (dispatch, getState) => {
  try {
    dispatch({
      type: cartConstants.CREATE_NEW_CART_CODE,
      payload: null,
    });
    dispatch({
      type: dashboardConstants.GET_CART,
      payload: null,
    });
    const { data } = await authApi.getOrderbyId(orderId);

    cb(data.data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const userAddressSetAsDefault = (id, cb) => async (dispatch) => {
  try {
    const { data } = await authApi.userAddressSetAsDefault(id);

    dispatch({
      type: constants.MAKE_DEFAULT_ADDRESS,
      payload: data.data,
    });

    cb();
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const getAllUserAddress = (cb) => async (dispatch, getState) => {
  const user = getState().auth.user;
  try {
    const { data } = await authApi.getAllUserAddress(user?._id);
    dispatch({
      type: constants.GET_ALL_ADDRESSES,
      payload: data?.data,
    });

    cb();
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const registerWithGoogle = (user, cb) => async (dispatch) => {
  try {
    const { data } = await authApi.registerWithGoogle(user);

    dispatch({
      type: constants.SET_USER,
      payload: data?.data.userData,
    });
    localStorage.setItem("userAuth", data?.data?.token.accessToken);
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const userLogin = (user, cb) => async (dispatch) => {
  try {
    const { data } = await authApi.userLogin(user);

    dispatch({
      type: constants.SET_USER,
      payload: data?.data.data,
    });
    localStorage.setItem("userAuth", data?.data?.token);
    cb();
  } catch (error) {
    cb(error?.response?.data);
  }
};
// export const adminLogin = (user, cb) => async (dispatch) => {
//   try {
//     const { data } = await authApi.adminLogin(user);
//     dispatch({
//       type: constants.ADMIN_LOGIN,
//       payload: data?.data.data,
//     });
//     localStorage.setItem("adminAuth", data?.data?.token);
//     cb();
//   } catch (error) {
//     cb(error?.response?.data);
//   }
// };
export const forgotPassword = (user, cb) => async (dispatch) => {
  try {
    const { data } = await authApi.forgotPassword(user);

    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const verifyEmailCode = (codeData, cb) => async (dispatch, getState) => {
  const { user } = getState().auth;

  try {
    const { data } = await authApi.verifyEmailCode(codeData, user.email);
    dispatch({
      type: constants.SET_USER,
      payload: data?.data.data,
    });
    localStorage.setItem("userAuth", data?.data?.token);
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const resendEmailCode = (cb) => async (dispatch, getState) => {
  const { user } = getState().auth;

  try {
    const { data } = await authApi.resendEmailCode({ email: user.email });

    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const adminLogout = (cb) => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    const { data } = await authApi.logout({
      email: user.email,
    });

    dispatch({
      type: constants.SET_USER,
      payload: null,
    });
    localStorage.removeItem("userAuth");
    cb(data);
  } catch (error) {
    cb(error?.response?.data);
  }
};

export const getCurrentUser = (cb) => async (dispatch) => {
  try {
    const { data } = await authApi.getCurrentUser();

    dispatch({
      type: constants.SET_USER,
      payload: data?.data,
    });

    cb();
  } catch (error) {
    cb(error?.response?.data);
  }
};
