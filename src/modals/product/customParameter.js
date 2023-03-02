import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CloseIcon } from "../../assets";
import { Input } from "../../components";

function Index({ name, value, onChange, onRemove }) {
  const [newName, setName] = useState("");

  useEffect(() => {
    if (name) {
      setName(name);
    }
  }, [name]);
  return (
    <Row>
      <Col lg={6}>
        <Input
          max={35}
          maxLength={35}
          placeholder="Enter parameter"
          value={newName}
          onChange={(e) => setName(e.target.value)}
        />
      </Col>
      <Col lg={5}>
        <Input
          max={50}
          maxLength={50}
          placeholder="Enter value"
          value={value}
          onChange={(e) =>
            onChange({
              name: newName,
              previousName: name,
              value: e.target.value,
            })
          }
        />
      </Col>
      <Col className="d-flex justify-content-center align-items-center pb-3">
        <CloseIcon onClick={() => onRemove(name)} width={14} height={14} />
      </Col>
    </Row>
  );
}

export default Index;
