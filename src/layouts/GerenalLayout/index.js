import React, { memo } from "react";
import { Container } from "react-bootstrap";
import { Footer, GerenalHeader } from "../../components";
import "./index.css";

function Index({ children }) {
  return (
    <Container fluid className="pcb-gerenalLayout-container">
      <GerenalHeader />
      {children}
      <Footer />
    </Container>
  );
}
export default memo(Index);
