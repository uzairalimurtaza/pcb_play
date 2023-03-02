import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Enter your name"),

  email: yup
    .string()
    .required("Enter your email")
    .email("Enter valid email address"),
  message: yup.string().required("Enter your message"),
});

export default schema;
