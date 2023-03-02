import React from "react";
import { Col, Row, Table } from "react-bootstrap";

function Index() {
  return (
    <Col lg={12} className="shadow p-2 invoice-cart-Detail-box">
      <Row>
        <Col lg={12} className="invoice-cart-Detail-table">
          <Table className="table-fixed bg-transparent">
            <thead>
              <tr className="text-muted">
                <th>part numbers</th>

                <th>part numbers</th>
                <th>Qty</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>stm32stm32stm32stm32</td>
                <td>stm32stm32stm32stm32</td>
                <td>01</td>
                <td>$ 3,000.00</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-3">
        <div className="flex justify-content-between">
          <p className="text-muted">pcb board quantity</p>
          <span>3</span>
        </div>
        <div className="flex justify-content-between">
          <p className="text-muted">components</p>
          <span>$ 150.00</span>
        </div>
        <div className="flex justify-content-between">
          <p className="text-muted">design fee</p>
          <span>$ 100.00</span>
        </div>
        <div className="flex justify-content-between">
          <p className="text-muted">delivery cost</p>
          <span>$ 100.00</span>
        </div>
        <div className="flex justify-content-between">
          <h6>Total</h6>
          <h6>$ 4,950.00</h6>
        </div>
      </Row>
    </Col>
  );
}

export default Index;
