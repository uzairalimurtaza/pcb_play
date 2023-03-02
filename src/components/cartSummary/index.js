import React, { memo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CartItem from ".//cartItem";
import { Empty } from "antd";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
// import CustomSelect from "../customSelect";
import PcbTooltip from "../pcbTooltip";
import { FaStar } from "react-icons/fa";
import { InfoCircleOutlined } from "../../assets";
import CustomSelect from "../customSelect";
import { updateCart } from "../../redux/cart/action";

const boardOptions = [
  {
    value: 3,
    label: 3,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 10,
    label: 10,
  },
];
function Index({ onDelete, onQtyChange, showQtyDiv, fetchCart, checkout }) {
  const { cart } = useSelector((state) => state.dashboard);
  let newCart = cart || fetchCart;
  const items = newCart?.items || [];
  const [active, setActive] = useState(null);
  const componentCost = newCart?.subTotal || 0;
  const serviceFee = newCart?.serviceFee || 0;
  const total = componentCost + serviceFee;
  const dispatch = useDispatch();
  return (
    <Row className="shadow-sm pcb-box bg-white">
      <Col lg={12} className="pcb-box-header p-2">
        <h6>cart summary</h6>
      </Col>
      <Col lg={12} className="pcb-box-body  p-0">
        {items?.length > 0 ? (
          <>
            <div
              style={{
                maxHeight: "180px",
                overflowY: "auto",
              }}
            >
              {items.map((item, index) => (
                <CartItem
                  remove
                  showQtyDiv={showQtyDiv}
                  showQtyBtn={item.blockType === "mcu" ? false : true}
                  onQtyChange={onQtyChange}
                  onDelete={onDelete}
                  item={item}
                  key={index}
                />
              ))}
            </div>
            {checkout && (
              <Col className="d-flex justify-content-between align-items-center p-3 ">
                <label>pcb board qty</label>
                <CustomSelect
                  value={cart?.pcbBoardQty}
                  options={boardOptions}
                  name="pcbBoardQty"
                  active={active}
                  onChange={(e) => {
                    const { value } = e;
                    dispatch(
                      updateCart({
                        pcbBoardQty: value,
                      })
                    );
                  }}
                  setActive={setActive}
                />
              </Col>
            )}

            <Col className="d-flex justify-content-between px-3 py-2 cart-fee-section ">
              <label>component cost</label>
              <span>${parseFloat(componentCost).toFixed(2)}</span>
            </Col>

            <Col className="d-flex justify-content-between px-3 py-2 ">
              <div className="d-flex gap-2 align-items-center cart-fee-section ">
                <label className="m-0">service fee</label>
                <PcbTooltip
                  placement="top"
                  innerContent={
                    <ul
                      style={{
                        listStyle: "none",
                      }}
                    >
                      <li className="d-flex align-items-start gap-2 ">
                        <div>
                          <FaStar className="mt-1" />
                        </div>
                        <p className="m-0 text-start">
                          3, 5, 10 or 25 qty boards can be ordered over the
                          dropdown menu.
                        </p>
                      </li>
                      <li className="d-flex align-items-start gap-2 ">
                        <div>
                          <FaStar className="mt-1" />
                        </div>
                        <p className="m-0 text-start">
                          The design fee varies depending on the following
                          parameters;
                          <ul>
                            <li>-pcb board size,</li>
                            <li>-pcb board order squantity</li>
                            <li>-component assembly side(s)</li>
                          </ul>
                        </p>
                      </li>
                    </ul>
                  }
                >
                  <InfoCircleOutlined />
                </PcbTooltip>
              </div>
              <span>${parseFloat(serviceFee).toFixed(2)}</span>
            </Col>

            <Col className="d-flex justify-content-between align-items-center px-3 py-2 ">
              <div className="d-flex gap-2 align-items-center my-2 cart-subtotal ">
                <label className="m-0">sub total</label>
                <PcbTooltip
                  placement="top"
                  innerContent={
                    <ul
                      style={{
                        listStyle: "none",
                      }}
                    >
                      <li className="d-flex align-items-start gap-2 ">
                        <div>
                          <FaStar className="mt-1" />
                        </div>
                        <p className="m-0 text-start">
                          3, 5, 10 or 25 qty boards can be ordered over the
                          dropdown menu.
                        </p>
                      </li>
                      <li className="d-flex align-items-start gap-2 ">
                        <div>
                          <FaStar className="mt-1" />
                        </div>
                        <p className="m-0 text-start">
                          The design fee varies depending on the following
                          parameters;
                          <ul>
                            <li>-pcb board size,</li>
                            <li>-pcb board order squantity</li>
                            <li>-component assembly side(s)</li>
                          </ul>
                        </p>
                      </li>
                    </ul>
                  }
                >
                  <InfoCircleOutlined />
                </PcbTooltip>
              </div>
              <span>${parseFloat(total).toFixed(2)}</span>
            </Col>
          </>
        ) : (
          <Empty description="No items in cart" className="p-3" />
        )}
      </Col>
    </Row>
  );
}

export default memo(Index);
