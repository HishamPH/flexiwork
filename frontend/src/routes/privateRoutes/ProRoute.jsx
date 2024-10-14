import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { openModal } from "../../redux/slices/modalSlice";
import { useEffect } from "react";

const ProRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && !userInfo.isPro) {
      dispatch(openModal());
    }
  }, [userInfo, dispatch]);

  if (userInfo && userInfo.isPro) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProRoute;
