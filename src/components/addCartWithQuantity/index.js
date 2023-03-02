import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DangerIcon, MinusIcon, PlusIcon, TrashIcon } from "../../assets";
import { PcbAlert } from "../../modals";
import {
  removeItemFromCart,
  updateItemQty,
} from "../../redux/dashboard/action";
import "./index.css";
function Index({
  qty,
  onQtyChange,
  onAddToCart,
  component,
  onRemoveToCart,
  onHover,
  onHoverOut,
}) {
  const { cart } = useSelector((state) => state.dashboard);
  let items = cart?.items || [];
  const mcu = items.find((item) => item.blockType === "mcu");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    label: "",
  });
  const findedComp = items.find((item) => item.productId === component._id);
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
  const [quantity, setQuantity] = useState(qty || 1);
  const handleMinus = (e) => {
    e.stopPropagation();

    if (isInBasket) {
      if (quantity <= 1) {
        if (findedComp[component.componentInterfaceOne]) {
          dispatch(
            removeItemFromCart(
              isInBasket?.productId,
              component.componentInterfaceOne
            )
          );
        } else if (findedComp[component.componentInterfaceTwo]) {
          dispatch(
            removeItemFromCart(
              isInBasket?.productId,
              component.componentInterfaceTwo
            )
          );
        } else if (findedComp[component.componentInterfaceThree]) {
          dispatch(
            removeItemFromCart(
              isInBasket?.productId,
              component.componentInterfaceThree
            )
          );
        } else if (findedComp[component.componentInterfaceFour]) {
          dispatch(
            removeItemFromCart(
              isInBasket?.productId,
              component.componentInterfaceFour
            )
          );
        } else {
          showAlertHandler(
            "interface is full you can`t add component",
            "Error"
          );
          return;
        }
      } else {
        if (mcu && component?.blockType === "component") {
          if (findedComp[component.componentInterfaceOne]) {
            dispatch(
              updateItemQty(
                quantity - 1,
                "decrease",
                component.componentInterfaceOne,
                isInBasket?.productId
              )
            );
          } else if (findedComp[component.componentInterfaceTwo]) {
            dispatch(
              updateItemQty(
                quantity - 1,
                "decrease",
                component.componentInterfaceTwo,
                isInBasket?.productId
              )
            );
          } else if (findedComp[component.componentInterfaceThree]) {
            dispatch(
              updateItemQty(
                quantity - 1,
                "decrease",
                component.componentInterfaceThree,
                isInBasket?.productId
              )
            );
          } else if (findedComp[component.componentInterfaceFour]) {
            dispatch(
              updateItemQty(
                quantity - 1,
                "decrease",
                component.componentInterfaceFour,
                isInBasket?.productId
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
    }
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handlePlus = (e) => {
    e.stopPropagation();
    if (quantity > 98) {
      return;
    }
    if (isInBasket) {
      if (mcu && component?.blockType === "component") {
        if (mcu[component.componentInterfaceOne]) {
          dispatch(
            updateItemQty(
              quantity + 1,
              "increase",
              component.componentInterfaceOne,
              isInBasket?.productId
            )
          );
        } else if (mcu[component.componentInterfaceTwo]) {
          dispatch(
            updateItemQty(
              quantity + 1,
              "increase",
              component.componentInterfaceTwo,
              isInBasket?.productId
            )
          );
        } else if (mcu[component.componentInterfaceThree]) {
          dispatch(
            updateItemQty(
              quantity + 1,
              "increase",
              component.componentInterfaceThree,
              isInBasket?.productId
            )
          );
        } else if (mcu[component.componentInterfaceFour]) {
          dispatch(
            updateItemQty(
              quantity + 1,
              "increase",
              component.componentInterfaceFour,
              isInBasket?.productId
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
    setQuantity(quantity + 1);
  };
  const dispatch = useDispatch();
  const isInBasket = items?.find((e) => e.productId === component._id);

  useEffect(() => {
    onQtyChange?.(quantity);
  }, [quantity, onQtyChange]);
  useEffect(() => {
    if (isInBasket) {
      setQuantity(isInBasket.quantity);
    } else {
      setQuantity(1);
    }
  }, [isInBasket]);
  const [showBasket, setShowBasket] = useState(false);

  return (
    <div
      onMouseOver={onHover}
      onMouseOut={onHoverOut}
      className="pcb-add-to-cart"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" px-1 py-2  d-flex justify-content-center align-items-center"
      >
        <button className="minus-btn" onClick={handleMinus}>
          {isInBasket && quantity <= 1 ? (
            <TrashIcon className="trash-icon pcb-qty-icon  " />
          ) : (
            <MinusIcon className="pcb-qty-icon " fill="#22621A" />
          )}
        </button>
        <label
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "20px",
            textAlign: "center",
          }}
        >
          {quantity}
        </label>

        <button onClick={handlePlus}>
          <PlusIcon height={20} width={15} fill="#22621A" />
        </button>
      </div>
      <button
        onMouseOut={(e) => {
          setTimeout(() => {
            onHoverOut(e);

            if (isInBasket) {
              setShowBasket(false);
            }
          }, 10);
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
          onHover(e);
          if (isInBasket) {
            setShowBasket(true);
          }
        }}
        className={`pcb-add-btn  py-2  ${isInBasket ? "active" : ""} ${
          showBasket && isInBasket ? "remove" : ""
        }  `}
        onClick={(e) => {
          e?.stopPropagation();
          if (isInBasket) {
            onRemoveToCart?.();
          } else {
            onAddToCart?.();
          }
        }}
      >
        {isInBasket ? (
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
      </button>
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
    </div>
  );
}

export default memo(Index);
