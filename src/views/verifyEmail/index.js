import Alert from "@mui/material/Alert";
import { Formik } from "formik";
import { memo, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DangerIcon, HardwareImgIcon } from "../../assets";
import { ConfirmModal } from "../../modals";
import {
  adminLogout,
  resendEmailCode,
  verifyEmailCode,
} from "../../redux/auth/action";
import { verifyCodeValidation } from "../../validations";
import "./index.css";
function Index() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [msg, setmsg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const stopLoader = (formFunctions) => (data) => {
    const { setSubmitting, setErrors } = formFunctions;
    setSubmitting(false);

    if (data?.code === 0) {
      setErrors({ code: "please enter valid code" });
      return;
    }
    if (data?.statusCode === 200) {
      setShow(true);
      setmsg("email verified successfully");
    }
  };
  const verifyCodeHandler = (values, formFunctions) => {
    dispatch(verifyEmailCode(values, stopLoader(formFunctions)));
  };
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = () => setShowConfirm(true);
  const hideConfirmHandler = () => setShowConfirm(false);
  const [loader, setLoader] = useState(false);
  const stoplgout = () => {
    setLoader(false);
    hideConfirmHandler();
  };
  const [sending, setSending] = useState(false);
  const stopSending = (data) => {
    if (data?.statusCode === 200) {
      setShow(true);
      setmsg("email sent successfully");
    }
    setSending(false);
  };
  const resendCodehadler = () => {
    setSending(true);
    dispatch(resendEmailCode(stopSending));
  };
  const handleLogout = () => {
    setLoader(true);
    dispatch(adminLogout(stoplgout));
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
          <div className="blur-box" />

          <div className="login-form-box mx-auto gap-2">
            <p className="my-3">
              a verification code has been sent. please enter the code below to
              continue.
            </p>
            <small className="w-100">{user?.email}</small>
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
              initialValues={{ code: "" }}
              validationSchema={verifyCodeValidation}
              onSubmit={verifyCodeHandler}
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
                  className="w-100 login-form gap-2 d-flex flex-column "
                >
                  <Form.Group>
                    <Form.Label className="m-0">verification code</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.code}
                      name="code"
                      type="text"
                      className="bg-transparent"
                      placeholder="enter your code"
                    />
                    {errors.code && touched.code && (
                      <Form.Text className="text-danger text-lowercase">
                        {errors.code}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <p className="w-100 text-end m-0">
                    didn't receive a code?
                    <button
                      type="button"
                      className="resend-btn mx-1"
                      onClick={resendCodehadler}
                    >
                      {sending ? "resending" : "resend"}
                    </button>
                  </p>

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
                </Form>
              )}
            </Formik>
            <Button
              onClick={showConfirmHandler}
              type="button"
              variant="outline-danger"
              style={{
                position: "relative",
                zIndex: 444,
              }}
              className=" d-flex justify-content-center align-items-center w-full "
            >
              cancel
            </Button>
          </div>
        </Col>
      </Row>
      {showConfirm && (
        <ConfirmModal
          label="logout"
          description={"Are you sure you want to logout?"}
          loader={loader}
          icon={DangerIcon}
          actionBtnText="logout"
          show={showConfirm}
          onHide={hideConfirmHandler}
          action={handleLogout}
        />
      )}
    </Container>
  );
}

export default memo(Index);
