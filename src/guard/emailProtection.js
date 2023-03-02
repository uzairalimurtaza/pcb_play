import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Index({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (user.isEmailVerified) {
    return <Navigate to={"/"} />;
  }
  return <React.Fragment>{children}</React.Fragment>;
}
export default memo(Index);
