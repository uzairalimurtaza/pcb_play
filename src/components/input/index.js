import React, { memo } from "react";
import { Form } from "react-bootstrap";

function Index({
  name,
  type,
  value,
  onChange,
  placeholder,
  min,
  max,
  maxLength,
  row,
  as,
}) {
  return (
    <Form.Group
      className="mb-3"
      variant="outline-primary"
      controlId="exampleForm.ControlInput1"
    >
      <Form.Control
        name={name}
        value={value}
        onKeyDown={(e) => {
          if (["e", "E", "+", "-"].includes(e.key) && type === "number") {
            e.preventDefault();
          }
          if (e.target.value?.length >= maxLength) {
            return;
          }
        }}
        maxLength={maxLength}
        min={min}
        max={max}
        rows={row}
        as={as}
        onChange={onChange}
        type={type || "text"}
        className="small-label"
        placeholder={placeholder}
      />
    </Form.Group>
  );
}
export default memo(Index);
