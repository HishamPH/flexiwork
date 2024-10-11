import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { openModal } from "../../redux/slices/modalSlice";

const ProRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (userInfo && userInfo.isPro) {
    return <Outlet />;
  } else {
    dispatch(openModal());
    return <Navigate to="/" />;
  }
};

export default ProRoute;
