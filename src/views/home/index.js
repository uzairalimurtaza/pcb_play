import { memo } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { HardwarePcImg } from "../../assets";
import { LogoSlider } from "../../components";
import "./index.css";
function Index() {
  return (
    <Container fluid>
      <Row
        style={{
          backgroundColor: "#fafafa",
        }}
      >
        <Col lg={6} className="home-banner-right py-4">
          <Row className=" gap-3 description">
            <Col lg={12}>
              <h1>the easiest way to get custom pcb boards, finally...</h1>
            </Col>
            <Col lg={12}>
              <p className="m-0">
                choose the component blocks from the menu, we will design,
                manufacture, assemble, test, and deliver in the most quick,
                efficient and cost effective manner.
              </p>
            </Col>
            <Col lg={12}>
              <h2>
                We design, you{" "}
                <span
                  style={{
                    color: "#E11045",
                  }}
                >
                  p
                </span>
                <span
                  style={{
                    color: "#3DB2FF",
                  }}
                >
                  l
                </span>
                <span
                  style={{
                    color: "#3DB320",
                  }}
                >
                  a
                </span>
                <span
                  style={{
                    color: "#6772E5",
                  }}
                >
                  y
                </span>{" "}
                ...
              </h2>
            </Col>

            <Col lg={12}>
              <Button
                variant="outline-danger"
                className=" d-flex justify-content-between align-items-center "
              >
                Learn More
              </Button>
            </Col>
          </Row>
        </Col>
        <Col lg={6} className="home-banner-left py-4 ">
          <div className="blur-box-home " />

          <Image fluid src={HardwarePcImg} className="mx-auto" />
        </Col>
      </Row>
      <Row className=" py-4 gap-3">
        <Col lg={12} className="text-center ">
          <h6
            style={{
              color: "#E11045",
            }}
          >
            companies that we work with
          </h6>
        </Col>
        <Col lg={12}>
          <LogoSlider />
        </Col>
      </Row>
    </Container>
  );
}

export default memo(Index);
