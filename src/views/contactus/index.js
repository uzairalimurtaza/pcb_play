import React, { memo } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { Formik } from "formik";
import { Link } from "react-router-dom";

import { contactusValidation } from "../../validations";
import Checkbox from "@mui/material/Checkbox";
import "./index.css";
function Index() {
  const contactusHandler = (values) => {};
  return (
    <Container>
      <Row className=" pcb-contact-us-box mx-auto bg-white my-5 rounded-3 p-3 shadow-sm gap-4 ">
        <Col lg={12} className="text-center">
          <h3
            style={{
              color: "#22621A",
            }}
          >
            contact us
          </h3>
        </Col>
        <Col lg={12} className="text-center">
          <p>We’d love to hear from you. please fill out this form.</p>
        </Col>
        <Col lg={12}>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={contactusValidation}
            onSubmit={contactusHandler}
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
                className="gap-4 d-flex flex-column"
                onSubmit={handleSubmit}
              >
                <Form.Group controlId="firstname">
                  <Form.Label>full name</Form.Label>
                  <Form.Control
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="enter your name"
                  />
                  {errors.name && touched.name && (
                    <Form.Text className="text-danger text-lowercase">
                      {errors.name}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group controlId="firstname">
                  <Form.Label>email</Form.Label>
                  <Form.Control
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="enter your email"
                  />
                  {errors.email && touched.email && (
                    <Form.Text className="text-danger text-lowercase">
                      {errors.email}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="firstname">
                  <Form.Label>message</Form.Label>
                  <Form.Control
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as="textarea"
                    rows={4}
                  />
                  {errors.message && touched.message && (
                    <Form.Text className="text-danger text-lowercase">
                      {errors.message}
                    </Form.Text>
                  )}
                </Form.Group>
                <div className="d-flex align-items-center">
                  <Checkbox
                    sx={{
                      color: "#e11045",
                      "&.Mui-checked": {
                        color: "#e11045",
                      },
                    }}
                  />
                  <p className="m-0">
                    you agree to the
                    <Link
                      to="/policy-services"
                      style={{
                        color: "#e11045",
                      }}
                      className="mx-2"
                    >
                      terms of service and policy
                    </Link>
                  </p>
                </div>
                <Button
                  type="submit"
                  variant="danger"
                  className="r w-full text-center "
                >
                  {isSubmitting ? (
                    <div className=" d-flex justify-content-between  align-items-center ">
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span>waiting...</span>
                    </div>
                  ) : (
                    "send message"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Index);
