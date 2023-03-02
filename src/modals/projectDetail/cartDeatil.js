import React from "react";
import { Col, Row } from "react-bootstrap";
import CartItem from "../../components/cartSummary/cartItem";
function Index({ cart, project }) {
  const items = cart?.items || [];
  const subTotal = parseFloat(cart?.subTotal || 0);
  const componentCost = parseFloat(project?.componentCost || 0);
  const designFee = parseFloat(project?.designFee || 0);

  const total = subTotal + componentCost + designFee;
  return (
    <Row className="shadow pcb-box">
      <Col lg={12} className="pcb-box-header">
        <h6>Items</h6>
      </Col>
      <Col lg={12} className="pcb-box-body  p-0">
        {items?.map((item, index) => (
          <CartItem item={item} key={index} />
        ))}

        <Row className="px-3 my-2">
          <div className="d-flex justify-content-between">
            <p>sub total</p>
            <span>${parseFloat(cart?.subTotal).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <p>pcb board quantity</p>
            <span>{project?.pcbBoardQty}</span>
          </div>
          <div className="d-flex justify-content-between">
            <p>components cost</p>
            <span>${project?.componentCost}</span>
          </div>
          <div className="d-flex justify-content-between">
            <p>design fee</p>
            <span>${project?.designFee}</span>
          </div>

          <div className="d-flex justify-content-between">
            <h6>total</h6>
            <h6>${parseFloat(total).toFixed(2)}</h6>
          </div>
        </Row>
      </Col>
    </Row>
  );
}

export default Index;
