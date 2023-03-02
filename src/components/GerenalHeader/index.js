import React, { memo } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PcbLogoIcon } from "../../assets";
import "./index.css";
function Index() {
  return (
    <Container fluid className="gerenal-header ">
      <Link to="/">
        <PcbLogoIcon />
      </Link>
    </Container>
  );
}

export default memo(Index);
