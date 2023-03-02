import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import moment from "moment";

function Index({ project, user }) {
  return (
    <Row className="shadow pcb-box">
      <Col lg={12} className="pcb-box-header">
        <h6>general info</h6>
      </Col>
      <Col lg={12} className="pcb-box-body  p-0">
        <div className="gerenal-info-item">
          <label>Project Name</label>
          <span>{project?.projectName}</span>
        </div>
        <div className="gerenal-info-item">
          <label>project id</label>
          <span>{project?.projectId}</span>
        </div>
        <div className="gerenal-info-item">
          <label>order date</label>
          <span>{moment(project?.createdAt).format("DD.MM.YYYY")}</span>
        </div>

        <div className="gerenal-info-item">
          <label>invoice</label>
          <span>{project?.invoice || "N/A"}</span>
        </div>

        <div className="gerenal-info-item">
          <label>board dimensions (mm)</label>
          <span>
            {project?.pcbBoardDimensions?.width || 0} x{" "}
            {project?.pcbBoardDimensions?.height || 0}
          </span>
        </div>
        <div className="gerenal-info-item">
          <label>assembly side(s)</label>
          <span>{project?.componentPlacement}</span>
        </div>
        <div className="gerenal-info-item">
          <label>standoff holes</label>
          <span>{project?.pcbStandoffHoles}</span>
        </div>
        <div className="gerenal-info-item">
          <label>identical components</label>
          <span>{project?.componentPlacement}</span>
        </div>
        <div className="gerenal-info-item">
          <label>customer name</label>
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </Col>
    </Row>
  );
}

export default memo(Index);
