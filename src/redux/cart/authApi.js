import { INSTANCE } from "../../config/axiosInstance";

export default class AuthApi {
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
}
