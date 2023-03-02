import React, { memo } from "react";
import { MainHeader, Sidebar } from "../../components";
import "./index.css";
function Index({ children }) {
  return (
    <div className="pcb-container">
      <MainHeader />
      <div className="pcb-content-container">
        <Sidebar />
        <div className="pcb-content-body">{children}</div>
      </div>
    </div>
  );
}
export default memo(Index);
