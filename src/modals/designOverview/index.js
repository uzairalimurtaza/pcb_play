import { Fragment, memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { DotedLine, SolidLine } from "../../assets";

import Design from "./design";

import "./index.css";
const data = [
  {
    id: 1,
    line: SolidLine,
    color: "#22621A",
    name: "spi",
  },
  {
    id: 2,
    line: DotedLine,
    name: "ethernet",
    color: "#22621A",
  },
  {
    id: 3,
    line: SolidLine,
    name: "discrete I/O",
    color: "#E11045",
  },
  {
    id: 4,
    line: DotedLine,
    name: "can-bus",
    color: "#E11045",
  },
  {
    id: 5,
    line: SolidLine,
    name: "rs232",
    color: "#3DB2FF",
  },
  {
    id: 6,
    line: DotedLine,
    name: "rs422/485",
    color: "#3DB2FF",
  },
  {
    id: 7,
    line: SolidLine,
    name: "analog input",
    color: "#FFA24D",
  },
  {
    id: 8,
    line: DotedLine,
    name: "power output",
    color: "#FFA24D",
  },
  {
    id: 9,
    line: SolidLine,
    name: "power input",
    color: "#000000",
  },
  {
    id: 10,
    line: DotedLine,
    name: "jtag",
    color: "#000000",
  },
];

function Index({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          design overview
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="design-overview-main">
          <Design />
        </div>
        <div className="my-2">
          {data?.map((item) => {
            const Line = item.line || Fragment;
            return (
              <div key={item.id} className="d-flex align-items-center">
                <Line className="mx-2" stroke={item.color} />
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer className={`d-flex justify-content-end gap-3 w-100`}>
        <Button
          onClick={onHide}
          variant="outline-primary"
          className=" d-flex justify-content-between align-items-center "
        >
          cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(Index);
