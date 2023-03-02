import * as yup from "yup";

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("old password is required")
    .min(3, "Enter atleast 3 characters"),
  password: yup
    .string()
    .required("password is required")
    .min(3, "Enter atleast 3 characters"),

  confirmPassword: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password"), null], "passwords must match"),
});

export default schema;
