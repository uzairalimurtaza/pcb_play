import * as yup from "yup";

import AuthApi from "../redux/auth/authApi";
import { validateEmail } from "../utils/validations.utils";

const authApi = new AuthApi();
yup.addMethod(yup.string, "emailisAlready", function (errorMessage) {
  return this.test("email-is-user", errorMessage, async function (value) {
    const { path, createError } = this;

    if (!value || !validateEmail(value)) return;

    const { data } = await authApi.emailIsUser({ email: value });

    if (!data?.data?.isExist) {
      return createError({ path, message: errorMessage });
    } else {
      return value;
    }
  });
});
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Enter your email")
    .email("Enter valid email address")
    .emailisAlready("email not registered"),
});

export default schema;
