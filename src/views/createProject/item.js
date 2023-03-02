import React, { memo, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRightIcon,
  DangerIcon,
  FileDock,
  NoImageIcon,
} from "../../assets";
import { AddCartWithQuantity } from "../../components";
import { ConfirmModal, PcbAlert } from "../../modals";
import { createNewCart } from "../../redux/cart/action";
import { Link } from "react-router-dom";
import {
  addNewItemToCart,
  removeCart,
  removeItemFromCart,
  removeMcuFromCart,
} from "../../redux/dashboard/action";
function Index({ component }) {
  const [quantity, setQuantity] = React.useState(1);
  const { cart } = useSelector((state) => state.dashboard);
  let items = cart?.items || [];
  const mcu = items?.find((e) => e.blockType === "mcu");

  const [showConfirm, setShowConfirm] = useState(false);
  const hideConfirmHandler = () => setShowConfirm(false);
  const showConfirmHandler = () => setShowConfirm(true);

  const stopAdding = () => {};
  const [loader, setLoader] = useState(false);
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
  const dispatch = useDispatch();
  const deleteHandler = (e) => {
    if (component?.blockType === "mcu") {
      showConfirmHandler();
      return;
    }

    setLoader(true);

    dispatch(removeItemFromCart(component?._id));
  };

  const deleteCartHandler = () => {
    setLoader(true);
    if (mcu?.productId !== component._id && component.blockType === "mcu") {
      const qty = component?.blockType === "mcu" ? 1 : quantity;
      let product = {
        partNumber: component.partNumber,
        productId: component._id,
        categoryId: component.category,
        pcbLayoutArea: component.pcbLayoutArea,
        blockType: component.blockType,
        quantity: qty,
        subCategory: component.subCategory,
        price: parseFloat(component.price),
        total: parseFloat(component.price) * qty,
      };

      product.analogInput = parseInt(component.analogInput);
      product.canBus = parseInt(component.canBus);
      product.discreteIO = parseInt(component.discreteIO);
      product.ethernet = parseInt(component.ethernet);
      product.i2c = parseInt(component.i2c);
      product.spi = parseInt(component.spi);
      product.uart = parseInt(component.uart);
      product.usb = parseInt(component.usb);
      dispatch(removeMcuFromCart(product, stopLoader));
      return;
    }
    dispatch(removeCart(stopLoader));
  };
  const stopLoader = () => {
    setLoader(false);
    hideConfirmHandler();
  };
  const addToCartHandler = (e) => {
    if (component?.blockType === "component" && !mcu) {
      showAlertHandler("please add mcu to cart first", "Error");
      return;
    }

    const qty = component?.blockType === "mcu" ? 1 : quantity;
    let product = {
      partNumber: component.partNumber,
      productId: component._id,
      categoryId: component.category,
      pcbLayoutArea: component.pcbLayoutArea,
      blockType: component.blockType,
      quantity: qty,
      subCategory: component.subCategory,
      price: parseFloat(component.price),
      total: parseFloat(component.price) * qty,
    };
    if (component.blockType === "mcu") {
      product.analogInput = parseInt(component.analogInput);
      product.canBus = parseInt(component.canBus);
      product.discreteIO = parseInt(component.discreteIO);
      product.ethernet = parseInt(component.ethernet);
      product.i2c = parseInt(component.i2c);
      product.spi = parseInt(component.spi);
      product.uart = parseInt(component.uart);
      product.usb = parseInt(component.usb);
    }
    if (component.blockType === "component") {
      product.externalConnectorPin = parseInt(component.externalConnectorPin);
    }
    if (mcu && component.blockType === "mcu") {
      showConfirmHandler();

      return;
    }

    let newItems = items.concat(product);
    let serviceFee = 0;
    const pcbLayoutArea = newItems.reduce((a, b) => {
      const first = parseFloat(b?.pcbLayoutArea?.first || 0);
      const second = parseFloat(b?.pcbLayoutArea?.second || 0);
      const firstSecond = first * second;
      return a + firstSecond;
    }, 0);

    if (pcbLayoutArea <= 10000) {
      serviceFee = 200;
    } else if (pcbLayoutArea <= 30000) {
      serviceFee = 275;
    } else if (pcbLayoutArea <= 60000) {
      serviceFee = 350;
    } else {
      showAlertHandler("board dimensions is too large", "danger");
      return;
    }

    if (cart) {
      if (mcu && component?.blockType === "component") {
        if (mcu[component.componentInterfaceOne]) {
          dispatch(
            addNewItemToCart(
              { ...product, inter: component.componentInterfaceOne },
              {
                serviceFee,
              },
              component.componentInterfaceOne,
              stopAdding
            )
          );
        } else if (mcu[component.componentInterfaceTwo]) {
          dispatch(
            addNewItemToCart(
              { ...product, inter: component.componentInterfaceTwo },
              {
                serviceFee,
              },
              component.componentInterfaceTwo,
              stopAdding
            )
          );
        } else if (mcu[component.componentInterfaceThree]) {
          dispatch(
            addNewItemToCart(
              { ...product, inter: component.componentInterfaceThree },
              {
                serviceFee,
              },
              component.componentInterfaceThree,
              stopAdding
            )
          );
        } else if (mcu[component.componentInterfaceFour]) {
          dispatch(
            addNewItemToCart(
              { ...product, inter: component.componentInterfaceFour },
              {
                serviceFee,
              },
              component.componentInterfaceFour,
              stopAdding
            )
          );
        } else {
          showAlertHandler(
            "interface is full you can`t add component",
            "Error"
          );
        }
      }
      return;
    }

    let newCart = {
      items: newItems,
      serviceFee: serviceFee,
      subTotal: newItems.reduce((a, b) => a + parseFloat(b.total), 0),
      cartStatus: "new",
    };

    dispatch(createNewCart(newCart, stopAdding));
  };
  const [showBasket, setShowBasket] = useState(false);
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  return (
    <Col
      lg={12}
      style={{
        borderBottom: "1px solid #e6e6e6",
      }}
    >
      <Row>
        <Col sm={show ? 12 : 6} xs={show ? 12 : 6}>
          <div
            className={`d-flex px-1 justify-content-start ${
              show ? "subPart" : ""
            } p-2 `}
          >
            <button onClick={handleToggle}>
              <ArrowRightIcon
                className={`component-svg mx-1 ${show ? "active" : ""}`}
              />
            </button>
            <div className="pcb-item-box ">
              <p className="m-0">part-number</p>
              <span>{component.partNumber}</span>
            </div>
          </div>
          {show && (
            <Row className="">
              <Col lg={5} className="">
                <div className="w-100 h-100 subPart d-flex flex-column align-items-center p-3 gap-3">
                  {component?.imageUrl ? (
                    <Image width={200} height={200} src={component?.imageUrl} />
                  ) : (
                    <NoImageIcon />
                  )}

                  <Link
                    to={component?.datasheetLink}
                    target="_blank"
                    className="d-flex"
                    rel="noreferrer"
                  >
                    <FileDock />
                    <span
                      style={{
                        color: "#E11045",
                      }}
                    >
                      datasheet
                    </span>
                  </Link>
                </div>
              </Col>
              <Col>
                <table className="parameters-table subPart ">
                  <thead>
                    <tr>
                      <th>parameters</th>
                      <th>values</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(component?.others || {})?.map((key, index) => (
                      <tr key={index}>
                        <td>{key}</td>
                        <td>{component?.others[key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          )}
        </Col>
        <Col sm={6} xs={6}>
          <div className="pcb-item-box">
            <p className="m-0">manufacturer</p>
            <span>{component.manufacturer}</span>
          </div>
        </Col>
        <Col sm={12} xs={12}>
          <div className="pcb-item-box">
            <p className="m-0">description</p>
            <span>{component.description}</span>
          </div>
        </Col>
        <Col sm={6} xs={6}>
          <div className="pcb-item-box flex-row justify-content-start align-items-center gap-3">
            <p className="m-0">price</p>
            <p className="m-0">${parseFloat(component.price).toFixed(2)}</p>
          </div>
        </Col>
        <Col sm={6} xs={6} className="d-flex  justify-content-end py-2">
          {component.blockType === "mcu" ? (
            <Button
              variant={
                items?.find((e) => e.productId === component._id) &&
                showBasket &&
                "danger"
              }
              onMouseOut={() => {
                setTimeout(() => {
                  setShowBasket(false);
                }, 10);
              }}
              onMouseOver={(e) => {
                e.stopPropagation();

                setShowBasket(true);
              }}
              style={{
                position: "relative",
                zIndex: 999,
              }}
              onClick={(a) => {
                a?.stopPropagation();
                if (items?.find((e) => e.productId === component._id)) {
                  deleteHandler();
                  return;
                }
                addToCartHandler();
              }}
              className={`btn cart-btn add-to-cart-btn ${
                items?.find((e) => e.productId === component._id)
                  ? "active"
                  : ""
              } `}
            >
              {items?.find((e) => e.productId === component._id) ? (
                <div
                  style={{
                    pointerEvents: "none",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {showBasket ? "remove" : "added"}
                </div>
              ) : (
                "add"
              )}
            </Button>
          ) : (
            <div className="mx-3">
              <AddCartWithQuantity
                component={component}
                onQtyChange={setQuantity}
                onRemoveToCart={deleteHandler}
                qty={quantity}
                onAddToCart={() => {
                  if (items?.find((e) => e.productId === component._id)) {
                    return;
                  }
                  addToCartHandler();
                }}
              />
            </div>
          )}
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
    </Col>
  );
}

export default memo(Index);
