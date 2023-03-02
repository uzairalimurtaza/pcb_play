import { memo } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

function Index({ show, onHide, label, description, content }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body
        style={{
          background: " rgba(255, 46, 99, 0.1)",
          borderRadius: "8px",
          border: 0,
        }}
      >
        <button onClick={onHide}>
          <FaTimes
            style={{
              color: "#FFFFFF",
              position: "absolute",
              right: 10,
              top: 10,
            }}
          />
        </button>

        <Container>
          <Row>
            <Col lg={12} className="text-center">
              {label}
            </Col>
            <Col className="text-center" lg={12}>
              {description}
            </Col>
            <Col className="text-center" lg={12}>
              {content}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default memo(Index);
