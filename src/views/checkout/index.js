import { Divider } from "antd";
import React, { memo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CartSummary, DeliveryAddress, PaymentMethods } from "../../components";
import Buynow from "../../components/cartSummary/buynow";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/auth/action";
import { updateCart } from "../../redux/cart/action";
import { useNavigate } from "react-router-dom";
function Index() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.dashboard);
  const [loader, setLoader] = React.useState(false);
  const navigate = useNavigate();
  const stopLoader = (data) => {
    dispatch(
      updateCart(
        {
          projectId: data.project,
          _id: data._id,
        },
        () => {
          setLoader(false);
        }
      )
    );
  };
  const addToFavoritesHandler = () => {
    setLoader(true);
    dispatch(addToFavorites(stopLoader));
  };
  return (
    <Container>
      <Row className="py-3">
        <Col lg={12}>
          <h3
            style={{
              color: "#22621A",
              fontWeight: 500,
            }}
          >
            buy now
          </h3>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <h3
            style={{
              fontSize: "42px",
              color: "#343A40",
              fontWeight: 700,
            }}
          >
            You’re almost there...!
          </h3>
        </Col>
      </Row>

      <Row className="gap-5">
        <Col
          lg={9}
          className="shadow-sm bg-white  p-4"
          style={{
            borderRadius: "8px",
          }}
        >
          <DeliveryAddress />
          <Divider />

          <Row className="gap-3">
            <Col lg={12}>
              <h5>payment method</h5>
            </Col>
            <PaymentMethods />
          </Row>
        </Col>
        <Col>
          <CartSummary checkout />
          <Buynow />
          {cart?._id && (
            <Col lg={12}>
              <Button
                onClick={addToFavoritesHandler}
                variant="outline-primary"
                className=" w-100   "
              >
                {loader ? "processing..." : "add to favorites"}
              </Button>
            </Col>
          )}
        </Col>
      </Row>

      <Row className="my-3">
        <Col className="d-flex">
          <Button
            onClick={() => navigate("/create-an-project")}
            variant="outline-primary"
            className="py-2 d-flex justify-content-center align-items-center "
          >
            back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Index);
