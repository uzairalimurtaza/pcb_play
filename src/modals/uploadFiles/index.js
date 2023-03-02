import React, { memo } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { ImgesIcon } from "../../assets";
import "./index.css";
import ProgressBar from "./progressBar";
function Index({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          upload files
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col lg={7} className="mx-auto">
              <div className="upload-file-box gap-3">
                <ImgesIcon />
                <Button
                  variant="outline-primary"
                  className=" d-flex justify-content-center align-items-center "
                >
                  browse files
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="gap-3 my-4">
            <ProgressBar status="completed" />
            <ProgressBar status="uploading" percent={60} />
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default memo(Index);
