import Checkbox from "@mui/material/Checkbox";
import { memo, useMemo, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

import { InfoCircleOutlined } from "../../assets";
import { CustomSelect, PcbTooltip } from "../../components";

const unitOptions = [
  {
    value: "mm",
    label: "mm",
  },
  {
    value: "inch",
    label: "inch",
  },
];
function Index({ values, onChange }) {
  const [unit, setUnit] = useState("mm");
  const [active, setActive] = useState(false);

  const { height, width } = useMemo(() => {
    const w = values.pcbBoardDimensions?.width || 0;
    const h = values.pcbBoardDimensions?.height || 0;

    if (unit === "inch") {
      return { width: w * 25.4, height: h * 25.4 };
    }
    return { width: w, height: h };
  }, [values, unit]);
  return (
    <Row className="shadow-sm pcb-box bg-white">
      <Col lg={12} className="pcb-box-header p-2">
        <h6>options</h6>
      </Col>
      <Col lg={12} className="pcb-box-body p-3 ">
        <Form.Group
          className="py-2"
          style={{
            borderBottom: "1px solid #e6e6e6",
          }}
        >
          <div className="d-flex gap-2 align-items-center ">
            <Form.Label className="m-0">project name</Form.Label>
            <PcbTooltip
              placement="top"
              innerContent={
                <ul
                  style={{
                    listStyle: "none",
                  }}
                >
                  <li className="d-flex align-items-start gap-2 ">
                    <div>
                      <FaStar className="mt-1" />
                    </div>
                    <p className="m-0 text-start">
                      you can change the project name.
                    </p>
                  </li>
                </ul>
              }
            >
              <InfoCircleOutlined />
            </PcbTooltip>
          </div>

          <Form.Control
            value={values?.name}
            name="name"
            onChange={(e) => {
              const { name, value } = e.target;
              let newValues = values;
              newValues = {
                ...newValues,
                [name]: value,
              };
              onChange?.(newValues);
            }}
            className="my-2"
          />
        </Form.Group>
        <Form.Group
          className="py-2"
          style={{
            borderBottom: "1px solid #e6e6e6",
          }}
        >
          <div className="d-flex gap-2 align-items-center my-2 ">
            <Form.Label className="m-0">board dimensions</Form.Label>
            <PcbTooltip
              placement="top"
              innerContent={
                <ul
                  style={{
                    listStyle: "none",
                  }}
                >
                  <li className="d-flex align-items-start gap-2 ">
                    <div>
                      <FaStar className="mt-1" />
                    </div>
                    <p className="m-0 text-start">
                      Set the width and length of the pcb board or leave it to
                      us to optimize.
                    </p>
                  </li>
                  <li className="d-flex align-items-start gap-2 ">
                    <div>
                      <FaStar className="mt-1" />
                    </div>

                    <p className="m-0 text-start">
                      We recommend setting a custom length and/or width after
                      all your components have been chosen since choosing a
                      custom size can limit the amount of components that you
                      can add to your board.
                    </p>
                  </li>
                </ul>
              }
            >
              <InfoCircleOutlined />
            </PcbTooltip>
          </div>
          <div className="d-flex gap-3 align-items-end my-2 ">
            <Form.Group>
              <Form.Label className="m-0">length</Form.Label>
              <Form.Control disabled value={height?.toFixed(2)} />
            </Form.Group>
            <Form.Group>
              <Form.Label className="m-0">width</Form.Label>
              <Form.Control disabled value={width?.toFixed(2)} />
            </Form.Group>
            <div>
              <CustomSelect
                value={unit}
                active={active}
                setActive={setActive}
                name="unit"
                onChange={(e) => {
                  setUnit(e?.value);
                }}
                options={unitOptions}
              />
            </div>
          </div>
        </Form.Group>
        <Form.Group className="py-2">
          <div className="d-flex gap-2 align-items-center my-2 ">
            <Form.Label className="m-0">other parameters</Form.Label>
            <PcbTooltip
              placement="top"
              innerContent={
                <ul
                  style={{
                    listStyle: "none",
                  }}
                >
                  <li className="d-flex align-items-start gap-2 ">
                    <div>
                      <FaStar className="mt-1" />
                    </div>
                    <p className="m-0 text-start">
                      By default, boards are drilled for standard mounting
                      "standoff" holes. Deselecting standoff holes enable more
                      space to place additional components.
                    </p>
                  </li>
                  <li className="d-flex align-items-start gap-2 ">
                    <div>
                      <FaStar className="mt-1" />
                    </div>
                    <p className="m-0 text-start">
                      This is an option to use another component with the same
                      characteristics as the selected component. It may also
                      shorten the delivery time.
                    </p>
                  </li>
                </ul>
              }
            >
              <InfoCircleOutlined />
            </PcbTooltip>
          </div>
          <div className="d-flex  align-items-center my-2 ">
            <Checkbox
              value={values?.identicalComponents}
              checked={values?.identicalComponents}
              name="identicalComponents"
              onChange={(e) => {
                const { name, checked } = e.target;
                let newValues = values;
                newValues = {
                  ...newValues,
                  [name]: checked,
                };
                onChange?.(newValues);
              }}
              id="checkbox"
              sx={{
                color: "#e11045",
                "&.Mui-checked": {
                  color: "#e11045",
                },
              }}
            />
            <label
              style={{
                cursor: "pointer",
              }}
              htmlFor="checkbox"
            >
              identical components
            </label>
          </div>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default memo(Index);
