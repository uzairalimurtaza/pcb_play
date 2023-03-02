import { memo, useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon } from "../../assets";
import { CartSummary } from "../../components";
import { DesignOverviewModal } from "../../modals";
import TourStepOne from "./tour-step-one";
import TourStepTwo from "./tour-step-two";
import TourStepThree from "./tour-step-three";
import TourStepFour from "./tour-step-four";

import pack from "bin-pack";

import Tour from "reactour";
import {
  getAllCategorys,
  getAllProductsByCateId,
} from "../../redux/dashboard/action";
import CategoryList from "./categoryList";
import ComponentTable from "./componenttable";
import "./index.css";
import ProjectOptions from "./projectOptions";
import { updateCart } from "../../redux/cart/action";
import { useNavigate } from "react-router-dom";
function Index() {
  const [categorys, setCategorys] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [components, setComponents] = useState([]);
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    JSON.parse(localStorage.getItem("tour"));
    if (JSON.parse(localStorage.getItem("tour"))) {
      setShowTour(false);
    } else {
      document.body.style.overflow = "hidden";
      setShowTour(true);
    }
  }, []);
  const [project, setProject] = useState({
    name: "my project",
    identicalComponents: false,
    pcbBoardQty: 3,
  });
  const { cartItems, subTotal } = useMemo(() => {
    return {
      cartItems: cart?.items || [],
      subTotal: cart?.subTotal || 0,
    };
  }, [cart]);
  const [cateLoading, setCateLoading] = useState(false);
  const [compLoading, setCompLoading] = useState(false);
  const stopFlag = (data) => {
    setCompLoading(false);

    if (data?.length > 0) {
      setComponents(data);
      return;
    }
    setComponents([]);
  };
  const stopLoader = (data) => {
    setCategorys(data?.foundCategories || []);
    const mcucategory = data?.foundCategories?.find((e) => e.name === "mcu");
    if (mcucategory) {
      setSelectedCategory(mcucategory);
    } else {
      setSelectedCategory(data?.foundCategories[0]);
    }
    setCateLoading(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategorys(stopLoader));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setCompLoading(true);
      dispatch(getAllProductsByCateId(selectedCategory, stopFlag));
    }
  }, [selectedCategory, dispatch]);

  const mucIsAdded = cartItems.find((e) => e.blockType === "mcu");

  useEffect(() => {
    if (cartItems.length) {
      const pcbLayoutArea = cartItems.map((e) => {
        return [...Array(e.quantity)].map(() => {
          return {
            width: parseFloat(e?.pcbLayoutArea?.first) || 0,
            height: parseFloat(e?.pcbLayoutArea?.second) || 0,
          };
        });
      });
      const blocks = pcbLayoutArea?.flat(1);

      var result = pack(blocks);

      setProject((e) => {
        return {
          ...e,
          componentCost: parseFloat(subTotal),
          designFee: 0,
          pcbBoardDimensions: {
            width: result.width,
            height: result.height,
          },
        };
      });
    }
  }, [cartItems, subTotal]);
  const [showDesign, setShowDesign] = useState(false);
  const handleShowDesign = () => setShowDesign(true);
  const handleCloseDesign = () => setShowDesign(false);
  const placeOrderHandler = () => {
    if (!user) {
      navigate("/login?redirect=/create-an-project");
    }

    dispatch(
      updateCart(project, () => {
        setTimeout(() => {
          navigate("/checkout");
        }, 100);
      })
    );
  };
  return (
    <Container fluid className=" create-project-container">
      <Row className="my-4">
        <Col lg={12}>
          <Row>
            <Col
              data-tut="tour-step-1"
              lg={9}
              md={12}
              sm={12}
              style={{
                overflow: "hidden",
              }}
            >
              <CategoryList
                categorys={categorys}
                loader={cateLoading}
                value={selectedCategory}
                onChange={(selected) => {
                  setSelectedCategory(selected);
                }}
              />
            </Col>
            <Col lg={3} md={3} className="d-none d-lg-block ">
              <Button
                disabled={!mucIsAdded}
                onClick={() => {
                  if (mucIsAdded) {
                    handleShowDesign();
                  }
                }}
                variant="outline-primary"
                className=" design-btn d-flex justify-content-center align-items-center   mx-auto"
              >
                <EyeIcon className="me-3 flex" />
                <label
                  className="small-label"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  design overview
                </label>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        style={{
          position: "relative",
        }}
        className="gap-3 mt-4 "
      >
        {mucIsAdded ? null : (
          <Col
            lg={12}
            className="pcb-top-heading"
            style={{
              position: "absolute",
              top: 0,
            }}
          >
            <h3
              style={{
                color: "#E11045",
              }}
            >
              choose the controller for your project
            </h3>
          </Col>
        )}
        <Col
          lg={9}
          md={12}
          style={{
            boxShadow:
              "0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(52, 58, 64, 0.168)",
            borderRadius: "8px",
          }}
          className=" bg-white project-table-box p-0 mt-5 "
        >
          <ComponentTable components={components} loader={compLoading} />
        </Col>
        <Col sm={12} className="d-flex d-lg-none">
          <button
            disabled={!mucIsAdded}
            onClick={() => {
              if (mucIsAdded) {
                handleShowDesign();
              }
            }}
            className="d-flex mx-auto align-items-center justify-content-center"
            style={{
              color: "#E11045",
            }}
          >
            <EyeIcon fill="#E11045" className="me-3 flex" />
            <label
              style={{
                cursor: "pointer",
              }}
            >
              view design architecture
            </label>
          </button>
        </Col>
        <Col className="mt-lg-5">
          <Row className="gap-3 ">
            <Col data-tut="tour-step-3" lg={12}>
              <ProjectOptions
                values={project}
                onChange={(values) => {
                  setProject(values);
                }}
              />
            </Col>
            <Col lg={12} data-tut="tour-step-4">
              <CartSummary
                showQtyDiv
                values={project}
                onChange={(values) => {
                  setProject(values);
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="my-4">
        <Col lg={12}>
          <div className="d-flex justify-content-between  gap-3">
            <Button
              variant="outline-danger"
              className=" d-flex justify-content-between align-items-center "
            >
              cancel
            </Button>
            <Button
              disabled={!mucIsAdded}
              onClick={() => {
                if (mucIsAdded) {
                  placeOrderHandler();
                }
              }}
              variant="danger"
              className=" d-flex justify-content-between align-items-center "
            >
              buy now
            </Button>
          </div>
        </Col>
      </Row>
      {showDesign && (
        <DesignOverviewModal show={showDesign} onHide={handleCloseDesign} />
      )}
      {showTour && (
        <Tour
          steps={steps}
          isOpen={showTour}
          className="help-tour"
          accentColor={"#E11045"}
          onRequestClose={() => {
            localStorage.setItem("tour", true);
            setShowTour(false);
          }}
        />
      )}
    </Container>
  );
}

export default memo(Index);
const steps = [
  {
    selector: '[data-tut="tour-step-1"]',
    content: <TourStepOne />,
  },
  {
    selector: '[data-tut="tour-step-2"]',

    content: <TourStepTwo />,
  },
  {
    selector: '[data-tut="tour-step-3"]',

    content: <TourStepThree />,
  },
  {
    selector: '[data-tut="tour-step-4"]',

    content: <TourStepFour />,
  },
];
