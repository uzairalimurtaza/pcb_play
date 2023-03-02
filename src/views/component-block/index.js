import { Empty } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon } from "../../assets";
import { ProductModal } from "../../modals";
import { getAllProducts } from "../../redux/dashboard/action";
import ComponentRow from "./componentRow";
import "./index.css";
function Index() {
  const [modalShow, setModalShow] = useState(false);
  const showModal = () => setModalShow(true);
  const hideModal = () => setModalShow(false);
  const { products } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const stopLoader = (data) => {
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    dispatch(getAllProducts(stopLoader));
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <h5 className="content-main-heading">component blocks</h5>
        </Col>
        <Col
          lg={12}
          className="box d-flex justify-content-end align-content-center flex-wrap gap-2"
        >
          <Button
            onClick={showModal}
            variant="outline-primary"
            className=" d-flex justify-content-between align-items-center "
          >
            <PlusIcon className="me-3 flex" />
            add a new component
          </Button>
          {/* <div className="d-flex border rounded-pill justify-content-center w-25 align-items-center">
            <SearchIcon className="mx-3" />
            <input
              type="text"
              placeholder="search for project name"
              className=" rounded-pill flex-grow-1 border-0 h-100 custom-input py-2  "
            />
          </div> */}
        </Col>
        <Col lg={12} className="my-4 mx-auto  category-table p-0">
          <table
            className={` table-fixed w-full bg-white ${
              products.length > 0 && "shadow-sm"
            } `}
          >
            <thead className="component-table-thead ">
              <tr>
                <th>category</th>
                <th>sub-category</th>

                <th>part-number</th>
                <th>manufacturer</th>
                <th>price</th>
                <th>action</th>
              </tr>
            </thead>
            {loader ? (
              <div className="loader-container">
                <Spinner animation="grow" variant="danger" />
              </div>
            ) : (
              <>
                {products.length > 0 ? (
                  <tbody className="component-table-tbody">
                    {products
                      ?.sort(
                        (a, b) => Number(b.createdAt) > Number(a.createdAt)
                      )
                      .map((product, index) => (
                        <ComponentRow product={product} key={index} />
                      ))}
                  </tbody>
                ) : (
                  <div className="emptyContainer-fav my-4">
                    <Empty description="products not found" />
                  </div>
                )}
              </>
            )}
          </table>
        </Col>
      </Row>
      {modalShow && <ProductModal show={modalShow} onHide={hideModal} />}
    </Container>
  );
}

export default memo(Index);
