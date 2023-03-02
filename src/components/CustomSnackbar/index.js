import React, { memo } from "react";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const getBG = (severity) => {
  if (severity === "success") return "rgba(0, 132, 60, 0.1)";
  if (severity === "error") return "rgba(225, 16, 69, 0.2)";
  if (severity === "warning") return "rgba(254, 208, 0, 0.2)";
};

const getColor = (severity) => {
  if (severity === "success") return "#22621A";
  if (severity === "error") return "#E11045";
  if (severity === "warning") return "#FFA24D";
};
function Index({ severity, message, open, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        icon={false}
        closeText=""
        severity={severity}
        sx={{
          width: "100%",
          padding: "25px",
          backgroundColor: getBG(severity),
          color: getColor(severity),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default memo(Index);
