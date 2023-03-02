import Alert from "@mui/material/Alert";
import { Formik } from "formik";
import { memo, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { HardwareImgIcon } from "../../assets";
import { forgotPassword } from "../../redux/auth/action";
import { forgotValidation } from "../../validations";
import "./index.css";
import { useNavigate } from "react-router-dom";
function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [msg, setmsg] = useState("");
  const stopLoader = (formFunctions) => (data) => {
    const { setSubmitting } = formFunctions;
    setSubmitting(false);
    if (data.statusCode === 200) {
      setShow(true);
      setmsg(data.message);
    }
  };
  const forgotPasswordHandler = (values, formFunctions) => {
    dispatch(forgotPassword(values, stopLoader(formFunctions)));
  };
  return (
    <Container fluid className="my-3 ">
      <Row>
        <Col
          lg={5}
          md={5}
          className="shadow-sm py-4 bg-white borderradius icon-box d-none d-lg-flex d-md-flex"
        >
          <div className="icon-box-icon">
            <HardwareImgIcon />
          </div>

          <div className="pcb-icon-box-text">
            <p>
              on <span>line,</span>
            </p>
            <p>
              on <span>demand,</span>
            </p>
            <p>
              on <span>time.</span>
            </p>
          </div>
        </Col>
        <Col lg={7} md={7} className="login-right-box">
          <div className="login-form-box mx-auto">
            <h1 className="login-form-heading">forgot password</h1>
            <p className="my-3">
              enter the email address associated with your account. we’ll send
              you instructions to reset your password.
            </p>
            {show && (
              <div
                className="my-2"
                style={{
                  width: "100%",
                  position: "relative",
                  zIndex: 444,
                  backgroundColor: "transparent",
                }}
              >
                <Alert
                  severity="success"
                  onClose={() => {
                    setShow(false);
                  }}
                >
                  {msg}
                </Alert>
              </div>
            )}

            <Formik
              initialValues={{ email: "" }}
              validationSchema={forgotValidation}
              onSubmit={forgotPasswordHandler}
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
                  onSubmit={handleSubmit}
                  className="w-100 login-form gap-4 d-flex flex-column "
                >
                  <Form.Group>
                    <Form.Label className="m-0">email</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      name="email"
                      type="email"
                      className="bg-transparent"
                      placeholder="enter your email"
                    />
                    {errors.email && touched.email && (
                      <Form.Text className="text-danger text-lowercase">
                        {errors.email}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 rounded-3"
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
                        <span>waiting...</span>
                      </div>
                    ) : (
                      "continue"
                    )}
                  </Button>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="outline-danger"
                    className=" d-flex justify-content-center align-items-center "
                  >
                    cancel
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Index);
