import { memo } from "react";
import { Container } from "react-bootstrap";
import { Footer, MainHeader } from "../../components";
import "./index.css";

function Index({ children }) {
  return (
    <Container fluid className="pcb-main-container p-0">
      <MainHeader />
      {children}
      <div className="px-3">
        <Footer />
      </div>
    </Container>
  );
}
export default memo(Index);
