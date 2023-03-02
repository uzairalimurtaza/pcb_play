import React, { memo } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import "./index.css";
function Index() {
  const [highLevelDetils, setHighLevelDetils] = React.useState([]);
  const [faqs, setFaqs] = React.useState([]);

  React.useEffect(() => {
    fetch("/static-data/faqs.json")
      .then((res) => res.json())
      .then((data) => {
        const { highLevelDetils, faqs } = data;
        setHighLevelDetils(highLevelDetils);
        setFaqs(faqs);
      });
  }, []);
  return (
    <Container fluid className=" faqs-container ">
      <Row className="my-4 gap-5">
        <Col lg={12}>
          <h3
            style={{
              color: "#22621A",
            }}
          >
            faqs
          </h3>
        </Col>
        <Col lg={12}>
          <h5
            style={{
              color: "#E11045",
            }}
          >
            High level details
          </h5>
        </Col>
        <Col lg={12} className="bg-white pcb-list-box   p-4 ">
          <ul className="pcb-list px-2 ">
            {highLevelDetils.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Col>
      </Row>
      {faqs.map((item, index) => (
        <Row className="my-4 gap-3">
          <Col lg={12}>
            <h5
              style={{
                color: "#E11045",
              }}
            >
              {item?.label}
            </h5>
          </Col>

          <Col lg={12}>
            <Accordion
              defaultActiveKey="0"
              className="gap-2 d-flex flex-column faqs-accordion"
            >
              {item?.questions.map((q, index) => (
                <Accordion.Item
                  className="faqs-accordion-item"
                  eventKey={index}
                >
                  <Accordion.Header className="faqs-accordion-header">
                    <h6 className="text-lowercase px-3 ">{q?.question}</h6>
                  </Accordion.Header>
                  <Accordion.Body
                    className="text-left  faqs-accordion-body"
                    style={{
                      backgroundColor: "#f2fff8",
                    }}
                  >
                    <p className="m-0 text-lowercase">{q?.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default memo(Index);
