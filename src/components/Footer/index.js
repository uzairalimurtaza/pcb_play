import React, { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  FacebookIcon,
  PayBtnIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../assets";
import "./index.css";
function Index() {
  return (
    <Container fluid className="py-2">
      <Row className="footer-top">
        <Col
          lg={12}
          className="d-flex justify-content-between    flex-wrap gap-2"
        >
          <PayBtnIcon />
          <div className="d-flex justify-content-between social-media-icons-box ">
            <TwitterIcon />
            <FacebookIcon />
            <YoutubeIcon />
          </div>
        </Col>
      </Row>
      <Row className="footer-bottom mt-3">
        <Col lg={12} className="d-flex justify-content-between flex-wrap gap-2">
          <label className="small-label text-muted">
            copyright © 2022 pcbplay
          </label>
          <div className="d-flex justify-content-between footer-links flex-wrap gap-2 ">
            <Link className="small-label text-muted" to="/">
              sitemap
            </Link>
            <Link className="small-label text-muted" to="/policy-services">
              policies & terms
            </Link>
            <Link className="small-label text-muted" to="/contact-us">
              contact us
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default memo(Index);
