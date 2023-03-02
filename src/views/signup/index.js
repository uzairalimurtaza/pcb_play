import EyeInvisibleOutlined from "@ant-design/icons/lib/icons/EyeInvisibleOutlined";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";
import React, { memo } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HardwareImgIcon, LineIcon } from "../../assets";
import { registerWithGoogle, userSignup } from "../../redux/auth/action";
import { signupValidation } from "../../validations";
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
    if (res?.message === ": Incorrect firstName") {
      setErrors({ password: "first name can only contain words" });
    }
    if (res?.message === ": Incorrect lastName") {
      setErrors({ password: "last name can only contain words" });
    }
    if (res?.statusCode === 403) {
      setErrors({ email: res.message });
    }
    if (res?.message === ": Incorrect password") {
      setErrors({ password: "password is a required field" });
    }
    setSubmitting(false);
  };
  const signupHandler = (user, formFunctions) => {
    delete user.confirm;
    dispatch(userSignup(user, stopLoader(formFunctions)));
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
      <Row className="register-box ">
        <Col
          lg={5}
          md={5}
          className="shadow-sm py-4 bg-white borderradius icon-box d-none d-lg-flex d-md-flex gap-3 "
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
            <h1 className="login-form-heading mb-4">register</h1>
            <p className="text-center mb-4">
              sign in with your socials or create an account
            </p>

            <GoogleLogin
              clientId="789905750854-b6adm9fij0kelgfs26rh51irr27dearv.apps.googleusercontent.com"
              buttonText="continue with google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="h6 text-black bg-white googleBtn mb-4 mt-2"
            />

            <span className="d-flex align-items-center mb-4 mt-2">
              <LineIcon />
              &nbsp; &nbsp; or &nbsp; &nbsp;
              <LineIcon />
            </span>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirm: false,
              }}
              validationSchema={signupValidation}
              onSubmit={signupHandler}
            >
              {({
                values,
                errors,

                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                /* and other goodies */
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  className="w-100 login-form gap-4 d-flex flex-column "
                >
                  <div className="d-flex justify-content-between pcb-input-box gap-3">
                    <Form.Group className=" pcb-firstName-input">
                      <Form.Label className="m-0">first name</Form.Label>
                      <Form.Control
                        type="firstName"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        maxLength={15}
                        className="bg-transparent"
                        placeholder="enter your name"
                      />

                      <Form.Text
                        className={`check text-danger text-lowercase error `}
                      >
                        {errors.firstName}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className=" pcb-firstName-input">
                      <Form.Label className="m-0">last name</Form.Label>
                      <Form.Control
                        type="lastName"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        maxLength={15}
                        className="bg-transparent"
                        placeholder="enter your name"
                      />

                      <Form.Text className="check text-danger text-lowercase error">
                        {errors.lastName}
                      </Form.Text>
                    </Form.Group>
                  </div>
                  <Form.Group>
                    <Form.Label className="m-0 labels">email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="bg-transparent"
                      placeholder="enter your email"
                    />

                    <Form.Text className="check text-danger text-lowercase d-flex justify-content-end error">
                      {errors.email}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <div className="d-flex justify-content-between">
                      <Form.Label className="m-0 labels">password</Form.Label>
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
                      <button
                        className="bg-transparent"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <EyeInvisibleOutlined className="mx-3" />
                        ) : (
                          <EyeOutlined className="mx-3" />
                        )}
                      </button>
                    </div>

                    <Form.Text className="check text-danger text-lowercase d-flex justify-content-end error">
                      {errors.password}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <div className="d-flex  align-items-center">
                      <Checkbox
                        value={values.confirm}
                        onChange={(e) => {
                          setFieldValue("confirm", e.target.checked);
                        }}
                        sx={{
                          color: "#e11045",
                          "&.Mui-checked": {
                            color: "#e11045",
                          },
                        }}
                      />
                      <span className="check checking">
                        by signing up you agree to the
                        <span>
                          <Link to="/policy-services" className="color">
                            {" "}
                            terms of service and privacy policy
                          </Link>
                        </span>
                      </span>
                    </div>
                    <span className="check color error">{errors.confirm}</span>
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
                        <span>sign up...</span>
                      </div>
                    ) : (
                      "sign up"
                    )}
                  </Button>
                  <span className="text-center bottom-link">
                    already have an account?{" "}
                    <Link to="/login" className="color link-btn">
                      login
                    </Link>
                  </span>
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
