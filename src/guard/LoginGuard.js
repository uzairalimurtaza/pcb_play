import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const queryString = require("query-string");
function Index({ children }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const redirect = queryString.parse(location.search)?.redirect || "/";

  if (user) {
    if (user?.isEmailVerified) {
      return <Navigate to={redirect} />;
    }
    const redirect2 =
      queryString.parse(location.search)?.redirect || "/verify-email";

    return <Navigate to={redirect2} />;
  }
  return <React.Fragment>{children}</React.Fragment>;
}
export default memo(Index);
