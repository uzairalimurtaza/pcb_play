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

  email: yup
    .string()
    .required("e-mail is a required field")
    .email("Enter valid email address"),
});

export default schema;
