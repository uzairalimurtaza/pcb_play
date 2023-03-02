import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { memo } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DangerIcon, PcbLogoIcon } from "../../assets";
import { ConfirmModal } from "../../modals";
import { adminLogout } from "../../redux/auth/action";
import { useNavigate } from "react-router-dom";
import "./index.css";
function Index() {
  const [toggleOne, setToggleOne] = React.useState(false);
  const [toggle, setToggle] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const togglehandle = (e) => {
    setToggle(!toggle);
  };

  const toggleonehandle = (e) => {
    setToggleOne(!toggleOne);
  };
  const [showConfirm, setShowConfirm] = React.useState(false);
  const showConfirmHandler = () => setShowConfirm(true);
  const hideConfirmHandler = () => setShowConfirm(false);
  window.addEventListener("click", (e) => {
    if (e.target.id !== "profile-pic-btn") {
      setToggle(false);
      setToggleOne(false);
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
    <Container fluid className=" p-0 ">
      <Navbar bg="white" className=" shadow-sm pcb-navbar py-3  " expand="lg">
        <Navbar.Brand onClick={() => navigate("/")}>
          <PcbLogoIcon />
        </Navbar.Brand>

        <div className="d-flex gap-3">
          <button
            onClick={toggleonehandle}
            className={`justify-content-center align-items-center d-flex d-lg-none d-xl-none d-md-flex ${
              user ? "showOuter" : ""
            }`}
            id="profile-pic-btn"
            style={{ position: "relative", border: "none" }}
          >
            <Avatar
              style={{
                backgroundColor: user && "#22621A",
                cursor: "pointer",
                pointerEvents: "none",
              }}
              className={`  text-lowercase justify-content-center align-items-center d-flex`}
              size={{ xs: 40, sm: 50, md: 50, lg: 50, xl: 50, xxl: 50 }}
              icon={!user && <UserOutlined />}
            >
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </Avatar>
            <div className={`pcb-select-dropdown  ${toggleOne ? "show" : ""} `}>
              <div className="pcb-select-dropdown-box">
                <div className={`pcb-select-dropdown-item p-0 `}>
                  {user ? (
                    <button className="w-100 h-100 p-2">my account</button>
                  ) : (
                    <Button
                      onClick={() => navigate("/login")}
                      className="w-100 h-100 p-2 bg-transparent border-0 rounded-3"
                    >
                      login
                    </Button>
                  )}
                </div>
                <div className={`pcb-select-dropdown-item p-0 `}>
                  {user ? (
                    <Button
                      onClick={showConfirmHandler}
                      className="w-100 h-100 p-2 bg-transparent border-0 rounded-3"
                    >
                      logout
                    </Button>
                  ) : (
                    <Button
                      onClick={() => navigate("/register")}
                      className="w-100 h-100 p-2 bg-transparent border-0 rounded-3"
                    >
                      register
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </button>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>

        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 gap-3 " navbarScroll>
            <Nav.Link onClick={() => navigate("/how-it-works")}>
              how it works
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/faqs")}>faqs</Nav.Link>

            <Button
              onClick={() => navigate("/create-an-project")}
              variant="danger"
              className=" d-flex justify-content-between align-items-center "
            >
              Start a Project
            </Button>
          </Nav>
        </Navbar.Collapse>
        <button
          onClick={togglehandle}
          className={`mx-3 justify-content-center align-items-center d-none d-md-none d-lg-flex d-xl-flex ${
            user ? "showOuter" : ""
          }`}
          id="profile-pic-btn"
          style={{ position: "relative", border: "none" }}
        >
          <Avatar
            style={{
              backgroundColor: user && "#22621A",
              cursor: "pointer",
              pointerEvents: "none",
            }}
            className={`  text-lowercase  justify-content-center align-items-center d-flex`}
            size={{ xs: 50, sm: 50, md: 50, lg: 50, xl: 50, xxl: 50 }}
            icon={!user && <UserOutlined />}
          >
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </Avatar>

          <div className={`pcb-select-dropdown  ${toggle ? "show" : ""} `}>
            <div className="pcb-select-dropdown-box">
              <div className={`pcb-select-dropdown-item p-0 `}>
                {user ? (
                  <Button
                    onClick={() => navigate("/dashboard/personal-info")}
                    className="w-100 h-100 p-2 bg-transparent border-0 rounded-3"
                  >
                    my account
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/login")}
                    className="w-100 h-100 p-2 bg-transparent border-0 rounded-3"
                  >
                    login
                  </Button>
                )}
              </div>
              <div className={`pcb-select-dropdown-item p-0 `}>
                {user ? (
                  <Button
                    onClick={showConfirmHandler}
                    className="w-100 h-100 p-2 bg-transparent border-0 rounded-3"
                  >
                    logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/register")}
                    className="w-100 h-100 p-2 bg-transparent border-0 rounded-3"
                  >
                    register
                  </Button>
                )}
              </div>
            </div>
          </div>
        </button>
      </Navbar>
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
    </Container>
  );
}

export default memo(Index);
