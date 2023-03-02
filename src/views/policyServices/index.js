import React, { memo } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import "./index.css";
import Policy from "./policy";
import TermsService from "./termsService";
import ThirdParty from "./thirdParty";

function Index() {
  const [label, setLabel] = React.useState("privacy policy");

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={label}>
      <Row className=" pcb-services-box mx-auto bg-white my-5 rounded-3 p-3 shadow-sm gap-4 ">
        <Col lg={12} className="text-center">
          <h3
            style={{
              color: "#22621A",
            }}
          >
            policies
          </h3>
        </Col>
        <Col
          lg={8}
          style={{
            maxWidth: 800,
          }}
          className="mx-auto"
        >
          <Nav
            className="pcb-custom-tab gap-2"
            onSelect={(key) => setLabel(key)}
          >
            <Nav.Item>
              <Nav.Link eventKey="privacy policy">privacy policy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third party services">
                third party services
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="terms of service">terms of service</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col lg={12}>
          <Tab.Content>
            <Tab.Pane eventKey="privacy policy">
              <Policy />
            </Tab.Pane>
            <Tab.Pane eventKey="third party services">
              <ThirdParty />
            </Tab.Pane>
            <Tab.Pane eventKey="terms of service">
              <TermsService />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default memo(Index);
