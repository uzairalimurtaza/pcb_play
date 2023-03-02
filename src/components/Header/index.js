import { Avatar } from "antd";
import React from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DangerIcon } from "../../assets";
import { ConfirmModal } from "../../modals";
import { adminLogout } from "../../redux/auth/action";

import "./index.css";
function Index() {
  const { user } = useSelector((state) => state.auth);
  const [toggle, setToggle] = React.useState(false);
  const togglehandle = (e) => {
    setToggle(!toggle);
  };
  const [showConfirm, setShowConfirm] = React.useState(false);
  const showConfirmHandler = () => setShowConfirm(true);
  const hideConfirmHandler = () => setShowConfirm(false);
  window.addEventListener("click", (e) => {
    if (e.target.id !== "profile-pic-btn") {
      setToggle(false);
    }
  });
  const [loader, setLoader] = React.useState(false);
  const stopLoader = () => {
    setLoader(false);
    hideConfirmHandler();
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    setLoader(true);
    dispatch(adminLogout(stopLoader));
  };
  return (
    <div className="pcb-content-header">
      <div className="pcb-content-header-info ">
        {/* <NewNotification />
        <div className="divder-vertical" /> */}
        <button
          onClick={togglehandle}
          id="profile-pic-btn"
          style={{ position: "relative" }}
        >
          <Avatar
            style={{
              backgroundColor: "green",
              cursor: "pointer",
              pointerEvents: "none",
            }}
            className="shadow-sm"
            size={50}
          >
            {user.email.substring(0, 2)}
          </Avatar>

          <div
            style={{
              width: "auto",
            }}
            className={`pcb-select-dropdown  ${toggle ? "show" : ""} `}
          >
            <div className="pcb-select-dropdown-box">
              <div className={`pcb-select-dropdown-item `}>{user.email}</div>
              <div className={`pcb-select-dropdown-item p-0 `}>
                <button
                  className="w-100 h-100 p-2"
                  onClick={showConfirmHandler}
                >
                  logout
                </button>
              </div>
            </div>
          </div>
        </button>
      </div>
      {showConfirm && (
        <ConfirmModal
          label="logout"
          description={"Are you sure you want to logout?"}
          loader={loader}
          icon={DangerIcon}
          actionBtnText="logout"
          show={showConfirm}
          onHide={hideConfirmHandler}
          action={handleLogout}
        />
      )}
    </div>
  );
}
export default memo(Index);
