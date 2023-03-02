import React, { memo } from "react";

import { Handle } from "react-flow-renderer";

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <div>{data.label}</div>
      {data.dots.map((dot, index) => (
        <Handle
          key={index}
          type={dot.type}
          position={dot.position}
          id={dot.id}
          style={dot.style}
          isConnectable={isConnectable}
        />
      ))}
    </>
  );
});
