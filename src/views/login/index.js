import EyeInvisibleOutlined from "@ant-design/icons/lib/icons/EyeInvisibleOutlined";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import { Formik } from "formik";
import React, { memo } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HardwareImgIcon, LineIcon } from "../../assets";

import { registerWithGoogle, userLogin } from "../../redux/auth/action";
import { loginValidation } from "../../validations";
import "./index.css";
function Index() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const stopLoader = (formFunctions) => (res) => {
    const { setErrors, setSubmitting } = formFunctions;
    if (res?.statusCode === 403) {
      setErrors({ email: res.message });
    }
    if (res?.message === ": Incorrect password") {
      setErrors({ password: "please enter correct password" });
    }
    setSubmitting(false);
  };
  const loginHandler = (user, formFunctions) => {
    dispatch(userLogin(user, stopLoader(formFunctions)));
  };

  const responseGoogle = (response) => {
    let user = {};
    if (response.profileObj) {
      user = {
        firstName: response.profileObj.givenName,
        lastName: response.profileObj.familyName,
        email: response.profileObj.email,
        image: response.profileObj.imageUrl,
        id: response.profileObj.googleId,
        service: "google",
      };
    }
    console.log("user", user);
    if (Object.keys(user).length > 0) {
      dispatch(
        registerWithGoogle(user, (data) => {
          console.log(data);
        })
      );
    }
  };
  return (
    <Container fluid className="my-3">
      <Row>
        <Col
          lg={5}
          md={5}
          className="shadow-sm py-4 bg-white borderradius icon-box d-none d-md-flex d-lg-flex"
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
        <Col lg={7} md={7} className="login-right-box ">
          <div className="blur-box" />

          <div className="login-form-box mx-auto">
            <h1 className="login-form-heading my-4">log in</h1>

            <p className="text-center mb-4">
              sign in with your socials or create an account
            </p>
            <GoogleLogin
              clientId="789905750854-b6adm9fij0kelgfs26rh51irr27dearv.apps.googleusercontent.com"
              buttonText="continue with google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="h6 text-black bg-white googleBtn"
            />
            <span className="d-flex align-items-center mb-3 mt-3">
              <LineIcon />
              &nbsp; or &nbsp;
              <LineIcon />
            </span>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidation}
              onSubmit={loginHandler}
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
                    <Form.Label className="m-0 lables">email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="bg-transparent"
                      placeholder="enter your email"
                    />

                    <Form.Text className="text-danger text-lowercase check error">
                      {errors.email}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="my-2">
                    <div className="d-flex justify-content-between">
                      <Form.Label className="m-0 labels">password</Form.Label>
                      <Link
                        to="/forgot-password"
                        className="text-danger small-label"
                      >
                        forgot password
                      </Link>
                    </div>
                    <div className=" passwordInput  d-flex align-items-center">
                      <Form.Control
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                        value={values.password}
                        className="bg-transparent border-0"
                        type={showPassword ? "text" : "password"}
                        placeholder="enter your password"
                      />
                      <button onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <EyeInvisibleOutlined className="mx-3" />
                        ) : (
                          <EyeOutlined className="mx-3" />
                        )}
                      </button>
                    </div>

                    <Form.Text className="text-danger text-lowercase check error">
                      {errors.password}
                    </Form.Text>
                  </Form.Group>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-100 rounded-3 buttons"
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
                        <span>sign in...</span>
                      </div>
                    ) : (
                      "sign in"
                    )}
                  </Button>
                  <p className="text-center bottom-link">
                    don't have an account?{" "}
                    <Link to="/register" className="color link-btn">
                      sign up
                    </Link>
                  </p>
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
