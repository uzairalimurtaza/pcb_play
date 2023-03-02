import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";

function Index() {
  const [thirdParty, setThirdParty] = React.useState([]);
  React.useEffect(() => {
    fetch("/static-data/third-party.json")
      .then((res) => res.json())
      .then((data) => {
        setThirdParty(data);
      });
  }, []);
  return (
    <Container className="p-0">
      {thirdParty.map((item, index) => (
        <Row key={index} className="gap-3 my-5">
          <Col lg={12}>
            <h5
              style={{
                color: "#E11045",
              }}
            >
              {item.heading}
            </h5>
          </Col>
          <Col lg={12}>
            {item?.paras.map((para, index) => (
              <p key={index} className=" text-lowercase text-muted ">
                {para}
              </p>
            ))}
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default memo(Index);
