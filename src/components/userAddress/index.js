import Radio from "@mui/material/Radio";
import React, { memo } from "react";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { DangerIcon, EditIcon, TrashIcon } from "../../assets";
import { ConfirmModal, UpdateAddress } from "../../modals";
import {
  deleteUserAddress,
  userAddressSetAsDefault,
} from "../../redux/auth/action";
import "./index.css";
function Index({ value, address, onChange, selectAble }) {
  const dispatch = useDispatch();
  const stopLoader = () => {
    setLoader(false);
    handleClose();
  };
  const deleteCartHandler = () => {
    setLoader(true);
    dispatch(deleteUserAddress(address._id, stopLoader));
  };
  const [showConfirm, setShowConfirm] = React.useState(false);
  const handleClose = () => setShowConfirm(false);
  const handleShow = () => setShowConfirm(true);
  const [loader, setLoader] = React.useState(false);
  const stopFlag = () => {};
  const setAsDefaultHandler = () => {
    dispatch(userAddressSetAsDefault(address._id, stopFlag));
  };
  const [showEdit, setShowEdit] = React.useState(false);
  const handleEdit = () => {
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  return (
    <Col lg={12}>
      <div
        className={`user-address ${value === address._id ? "active" : ""} p-3`}
      >
        <div className="user-address-box gap-2 w-25">
          {selectAble && (
            <Radio
              checked={value === address._id ? true : false}
              onChange={() => onChange(address._id)}
              value={address._id}
              sx={{
                color: "#E11045",
                "&.Mui-checked": {
                  color: "#E11045",
                },
              }}
            />
          )}

          <p className="address-name m-0">{address?.name}</p>
        </div>

        <p className="address-description m-0 w-25">
          {address?.addressOne}, {address?.city}, {address?.state},{" "}
          {address?.country}
        </p>
        {address?.isDefault ? (
          <div className="w-25">
            <p
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "21px",

                color: "#22621A",
              }}
            >
              default address
            </p>
          </div>
        ) : (
          <div className="w-25">
            <button
              onClick={setAsDefaultHandler}
              className="address-default-btn"
            >
              default
            </button>
          </div>
        )}
        <div className="d-flex gap-3">
          <button onClick={handleEdit}>
            <EditIcon />
          </button>
          <button onClick={handleShow}>
            <TrashIcon fill="#E11045" />
          </button>
        </div>
      </div>
      {showConfirm && (
        <ConfirmModal
          label="Delete Address"
          description={"Are you sure you want to delete this address?"}
          loader={loader}
          icon={DangerIcon}
          actionBtnText="Delete"
          show={showConfirm}
          onHide={handleClose}
          action={deleteCartHandler}
        />
      )}
      {showEdit && (
        <UpdateAddress
          show={showEdit}
          onHide={handleCloseEdit}
          address={address}
        />
      )}
    </Col>
  );
}

export default memo(Index);
