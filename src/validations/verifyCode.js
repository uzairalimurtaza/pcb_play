import * as yup from "yup";

const schema = yup.object().shape({
  code: yup.string().required("Enter your code"),
});

export default schema;
