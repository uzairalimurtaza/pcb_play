import React, { memo } from "react";
import { Col, ProgressBar } from "react-bootstrap";

import { CloseIconCircle, GreenTickCircle, TrashIcon } from "../../assets";

function Index({ status, percent }) {
  return (
    <Col lg={12} className="shadow-sm p-0 ">
      <div className=" d-flex justify-content-between rounded-3 align-items-center p-2">
        <label>{status}</label>
        <div className="d-flex justify-content-between align-items-center ">
          {status === "completed" ? (
            <GreenTickCircle className="mx-4" />
          ) : (
            <span className="mx-4">{percent}%</span>
          )}
          {status === "completed" ? <TrashIcon /> : <CloseIconCircle />}
        </div>
      </div>
      {status === "uploading" && (
        <ProgressBar
          style={{
            height: "5px",
            marginTop: "5px",
            background: "transparent",
          }}
          variant="success"
          now={percent}
        />
      )}
    </Col>
  );
}

export default memo(Index);
