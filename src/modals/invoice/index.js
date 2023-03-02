import React, { memo } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { CloseWhiteIcon, PcbLogoIcon } from "../../assets";
import "./index.css";
import ProjectDetail from "./projectDetail";
import CartDetail from "./cartDetail";

function Index({ show, onHide }) {
  return (
    <Modal size="lg" show={show} onHide={onHide} centered>
      <Modal.Header className="invoice-header">
        <Container>
          <Row>
            <Col lg={12} className="d-flex justify-content-end">
              <CloseWhiteIcon onClick={onHide} />
            </Col>
            <Col lg={12} className="d-flex justify-content-between px-4 ">
              <PcbLogoIcon />
              <h1>INVOICE</h1>
            </Col>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col lg={7}>
              <ProjectDetail />
            </Col>
            <Col>
              <Row className="gap-2">
                <Col
                  lg={12}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <h6>Billed to:</h6>
                </Col>
                <Col
                  lg={12}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <p className="m-0 text-muted">
                    aasdssas3455 Geraldine Lane, assasdas3455 Geraldine Lane
                    assasdas3455 Geraldine Lane New York 10013 United States
                  </p>
                </Col>
              </Row>

              <Row className="gap-2 my-2">
                <Col
                  lg={12}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <h6>Payment Details:</h6>
                </Col>
                <Col
                  lg={12}
                  style={{
                    textAlign: "right",
                  }}
                >
                  <div className="d-flex justify-content-end">
                    <label className="fw-bold">Paypal:</label>
                    <p className="m-0 text-muted">example@email.com</p>
                  </div>

                  <div className="d-flex justify-content-end">
                    <label className="fw-bold">UPI:</label>
                    <p className="m-0 text-muted">userid@okbank</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="gap-2 my-3">
            <Col lg={12}>
              <h6>cart details:</h6>
            </Col>
            <CartDetail />
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-between w-full">
          <p className="m-0 text-danger">www.pcbplay.com</p>
          <p className="m-0 ">email@email.com</p>
          <p className="m-0 ">646-888-6885</p>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(Index);
