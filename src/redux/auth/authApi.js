import { INSTANCE } from "../../config/axiosInstance";

export default class AuthApi {
  // emailIsAdmin = async (data) => {
  //   return new Promise((resolve, reject) => {
  //     INSTANCE({
  //       method: "POST",
  //       url: "/auth/isAdminExist",
  //       data,
  //     })
  //       .then(resolve)
  //       .catch(reject);
  //   });
  // };
  userSignup = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/register",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getOrderbyId = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: `/orders/${id}`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  addUserAddress = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/address",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  addToFavorites = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/favourite/addByCode",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  deleteUserAddress = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "DELETE",
        url: `/address/${id}`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  updateAddressById = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/address/${id}`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  placeOrderByIyzipay = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: `/place-order/iyzipay`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  placeOrderByStripe = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: `/place-order/stripe`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  uppdateUserProfile = async (data, id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "PUT",
        url: `/users/${id}`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  uppdateUserPassword = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: `/auth/changepassword`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  placeOrderByPaypal = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: `/place-order/paypal`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  userAddressSetAsDefault = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: `/address/${id}/mark-as-default`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getAllUserAddress = async (id) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: `/address/${id}/user`,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  registerWithGoogle = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/google",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  userLogin = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/login",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  forgotPassword = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/forgotPassword",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  verifyEmailCode = async (data, email) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: `/auth/verify/${email}`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };

  resendEmailCode = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: `/auth/resend-email`,
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  logout = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/logout",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  emailIsUser = async (data) => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/auth/emailexist",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  };
  getCurrentUser = async () => {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/auth/getCurrentUser",
      })
        .then(resolve)
        .catch(reject);
    });
  };
}
