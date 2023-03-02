import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import ProjectDetailItem from "./projectDetailItem";
function Index() {
  return (
    <Row className="gap-3">
      <Col lg={12}>
        <h6>project details:</h6>
      </Col>
      <Col lg={12} className="shadow p-0 invoice-project-Detail-box">
        <ProjectDetailItem
          label={"project name"}
          value="0026100261002610026100261"
          strip
        />
        <ProjectDetailItem
          label={"project name"}
          value="0026100261002610026100261"
        />
        <ProjectDetailItem
          label={"project name"}
          value="0026100261002610026100261"
          strip
        />
        <ProjectDetailItem
          label={"project name"}
          value="0026100261002610026100261"
        />
        <ProjectDetailItem
          label={"project name"}
          value="0026100261002610026100261"
          strip
        />
        <ProjectDetailItem
          label={"project name"}
          value="0026100261002610026100261"
        />
      </Col>
    </Row>
  );
}

export default memo(Index);
