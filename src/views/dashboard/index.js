import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import InfoBox from "./info";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

function Index() {
  return (
    <Container fluid>
      <Row className="gap-3">
        <Col lg={12}>
          <h5 className="content-main-heading">dashboard</h5>
        </Col>
        <Col lg={12} className="bg-white">
          <InfoBox label={"latest transactions"}>
            <LineChart />
          </InfoBox>
        </Col>
        <Col lg={7} className="bg-white">
          <InfoBox>
            <LineChart />
          </InfoBox>
        </Col>
        <Col className="bg-white">
          <InfoBox label={"registered users"}>
            <BarChart />
          </InfoBox>
        </Col>
      </Row>
    </Container>
  );
}
export default memo(Index);
