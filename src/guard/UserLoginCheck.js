import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../redux/auth/action";
import { getCartDetail } from "../redux/cart/action";

function Index({ children }) {
  const [loader, setLoader] = useState(true);
  const [cartLoader, setCartLoading] = useState(true);
  const code = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const stopLoader = () => {
    setLoader(false);
  };
  const stopCartLoader = () => {
    setCartLoading(false);
  };
  useEffect(() => {
    dispatch(getCurrentUser(stopLoader));
  }, [dispatch]);
  useEffect(() => {
    if (code) {
      dispatch(getCartDetail(code, stopCartLoader));
      return;
    }
    setCartLoading(false);
  }, [dispatch, code]);

  if (loader || cartLoader) {
    return <div>loading</div>;
  }

  return children;
}
export default memo(Index);
