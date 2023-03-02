import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Enter your name")
    .min(6, "Enter atleast 6 digits name"),
  phone: yup.string(),
  addressOne: yup.string().required("Enter your address"),
  addressTwo: yup.string(),
  city: yup.string().required("Enter your city"),
  state: yup.string().required("Enter your state"),
  zipCode: yup.number("enter code must be number").required("Enter your zip"),
  country: yup.string().required("select your country"),
  phoneCode: yup.string(),
});

export default schema;
