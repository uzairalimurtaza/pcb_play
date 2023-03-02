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
import { ConfirmModal, PcbAlert, PcbBigAlert } from "../../modals";
import { createNewCart } from "../../redux/cart/action";
import { Link } from "react-router-dom";

import {
  addNewItemToCart,
  removeCart,
  removeItemFromCart,
  removeMcuFromCart,
} from "../../redux/dashboard/action";

function Index({ component }) {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    label: "",
  });

  const [bigAlert, setBigAlert] = useState({
    show: false,
    message: "",
    label: "",
    content: "",
  });

  const showAlertHandler = (message, label) => {
    setAlert({
      show: true,
      message,
      label,
    });
  };

  const showBigAlertHandler = (message, label, content) => {
    setBigAlert({
      show: true,
      message,
      label,
      content,
    });
  };
  const hideAlertHandler = () => {
    setAlert({
      show: false,
      message: "",
      label: "",
    });
  };

  const hideBigAlertHandler = () => {
    setBigAlert({
      show: false,
      message: "",
      label: "",
      content: "",
    });
  };
  const { cart } = useSelector((state) => state.dashboard);
  let items = cart?.items || [];

  const mcu = items?.find((e) => e.blockType === "mcu");
  const [quantity, setQuantity] = React.useState(1);
  const [adding, setAdding] = React.useState(false);
  const stopAdding = () => {
    setAdding(false);
  };

  const dispatch = useDispatch();
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
      product.componentInterfaceOne = component.componentInterfaceOne;
      product.componentInterfaceTwo = component.componentInterfaceTwo;
      product.componentInterfaceThree = component.componentInterfaceThree;
      product.componentInterfaceFour = component.componentInterfaceFour;
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
        let totalQty = qty;

        const totalInterfaces =
          parseInt(mcu[component.componentInterfaceOne] || 0) +
          parseInt(mcu[component.componentInterfaceTwo] || 0) +
          parseInt(mcu[component.componentInterfaceThree] || 0) +
          parseInt(mcu[component.componentInterfaceFour] || 0);
        if (totalInterfaces < totalQty) {
          showBigAlertHandler(
            <p
              style={{
                textAlign: "center",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "16px",
                /* identical to box height, or 133% */
                color: "#FF2E63",
                display: "flex",
                alignItems: "center",
              }}
            >
              selected (${mcu?.partNumber}) mcu has limited interfaces seen
              below.
              <br />
              next component should meet left interfaces or you can switch to
              another MCU
            </p>,

            <p
              style={{
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "16px",
                /* identical to box height, or 133% */
                color: "#FF2E63",

                textAlign: "center",
              }}
            >
              Alert Message!
            </p>,
            <ul className="big-alert-list">
              <li>
                spi <span>{mcu?.spi || 0}</span>
              </li>
              <li>
                i2c <span>{mcu?.i2c || 0}</span>
              </li>
              <li>
                uart <span>{mcu?.uart || 0}</span>
              </li>
              <li>
                can bus <span>{mcu?.canbus || 0}</span>
              </li>
              <li>
                ethernet <span>{mcu?.ethernet || 0}</span>
              </li>
            </ul>
          );
          return;
        }
        if (
          parseInt(mcu[component.componentInterfaceOne]) > 0 &&
          totalQty > 0
        ) {
          let minus = parseInt(mcu[component.componentInterfaceOne]) - totalQty;

          let totalUsedQty;
          if (totalQty > parseInt(mcu[component.componentInterfaceOne])) {
            totalUsedQty = totalQty + minus;
          } else {
            totalUsedQty = totalQty;
          }

          totalQty = totalQty - totalUsedQty;
          if (totalUsedQty) {
            dispatch(
              addNewItemToCart(
                {
                  ...product,
                  [component.componentInterfaceOne]: totalUsedQty,
                  quantity: totalUsedQty,
                },
                {
                  serviceFee,
                },
                component.componentInterfaceOne,
                stopAdding
              )
            );
          }
        }

        if (
          parseInt(mcu[component.componentInterfaceTwo]) > 0 &&
          totalQty > 0
        ) {
          let minus = parseInt(mcu[component.componentInterfaceTwo]) - totalQty;

          let totalUsedQty;
          if (totalQty > parseInt(mcu[component.componentInterfaceTwo])) {
            totalUsedQty = totalQty + minus;
          } else {
            totalUsedQty = totalQty;
          }

          totalQty = totalQty - totalUsedQty;

          if (totalUsedQty) {
            dispatch(
              addNewItemToCart(
                {
                  ...product,
                  [component.componentInterfaceTwo]: totalUsedQty,
                  quantity: totalUsedQty,
                },
                {
                  serviceFee,
                },
                component.componentInterfaceTwo,
                stopAdding
              )
            );
          }
        }

        if (
          parseInt(mcu[component.componentInterfaceThree]) > 0 &&
          totalQty > 0
        ) {
          let minus =
            parseInt(mcu[component.componentInterfaceThree]) - totalQty;

          let totalUsedQty;
          if (totalQty > parseInt(mcu[component.componentInterfaceThree])) {
            totalUsedQty = totalQty + minus;
          } else {
            totalUsedQty = totalQty;
          }

          totalQty = totalQty - totalUsedQty;
          if (totalUsedQty) {
            dispatch(
              addNewItemToCart(
                {
                  ...product,
                  [component.componentInterfaceThree]: totalUsedQty,
                  quantity: totalUsedQty,
                },
                {
                  serviceFee,
                },
                component.componentInterfaceThree,
                stopAdding
              )
            );
          }
        }

        if (
          parseInt(mcu[component.componentInterfaceFour]) > 0 &&
          totalQty > 0
        ) {
          let minus =
            parseInt(mcu[component.componentInterfaceFour]) - totalQty;

          let totalUsedQty;
          if (totalQty > parseInt(mcu[component.componentInterfaceFour])) {
            totalUsedQty = totalQty + minus;
          } else {
            totalUsedQty = totalQty;
          }

          totalQty = totalQty - totalUsedQty;
          if (totalUsedQty) {
            dispatch(
              addNewItemToCart(
                {
                  ...product,
                  [component.componentInterfaceFour]: totalUsedQty,
                  quantity: totalUsedQty,
                },
                {
                  serviceFee,
                },
                component.componentInterfaceFour,
                stopAdding
              )
            );
          }
        }
        if (totalQty > 0) {
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

  const [showConfirm, setShowConfirm] = useState(false);
  const hideConfirmHandler = () => setShowConfirm(false);
  const showConfirmHandler = () => setShowConfirm(true);
  const [loader, setLoader] = useState(false);

  const findedComp = items.find((item) => item.productId === component._id);
  const deleteHandler = (e) => {
    if (component?.blockType === "mcu") {
      showConfirmHandler();
      return;
    }

    setLoader(true);

    if (findedComp[component.componentInterfaceOne]) {
      dispatch(
        removeItemFromCart(component?._id, component.componentInterfaceOne)
      );
    } else if (findedComp[component.componentInterfaceTwo]) {
      dispatch(
        removeItemFromCart(component?._id, component.componentInterfaceTwo)
      );
    } else if (findedComp[component.componentInterfaceThree]) {
      dispatch(
        removeItemFromCart(component?._id, component.componentInterfaceThree)
      );
    } else if (findedComp[component.componentInterfaceFour]) {
      dispatch(
        removeItemFromCart(component?._id, component.componentInterfaceFour)
      );
    } else {
      showAlertHandler("interface is full you can`t add component", "Error");
      return;
    }
  };
  const stopLoader = () => {
    setLoader(false);
    hideConfirmHandler();
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
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const [showBasket, setShowBasket] = useState(false);
  const [removeHover, setRemoveHover] = useState(false);

  return (
    <>
      <input
        id={`${component._id}`}
        type="checkbox"
        hidden
        value={show}
        onChange={(e) => setShow(e.target.checked)}
      />
      <tr
        className={`${removeHover ? "remove-hover" : ""}`}
        style={{
          zIndex: 1,
          cursor: "pointer",
          position: "relative",
        }}
      >
        <td
          className={`${show ? "subPart topRow" : ""}  `}
          style={{
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "141%",
          }}
        >
          <div className="d-flex px-2 align-items-center ">
            <button onClick={handleToggle}>
              <ArrowRightIcon
                className={`component-svg ${show ? "active" : ""}`}
              />
            </button>

            <label
              style={{
                height: 60,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                cursor: "pointer",
                marginInline: 10,
              }}
              htmlFor={`${component._id}`}
            >
              {component?.partNumber}
            </label>
          </div>
        </td>

        <td
          style={{
            borderCollapse: "collapse",
          }}
        >
          <label
            style={{
              height: 60,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            htmlFor={`${component._id}`}
          >
            {component?.subCategory}
          </label>
        </td>
        <td
          style={{
            width: "200px",
            minWidth: "200px",
          }}
        >
          <label
            style={{
              height: 60,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            htmlFor={`${component._id}`}
          >
            {component?.description}
          </label>
        </td>
        <td>
          <label
            style={{
              height: 60,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            htmlFor={`${component._id}`}
          >
            {component?.manufacturer}
          </label>
        </td>
        <td>
          <label
            style={{
              height: 60,
              width: "100%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            htmlFor={`${component._id}`}
          >
            ${parseFloat(component?.price).toFixed(2)}
          </label>
        </td>
        <td className="p-0">
          <div
            onMouseEnter={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              zIndex: 99,
            }}
            className="d-flex justify-content-center gap-3 "
          >
            {component.blockType === "mcu" ? (
              <Button
                onMouseOut={() => {
                  setTimeout(() => {
                    setRemoveHover(false);

                    if (items?.find((e) => e.productId === component._id)) {
                      setShowBasket(false);
                    }
                  }, 10);
                }}
                onMouseOver={(e) => {
                  e.stopPropagation();
                  setRemoveHover(true);
                  if (items?.find((e) => e.productId === component._id)) {
                    setShowBasket(true);
                  }
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
                className={`btn cart-btn add-to-cart-btn  ${
                  showBasket ? "btn-danger" : ""
                } ${
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
                ) : adding ? (
                  "adding"
                ) : (
                  "add"
                )}
              </Button>
            ) : (
              <AddCartWithQuantity
                component={component}
                onHoverOut={(e) => {
                  e.stopPropagation();
                  setRemoveHover(false);
                }}
                onHover={(e) => {
                  e.stopPropagation();
                  setRemoveHover(true);
                }}
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
            )}
          </div>
        </td>
      </tr>
      <tr className={`component-detail-box ${show ? "active" : ""}`}>
        <td colSpan="6" className="py-0">
          <Row className=" subPart bottom-row gap-2">
            <Col lg={5}>
              <div className="w-100 h-100  d-flex flex-column align-items-center p-3 gap-3">
                {component?.imageUrl ? (
                  <Image width={200} height={200} src={component?.imageUrl} />
                ) : (
                  <NoImageIcon />
                )}

                <Link
                  to={component?.datasheetLink}
                  target="_blank"
                  className="d-flex align-items-center"
                  rel="noreferrer"
                >
                  <FileDock width={23.98} height={24} />
                  <span
                    style={{
                      color: "#E11045",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "12px",
                      lineHeight: "18px",
                    }}
                  >
                    datasheet
                  </span>
                </Link>
              </div>
            </Col>
            <Col>
              <table className="parameters-table">
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
        </td>
      </tr>
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

      {bigAlert.show && (
        <PcbBigAlert
          label={bigAlert.label}
          description={bigAlert.message}
          content={bigAlert.content}
          show={bigAlert.show}
          onHide={hideBigAlertHandler}
        />
      )}
    </>
  );
}

export default memo(Index);
