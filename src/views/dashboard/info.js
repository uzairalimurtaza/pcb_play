import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { CustomSelect } from "../../components";

const options = [
  {
    label: "daily",
    value: "daily",
  },
  {
    label: "weekly",
    value: "weekly",
  },
  {
    label: "monthly",
    value: "monthly",
  },
];
function Index({ children, label }) {
  const [active, setActive] = React.useState(null);
  const [value, setValue] = React.useState("daily");

  return (
    <Row className="shadow-sm rounded-3">
      <Col
        lg={12}
        className="d-flex justify-content-between align-items-center"
      >
        <label>{label}</label>
        <div
          style={{
            width: 150,
          }}
        >
          <CustomSelect
            onChange={(e) => {
              const { value } = e.target || e;
              setValue(value);
            }}
            value={value}
            active={active}
            setActive={setActive}
            options={options}
          />
        </div>
      </Col>
      <Col
        lg={12}
        style={{
          height: "350px",
        }}
      >
        {children}
      </Col>
    </Row>
  );
}

export default memo(Index);
