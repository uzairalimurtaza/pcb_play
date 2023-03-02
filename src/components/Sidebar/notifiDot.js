import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Index() {
  const [showNofi, setShowNofi] = useState(false);
  const { notifications } = useSelector((state) => state.dashboard);
  const ureadNotfi = notifications.find((e) => !e.read);

  useEffect(() => {
    if (ureadNotfi) {
      setShowNofi(true);
      return;
    }
    setShowNofi(false);
  }, [ureadNotfi]);
  if (showNofi) {
    return <div className="dot mx-1" />;
  }
  return null;
}

export default memo(Index);
