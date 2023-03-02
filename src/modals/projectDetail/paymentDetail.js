import React from "react";
import { Col, Row } from "react-bootstrap";
import { PaymentIcon, PaypalIcon, PinIcon } from "../../assets";

function paymentDetail() {
  return (
    <Row className="shadow pcb-box">
      <Col lg={12} className="pcb-box-header">
        <h6>delivery address & payment info</h6>
      </Col>
      <Col lg={12} className="pcb-box-body  p-0">
        <div className="d-flex align-items-center px-4 py-2">
          <PaymentIcon className="mx-3" />
          <span className="d-flex">
            <PaypalIcon />
            paypal
          </span>
        </div>
        <div className="d-flex align-items-center px-4 py-2">
          <PinIcon className="mx-3" />
          <div className="d-flex flex-column">
            <span>Saint Marco 14, Rome, Rome, Nomentano - 559944</span>
            <span>Saint Marco 14, Rome, Rome, Nomentano - 559944</span>
            <span>+390664220484</span>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default paymentDetail;
