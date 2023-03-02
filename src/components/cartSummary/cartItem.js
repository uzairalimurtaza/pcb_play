import { DangerIcon } from "../../assets";

import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { ConfirmModal, PcbAlert } from "../../modals";
import {
  removeCart,
  removeItemFromCart,
  updateItemQty,
} from "../../redux/dashboard/action";
import Quantity from "../quantity";
import "./index.css";
function Index({ item, showQtyBtn, showQtyDiv }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const hideConfirmHandler = () => setShowConfirm(false);
  const { cart } = useSelector((state) => state.dashboard);
  let items = cart?.items || [];
  const [loader, setLoader] = useState(false);
  const mcu = items.find((item) => item.blockType === "mcu");

  const stopLoader = () => {
    setLoader(false);
    hideConfirmHandler();
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    label: "",
  });
  const showAlertHandler = (message, label) => {
    setAlert({
      show: true,
      message,
      label,
    });
  };

  const hideAlertHandler = () => {
    setAlert({
      show: false,
      message: "",
      label: "",
    });
  };
  const deleteCartHandler = () => {
    setLoader(true);
    dispatch(removeCart(stopLoader));
  };
  const updateQtyHadler = (qty) => {
    if (qty < item.quantity) {
      if (item[item.componentInterfaceOne]) {
        dispatch(
          updateItemQty(
            qty,
            "decrease",
            item.componentInterfaceOne,
            item?.productId
          )
        );
      } else if (item[item.componentInterfaceTwo]) {
        dispatch(
          updateItemQty(
            qty,
            "decrease",
            item.componentInterfaceTwo,
            item?.productId
          )
        );
      } else if (item[item.componentInterfaceThree]) {
        dispatch(
          updateItemQty(
            qty,
            "decrease",
            item.componentInterfaceThree,
            item?.productId
          )
        );
      } else if (item[item.componentInterfaceFour]) {
        dispatch(
          updateItemQty(
            qty,
            "decrease",
            item.componentInterfaceFour,
            item?.productId
          )
        );
      } else {
        showAlertHandler("interface is full you can`t add component", "Error");
        return;
      }
    } else {
      if (mcu && item?.blockType === "component") {
        if (mcu[item.componentInterfaceOne]) {
          dispatch(
            updateItemQty(
              qty,
              "increase",
              item.componentInterfaceOne,
              item?.productId
            )
          );
        } else if (mcu[item.componentInterfaceTwo]) {
          dispatch(
            updateItemQty(
              qty,
              "increase",
              item.componentInterfaceTwo,
              item?.productId
            )
          );
        } else if (mcu[item.componentInterfaceThree]) {
          dispatch(
            updateItemQty(
              qty,
              "increase",
              item.componentInterfaceThree,
              item?.productId
            )
          );
        } else if (mcu[item.componentInterfaceFour]) {
          dispatch(
            updateItemQty(
              qty,
              "increase",
              item.componentInterfaceFour,
              item?.productId
            )
          );
        } else {
          showAlertHandler(
            "interface is full you can`t add component",
            "Error"
          );
          return;
        }
      }
    }
  };
  const removeitemhandler = () => {
    if (item.blockType === "mcu") {
      setShowConfirm(true);
      return;
    }

    if (item[item.componentInterfaceOne]) {
      dispatch(removeItemFromCart(item?.productId, item.componentInterfaceOne));
    } else if (item[item.componentInterfaceTwo]) {
      dispatch(removeItemFromCart(item?.productId, item.componentInterfaceTwo));
    } else if (item[item.componentInterfaceThree]) {
      dispatch(
        removeItemFromCart(item?.productId, item.componentInterfaceThree)
      );
    } else if (item[item.componentInterfaceFour]) {
      dispatch(
        removeItemFromCart(item?.productId, item.componentInterfaceFour)
      );
    } else {
      showAlertHandler("interface is full you can`t add component", "Error");
      return;
    }
  };
  return (
    <Container fluid className="  py-2 cart-item ">
      <Row>
        <Col className="cart-desc" lg={6} md={6} sm={6} xs={6}>
          <label>{item?.partNumber}</label>
          <p className="m-0 text-muted ">{item?.subCategory}</p>
        </Col>
        <Col className="d-flex align-items-center justify-content-center flex-wrap p-0   ">
          <Quantity
            qty={item?.quantity}
            onDelete={removeitemhandler}
            onChange={updateQtyHadler}
            showBtn={showQtyBtn}
            showQtyDiv={showQtyDiv}
          />
          {/* {remove && <TrashIcon onClick={deleteHandler} />} */}
        </Col>
        <Col className="p-0 d-flex justify-content-center align-items-center">
          <p
            style={{
              width: "100%",
              wordBreak: "break-all",
              textAlign: "right",
            }}
            className="m-0 text-right cart-price me-2  "
          >
            ${parseFloat(item.total).toFixed(2)}
          </p>
        </Col>
      </Row>

      {showConfirm && (
        <ConfirmModal
          label="Clear Cart"
          description={"Are you sure you want to clear cart?"}
          loader={loader}
          icon={DangerIcon}
          actionBtnText="remove"
          show={showConfirm}
          onHide={hideConfirmHandler}
          action={deleteCartHandler}
        />
      )}
      {alert.show && (
        <PcbAlert
          label={alert.label}
          description={alert.message}
          icon={DangerIcon}
          actionBtnText="ok"
          show={alert.show}
          onHide={hideAlertHandler}
        />
      )}
    </Container>
  );
}

export default Index;
