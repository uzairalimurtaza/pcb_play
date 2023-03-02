import React, { memo, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "../../assets";
import { PcbTable } from "../../components";
import { CategoryModal } from "../../modals";
import { getAllOrders } from "../../redux/dashboard/action";
import "./index.css";
import OrderRow from "./orderRow";

function Index() {
  const [modalShow, setModalShow] = useState(false);
  // const showModal = () => setModalShow(true);
  const hideModal = () => setModalShow(false);
  const [loader, setLoader] = useState(false);
  const { orders } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  // const [pagenumber, setPageNumber] = useState(1);
  // const [pagesize, setPageSize] = useState(10);
  const stopLoader = (data) => {
    setLoader(false);
  };

  const [filteredOrders, setFilteredOrders] = useState([]);
  const searchhandler = (e) => {
    const { value } = e.target;
    setSearch(value);
    const filtered = orders.filter((user) => {
      return user?.project?._id.includes(value);
    });
    setFilteredOrders(filtered);
  };
  const [search, setSearch] = useState("");

  const finalOrders = filteredOrders.length > 0 ? filteredOrders : orders;
  useEffect(() => {
    setLoader(true);
    dispatch(getAllOrders(stopLoader));
  }, [dispatch]);
  const labels = [
    "project name",
    "project id",
    "shipping id",
    "order status",
    "Invoice",
    "order date",
    "upload design files",
    "design overview",
    "cancel order",
  ];
  return (
    <Container fluid>
      <Row className="mt-5">
        <Col lg={8}>
          <h5 className="content-main-heading">orders haha</h5>
        </Col>
        <Col>
          <div className="d-flex border rounded-pill justify-content-center align-items-center">
            <SearchIcon className="mx-3" />
            <input
              type="text"
              value={search}
              onChange={searchhandler}
              placeholder="search for project name"
              className=" rounded-pill flex-grow-1 border-0 h-100 custom-input py-2 bg-transparent "
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={12} className=" mx-auto p-0">
          <PcbTable
            labels={labels}
            data={finalOrders}
            loader={loader}
            width={"100px"}
            dataRender={({ item, index }) => (
              <OrderRow order={item} index={index} />
            )}
          />
        </Col>
        {/* {orders?.length > 0 && (
              <Col>
                <div className="flex justify-content-around w-full align-content-center">
                  <p className="m-0">
                    showing 1 to{" "}
                    {pagesize * pagenumber - (pagesize - orders?.length)} of{" "}
                    {ordersCounts} entries
                  </p>
                  <div className="d-flex  justify-content-center  align-content-center">
                    <span>display</span>

                    <select
                      value={pagesize}
                      onChange={(event) => {
                        setPageSize(event.target.value);
                      }}
                      className="border mx-2 rounded mb-1"
                    >
                      <option selected>10</option>
                      <option>20</option>
                    </select>
                  </div>
                  {Math.ceil(ordersCounts / pagesize) > 0 && (
                    <Pagination
                      page={pagenumber}
                      onChange={(_, value) => {
                        console.log(value);
                        setPageNumber(value);
                      }}
                      count={Math.ceil(ordersCounts / pagesize)}
                      color="primary"
                    />
                  )}
                </div>
              </Col>
            )} */}
      </Row>
      {modalShow && <CategoryModal show={modalShow} onHide={hideModal} />}
    </Container>
  );
}

export default memo(Index);
