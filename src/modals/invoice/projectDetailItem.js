import React, { memo } from "react";

function Index({ label, value, strip }) {
  return (
    <div className={`invoice-project-Detail-item ${strip ? "strip" : ""}`}>
      <p className="text-muted m-0">{label}</p>
      <span>{value}</span>
    </div>
  );
}

export default memo(Index);
