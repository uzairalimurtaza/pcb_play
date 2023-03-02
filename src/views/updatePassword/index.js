import { Formik } from "formik";
import React, { memo, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { uppdateUserPassword } from "../../redux/auth/action";
import { updatePasswordValidation } from "../../validations";
import "./index.css";
import Snackbar from "../../components/CustomSnackbar/index";

function Index() {
  const dispatch = useDispatch();
  const [severity, setSeverity] = useState(null);
  const [showSnackBar, setSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const stopLoader = (formAction) => (response) => {
    formAction.setSubmitting(false);

    if (response.success) {
      setSeverity("success");
      setMessage("Password updated successfully!");
      setSnackBar(!showSnackBar);
    } else {
      setSeverity("error");
      setMessage(
        response.errors
          ? response.errors[0].title
          : "Something went wrong while updating password!"
      );
      setSnackBar(!showSnackBar);

      if (!response.code) {
        formAction.setErrors({
          oldPassword: "Old password is incorrect",
        });
      }
    }
  };
  const submitHandler = (values, formAction) => {
    dispatch(uppdateUserPassword(values, stopLoader(formAction)));
  };
  return (
    <Container>
      <Snackbar
        severity={severity}
        message={message}
        open={showSnackBar}
        onClose={() => {
          setSnackBar(!showSnackBar);
        }}
      />
      <Row className="mt-5">
        <Col lg={8}>
          <h5 className="content-main-heading">update password</h5>
        </Col>
      </Row>
      <Row className="bg-white rounded-3 shadow-sm w-50 mx-auto p-2">
        <Col lg={12}>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={submitHandler}
            validationSchema={updatePasswordValidation}
          >
            {({
              values,
              errors,
              touched,

              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form
                className="d-flex flex-column gap-4 py-3"
                onSubmit={handleSubmit}
              >
                <Form.Group>
                  <Form.Label className="m-0 address-lable ">
                    old password
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="oldPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.oldPassword}
                    className="bg-transparent"
                    placeholder="old password"
                  />

                  <Form.Text className="text-danger text-lowercase check error">
                    {errors.oldPassword &&
                      touched.oldPassword &&
                      errors.oldPassword}
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="m-0 address-lable ">
                    new password
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="bg-transparent"
                    placeholder="new password"
                  />

                  <Form.Text className="text-danger text-lowercase check error">
                    {errors.password && touched.password && errors.password}
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="m-0 address-lable ">
                    confirm password
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    className="bg-transparent"
                    placeholder="confirm password"
                  />

                  <Form.Text className="text-danger text-lowercase check error">
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </Form.Text>
                </Form.Group>
                <div className="d-flex justify-content-end">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="rounded-3 "
                    variant="danger"
                  >
                    {isSubmitting ? (
                      <div className=" d-flex justify-content-center  align-items-center ">
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span>updating...</span>
                      </div>
                    ) : (
                      "change password"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Index);
