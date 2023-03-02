import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("first name can only contain words")
    .min(3, "Enter atleast 3 characters"),
  lastName: yup
    .string()
    .required("last name can only contain words")
    .min(3, "Enter atleast 3 characters"),
  password: yup
    .string()
    .required("password is a required field")
    .min(6, "Enter atleast 6 digits password"),
  email: yup
    .string()
    .required("e-mail is a required field")
    .email("Enter valid email address"),

  confirm: yup
    .boolean()
    .oneOf([true], "please accept the terms and conditions"),
});

export default schema;
