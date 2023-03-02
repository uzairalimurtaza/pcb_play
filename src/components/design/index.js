import React, { memo } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon } from "../../assets";
import { createNewCart } from "../../redux/cart/action";
import { addNewItemToCart } from "../../redux/dashboard/action";
import CustomSnackbar from "../CustomSnackbar";
import Quantity from "../quantity";

function Index({ userId }) {
  const { cart } = useSelector((state) => state.dashboard);
  let items = cart?.items || [];
  const [error, setError] = React.useState({
    partNumber: "",

    subCategory: "",
    price: "",
  });
  let [product, setProduct] = React.useState({
    partNumber: "",
    quantity: 1,
    subCategory: "",
    price: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setError({ ...error, [e.target.name]: "" });
    const { name, value } = e.target || e;
    setProduct({ ...product, [name]: value });
  };
  const AddToCart = () => {
    let error = {};
    if (product.partNumber.length < 3) {
      error = { ...error, partNumber: "part number is required" };
    }
    if (items.find((i) => i.partNumber === product.partNumber)) {
      error = { ...error, partNumber: "part number already exists" };
    }
    if (product.subCategory.length < 3) {
      error = { ...error, subCategory: "sub category is required" };
    }
    if (product.price === "") {
      error = { ...error, price: "price is required" };
    }
    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    }

    if (!userId) {
      setAlert({
        show: true,
        message: "please specify user id",
        severity: "error",
      });
      return;
    }

    setLoader(true);
    if (cart) {
      dispatch(addNewItemToCart(product, cart?._id, stopLoader));
    } else {
      product = {
        ...product,
        total: String(parseFloat(product.price) * product.quantity),
      };
      let newItems = items.concat(product);
      let newCart = {
        userId,
        items: newItems,
        subTotal: newItems.reduce((a, b) => a + parseFloat(b.total), 0),
        cartStatus: "new",
      };
      dispatch(createNewCart(newCart, stopLoader));
    }

    setProduct({
      partNumber: "",
      quantity: 1,
      subCategory: "",
      price: "",
    });
  };
  const [{ show, severity, message }, setAlert] = React.useState({
    show: false,
    message: "",
    severity: "",
  });
  const [loader, setLoader] = React.useState(false);
  const stopLoader = (data) => {
    setLoader(false);
  };
  return (
    <>
      <Row className="shadow-sm pcb-box bg-white">
        <Col lg={12} className="pcb-box-header">
          <h6>design</h6>
        </Col>
        <Col lg={12} className="pcb-box-body ">
          <Row>
            <Col lg={12}>
              <FormGroup className="flex justify-content-between align-items-center my-2">
                <FormLabel className="small-label">part number</FormLabel>
                <div className="w-50">
                  <FormControl
                    placeholder="enter value"
                    onChange={handleChange}
                    value={product.partNumber}
                    name="partNumber"
                  />
                  {error.partNumber && (
                    <Form.Text className="text-danger">
                      {error.partNumber}
                    </Form.Text>
                  )}
                </div>
              </FormGroup>

              <FormGroup className="flex justify-content-between align-items-center my-2">
                <FormLabel className="small-label">sub-category</FormLabel>
                <div className="w-50">
                  <FormControl
                    placeholder="enter value"
                    onChange={handleChange}
                    value={product.subCategory}
                    name="subCategory"
                  />
                  {error.subCategory && (
                    <Form.Text className="text-danger">
                      {error.subCategory}
                    </Form.Text>
                  )}
                </div>
              </FormGroup>

              <FormGroup className="flex justify-content-between align-items-center my-2">
                <FormLabel className="small-label">quantity</FormLabel>
                <Quantity
                  showBtn
                  qty={product.quantity}
                  onChange={(e) => {
                    setProduct({ ...product, quantity: e });
                  }}
                />
              </FormGroup>

              <FormGroup className="flex justify-content-between align-items-center my-2">
                <FormLabel className="small-label">price ($)</FormLabel>
                <div className="w-50">
                  <FormControl
                    placeholder="enter value"
                    onChange={handleChange}
                    value={product.price}
                    min={0}
                    max={4}
                    maxLength={4}
                    name="price"
                    type="number"
                  />
                  {error.price && (
                    <Form.Text className="text-danger">{error.price}</Form.Text>
                  )}
                </div>
              </FormGroup>
              <div className="d-flex justify-content-end my-4">
                <Button
                  disabled={loader}
                  onClick={AddToCart}
                  variant="outline-danger"
                  className="  my-2 d-flex justify-content-center align-items-center "
                >
                  {loader ? (
                    <div className="d-flex justify-content-center align-items-center text-danger">
                      <Spinner animation="grow" size="sm" className="mx-2" />
                      adding...
                    </div>
                  ) : (
                    <span className="d-flex justify-content-center align-items-center">
                      <PlusCircleIcon className="me-3 flex" />
                      add to cart
                    </span>
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {show && (
        <CustomSnackbar
          open={show}
          severity={severity}
          message={message}
          onClose={() => {
            setAlert({ show: false, message: "", severity: "" });
          }}
        />
      )}
    </>
  );
}

export default memo(Index);
