import React, { memo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Page404Icon } from "../../assets";
import "./index.css";
import { useNavigate } from "react-router-dom";
function Index() {
  const navigate = useNavigate();
  return (
    <Container className="py-5">
      <Row className="w-75 bg-white p-5 m-auto">
        <Col lg={5}>
          <div className="Page404-desc">
            <h1 className="m-0">Ooops....</h1>
            <p className="m-0">page not found</p>
            <Button
              onClick={() => navigate("/")}
              type="submit"
              className="rounded-3 w-100"
              variant="danger"
            >
              back to home
            </Button>
          </div>
        </Col>
        <Col lg={7} className="d-flex justify-content-center">
          <Page404Icon />
        </Col>
      </Row>
    </Container>
  );
}
export default memo(Index);
