import React, { memo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Index({ children, placement, innerContent }) {
  return (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={<Tooltip id={`tooltip-${placement}`}>{innerContent}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
}

export default memo(Index);
