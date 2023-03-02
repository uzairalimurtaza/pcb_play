import React, { memo, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { CustomSelect } from "../../components";
import GeneralInfo from "./generalInfo";
import CartDetail from "./cartDeatil";

import "./index.css";
import PaymentDetail from "./paymentDetail";
function Index({ show, showPayment, onHide, cart, project, user }) {
  const [loader] = useState(false);
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>project details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="gap-3">
            <Col lg={6}>
              <GeneralInfo project={project} user={user} />

              {showPayment && (
                <>
                  <Row className="my-4">
                    <Col lg={8}>
                      <CustomSelect label={"order status"} />
                    </Col>
                  </Row>
                  <PaymentDetail />
                </>
              )}
            </Col>
            <Col>
              <CartDetail cart={cart} project={project} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer
        className={`d-flex ${
          showPayment ? "justify-content-between" : "justify-content-end"
        } gap-3 w-100`}
      >
        <Button
          onClick={onHide}
          variant="outline-primary"
          className=" d-flex justify-content-between align-items-center "
        >
          cancel
        </Button>
        {showPayment && (
          <Button
            type="submit"
            variant="danger"
            className={` d-flex  align-items-center `}
          >
            {loader ? (
              <div className=" d-flex justify-content-between  align-items-center ">
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
              "update"
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default memo(Index);
