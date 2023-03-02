import { Fragment, memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { CloseIcon } from "../../assets";

function Index({
  show,
  onHide,

  label,
  description,
  icon,
  actionBtnText,
}) {
  const Icon = icon || Fragment;
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Body>
        <div className="d-flex justify-content-end ">
          <CloseIcon onClick={onHide} />
        </div>
        <div className="d-flex">
          <Icon />
          <div className="m-3">
            <h6>{label}</h6>
            <p>{description}</p>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-3">
          <Button
            onClick={onHide}
            variant="danger"
            className=" d-flex justify-content-between align-items-center "
          >
            {actionBtnText}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default memo(Index);
