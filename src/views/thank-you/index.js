import React, { memo, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { BlueTickBig } from "../../assets";
import { CartSummary } from "../../components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import Page404 from "../page404";
import { getOrderbyId } from "../../redux/auth/action";
import { useNavigate } from "react-router-dom";
function Index() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState({});
  const stopLoader = (data) => {
    setOrder(data);
  };
  useEffect(() => {
    dispatch(getOrderbyId(orderId, stopLoader));
  }, [orderId, dispatch]);

  if (!orderId) {
    return <Page404 />;
  } else {
    return (
      <Container className="py-4 px-0 ">
        <Row className="gap-2 ">
          <Col lg={12} className="d-flex justify-content-center">
            <BlueTickBig />
          </Col>
          <Col lg={12} className="text-center">
            <h2>Thank You</h2>
          </Col>
          <Col lg={12} className="text-center">
            <p className="thank-you-desc">
              Your order has been received. A confirmation email has been sent
              to
              <span className="email-address">{order?.customerId?.email}</span>
            </p>
          </Col>
        </Row>
        <Container className="w-75">
          <Row className="d-flex justify-content-around mt-5 mb-2  bg-white py-2 rounded-3 shadow-sm">
            <Col lg={3}>
              <div className="project-name-detail">
                <h6>project name</h6>
                <p>{order?.projectId?.projectName}</p>
              </div>
            </Col>
            <Col lg={3}>
              <div className="project-name-detail ">
                <div>
                  <h6>project id</h6>
                  <p>{order?.projectId?.projectId}</p>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="project-name-detail ">
                <div>
                  <h6>invoice</h6>
                  <p>{order?.transactions?.gatewayReferenceId}</p>
                </div>
              </div>
            </Col>
          </Row>

          <CartSummary fetchCart={order?.cartId} />
          <Row className="d-flex justify-content-center my-4">
            <div className="d-flex justify-content-between w-75">
              <Button
                onClick={() => navigate("/")}
                variant="outline-primary"
                className=" w-25 d-flex justify-content-center align-items-center "
              >
                back to home
              </Button>

              <Button
                variant="danger"
                className=" w-25  d-flex    justify-content-center align-items-center "
              >
                view orders
              </Button>
            </div>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default memo(Index);
