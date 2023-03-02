import React, { memo, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { PlusIcon, UploadIcon } from "../../assets";
import { CustomSelect, Input } from "../../components";
import {
  saveNewProduct,
  updateNewProductById,
} from "../../redux/dashboard/action";
import CustomParameter from "./customParameter";
import { dynamicData } from "./data";
import "./index.css";

function Index({ product, show, onHide }) {
  const [active, setActive] = useState(null);
  const [componentBlocks, setComponentBlocks] = React.useState({});
  const [otherFeatures, setOtherFeatures] = React.useState({});
  const addNewFeature = () => {
    setOtherFeatures({
      ...otherFeatures,
      [`parameter-${Object.keys(otherFeatures).length + 1}`]: "",
    });
  };
  const blockType = componentBlocks?.blockType;
  const { selectdata, inputData } = useMemo(() => {
    if (!product) {
      setOtherFeatures({});
      setComponentBlocks({
        blockType,
      });
    }

    return dynamicData(blockType, product);
  }, [blockType, product]);

  const selectHandler = (e) => {
    const { name, value } = e?.target || e;

    setComponentBlocks({
      ...componentBlocks,
      [name]: value,
    });
  };

  const inputHandler = (e) => {
    const { name, value, previousName } = e?.target || e;
    setOtherFeatures((e) => {
      delete otherFeatures[previousName];
      return {
        [name]: value,
      };
    });
  };
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const stopLoader = () => {
    setLoader(false);
    onHide?.();
  };
  const saveProduct = () => {
    let data = {
      ...componentBlocks,
      others: otherFeatures,
    };

    setLoader(true);
    if (product) {
      dispatch(updateNewProductById(data, product._id, stopLoader));
      return;
    }
    dispatch(saveNewProduct(data, stopLoader));
  };
  useEffect(() => {
    if (product) {
      setComponentBlocks((e) => {
        return {
          ...e,
          ...product,
        };
      });

      setOtherFeatures((p) => {
        return {
          ...p,
          ...product.others,
        };
      });
    }
  }, [product, blockType]);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        // centered
      >
        <Modal.Header title="Edit component blocks" closeButton>
          <div className="  customHeaderBox  ">
            <h6>
              {product ? "Edit component blocks" : "add component blocks"}{" "}
            </h6>
            <div className="d-flex justify-content-end gap-2 flex-wrap">
              <Button
                variant="outline-primary"
                className="button-size d-flex justify-content-between align-items-center p-0 "
              >
                <input
                  multiple={false}
                  type="file"
                  id="file"
                  name="img"
                  onChange={(e) => {
                    setComponentBlocks({
                      ...componentBlocks,
                      img: e.target.files[0],
                    });
                  }}
                  hidden
                />

                {componentBlocks?.img ? (
                  <label className="small-label d-flex justify-content-between align-items-center p-2">
                    <UploadIcon className="me-3 flex" />
                    uploaded
                  </label>
                ) : (
                  <label
                    className="small-label d-flex justify-content-between align-items-center p-2"
                    htmlFor="file"
                  >
                    <UploadIcon className="me-3 flex" /> update image
                  </label>
                )}
              </Button>

              <Button
                onClick={addNewFeature}
                variant="outline-primary"
                className="button-size d-flex justify-content-between align-items-center "
              >
                <PlusIcon className="me-3 flex" />
                <label className="small-label">add a new feature</label>
              </Button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Container
            fluid
            className="d-flex justify-content-center flex-column "
          >
            <Row>
              {selectdata?.map((item, index) => (
                <Col lg={6} key={index}>
                  <CustomSelect
                    setActive={setActive}
                    active={active}
                    {...item}
                    value={componentBlocks[item.name]}
                    name={item.name}
                    onChange={selectHandler}
                  />
                </Col>
              ))}
            </Row>
            <div className="my-2">
              {inputData?.map((item, index) => (
                <Row key={index}>
                  <Col lg={6}>
                    <label className="small-label">{item?.label}</label>
                  </Col>
                  <Col lg={6}>
                    <Input
                      type={item.type}
                      name={item?.name}
                      min={item?.min}
                      max={item?.max}
                      as={item?.as}
                      row={item?.row}
                      maxLength={item?.maxLength}
                      placeholder={"enter value"}
                      value={componentBlocks[item?.name] || ""}
                      onChange={selectHandler}
                    />
                  </Col>
                </Row>
              ))}
            </div>

            <Row>
              <Col lg={6}>
                <label className="small-label">pcb layout area (mm x mm)</label>
              </Col>
              <Col lg={6}>
                <Row>
                  <Col lg={6}>
                    <Input
                      max={3}
                      maxLength={3}
                      name={"first"}
                      value={componentBlocks?.pcbLayoutArea?.first}
                      onChange={(e) => {
                        setComponentBlocks({
                          ...componentBlocks,
                          pcbLayoutArea: {
                            ...componentBlocks.pcbLayoutArea,
                            first: e.target.value,
                          },
                        });
                      }}
                      type="number"
                      placeholder={"enter value"}
                    />
                  </Col>
                  <Col lg={6}>
                    <Input
                      max={3}
                      min={0}
                      maxLength={3}
                      name={"second"}
                      onChange={(e) => {
                        setComponentBlocks({
                          ...componentBlocks,
                          pcbLayoutArea: {
                            ...componentBlocks.pcbLayoutArea,
                            second: e.target.value,
                          },
                        });
                      }}
                      type="number"
                      value={componentBlocks?.pcbLayoutArea?.second}
                      placeholder={"enter value"}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            {Object.keys(otherFeatures)?.map((item, index) => (
              <CustomParameter
                value={otherFeatures[item]}
                name={item}
                key={index}
                onChange={inputHandler}
                onRemove={(e) => {
                  setOtherFeatures((p) => {
                    delete p[e];
                    return {
                      ...p,
                    };
                  });
                }}
              />
            ))}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-100 d-flex justify-content-between">
            <Button onClick={onHide} variant="outline-danger">
              close
            </Button>
            <Button disable={loader} onClick={saveProduct} variant="danger">
              {loader ? (
                <div className=" d-flex justify-content-between  align-items-center ">
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span>proceesing...</span>
                </div>
              ) : product ? (
                "update"
              ) : (
                "add"
              )}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default memo(Index);
