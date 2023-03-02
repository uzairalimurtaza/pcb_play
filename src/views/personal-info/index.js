import { Formik } from "formik";
import React, { memo, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon } from "../../assets";
import { uppdateUserProfile } from "../../redux/auth/action";
import { profileValidation } from "../../validations";
import "./index.css";
import Snackbar from "../../components/CustomSnackbar/index";
function Index() {
  const [allowEdit, setAllowEdit] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [severity, setSeverity] = useState(null);
  const [showSnackBar, setSnackBar] = useState(false);
  const [message, setMessage] = useState("");
  const showAllowEdit = () => {
    setAllowEdit(true);
  };
  const hideAllowEdit = () => {
    setAllowEdit(false);
  };
  const dispatch = useDispatch();
  const stopLoader = (formAction) => (response) => {
    console.log(response);
    if (response.success) {
      setSeverity("success");
      setMessage("Profile updated successfully!");
      setSnackBar(!showSnackBar);
    } else {
      setSeverity("error");
      setMessage(
        response.errors
          ? response.errors[0].title
          : "Something went wrong while updating profile!"
      );
      setSnackBar(!showSnackBar);
    }
    formAction.setSubmitting(false);
    hideAllowEdit();
  };
  const submitHandler = (values, formAction) => {
    dispatch(uppdateUserProfile(values, stopLoader(formAction)));
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
          <h5 className="content-main-heading">personal information</h5>
        </Col>
      </Row>
      <Row className="bg-white rounded-3 shadow-sm p-2">
        <Col lg={12} className="d-flex justify-content-end">
          <button onClick={showAllowEdit} className="profile-edit">
            <EditIcon /> <span>edit</span>
          </button>
        </Col>

        <Col lg={12}>
          <Formik
            initialValues={{
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              email: user.email || "",
            }}
            onSubmit={submitHandler}
            validationSchema={profileValidation}
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
                className="d-flex flex-column gap-3 py-3"
                onSubmit={handleSubmit}
              >
                <div className="d-flex gap-5">
                  <Form.Group className="w-50">
                    <Form.Label className="m-0 address-lable ">
                      first name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!allowEdit}
                      value={values.firstName}
                      className="bg-transparent"
                      placeholder="enter your name"
                    />

                    <Form.Text className="text-danger text-lowercase check error">
                      {errors.firstName &&
                        touched.firstName &&
                        errors.firstName}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="w-50">
                    <Form.Label className="m-0 address-lable ">
                      last name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      disabled={!allowEdit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      className="bg-transparent"
                      placeholder="enter your name"
                    />

                    <Form.Text className="text-danger text-lowercase check error">
                      {errors.lastName && touched.lastName && errors.lastName}
                    </Form.Text>
                  </Form.Group>
                </div>

                <div className="d-flex ">
                  <Form.Group className="w-50">
                    <Form.Label className="m-0 address-lable ">
                      email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      disabled={!allowEdit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="bg-transparent"
                      placeholder="enter your email"
                    />

                    <Form.Text className="text-danger text-lowercase check error">
                      {errors.email && touched.email && errors.email}
                    </Form.Text>
                  </Form.Group>
                </div>
                {allowEdit && (
                  <div className="d-flex justify-content-end gap-4">
                    <Button onClick={hideAllowEdit} variant="outline-primary">
                      cancel
                    </Button>
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
                        "update"
                      )}
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Index);
