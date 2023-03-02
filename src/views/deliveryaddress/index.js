import { Divider, Spin } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UserAddress } from "../../components";
import { getAllUserAddress, resetRemoveAddress } from "../../redux/auth/action";
import AddressForm from "./addressForm";
import Snackbar from "../../components/CustomSnackbar/index";
import "./index.css";

function Index() {
  const [loader, setLoader] = useState(false);
  const { addressess } = useSelector((state) => state.auth);
  const { removeUserAddress } = useSelector((state) => state);
  const [showAddForm, setShowAddForm] = useState(false);
  const [severity, setSeverity] = React.useState(null);
  const [showSnackBar, setSnackBar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const showAddFormHandler = () => {
    setShowAddForm(true);
  };
  const hideAddFormHandler = () => {
    setShowAddForm(false);
  };
  const dispatch = useDispatch();

  const stopLoader = (data) => {
    setLoader(false);
  };

  useEffect(() => {
    setLoader(true);
    dispatch(getAllUserAddress(stopLoader));
    dispatch(resetRemoveAddress());
  }, []);

  useEffect(() => {
    if (removeUserAddress) {
      if (removeUserAddress.success) {
        setSeverity("success");
        setMessage("Address removed successfully!");
        setSnackBar(!showSnackBar);
        dispatch(getAllUserAddress(stopLoader));
        setTimeout(() => dispatch(resetRemoveAddress()), [2000]);
      } else {
        setSeverity("error");
        setMessage("Something went wrong while removing address");
        setSnackBar(!showSnackBar);
      }
    }
  }, [removeUserAddress]);

  return (
    <Container fluid>
      <Snackbar
        severity={severity}
        message={message}
        open={showSnackBar}
        onClose={() => {
          setSnackBar(!showSnackBar);
        }}
      />
      <Row className="mt-5">
        <Col lg={8}>
          <h5 className="content-main-heading">delivery address</h5>
        </Col>
      </Row>
      <Spin spinning={loader}>
        <Row className="gap-3 bg-white p-3 shadow-sm rounded-3">
          {addressess?.map((address, index) => {
            return <UserAddress address={address} key={index} />;
          })}

          {!showAddForm && (
            <Col
              lg={12}
              className="d-flex justify-content-end align-items-center "
            >
              <Button
                onClick={showAddFormHandler}
                variant="outline-primary"
                className=" gap-2 py-2 d-flex justify-content-center align-items-center "
              >
                <FaPlusCircle />
                <label
                  className="small-label"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  add address
                </label>
              </Button>
            </Col>
          )}
          {showAddForm && (
            <>
              <Divider />
              <Col lg={12}>
                <AddressForm
                  onSubmitCallBack={hideAddFormHandler}
                  severity={severity}
                  setSeverity={setSeverity}
                  showSnackBar={showSnackBar}
                  setSnackBar={setSnackBar}
                  message={message}
                  setMessage={setMessage}
                />
              </Col>
            </>
          )}
        </Row>
      </Spin>
    </Container>
  );
}

export default memo(Index);
